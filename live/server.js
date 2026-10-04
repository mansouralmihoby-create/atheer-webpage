/**
 * TikTok LIVE Quiz Overlay Server
 * - Serves the overlay files on http://127.0.0.1:PORT
 * - Connects to your TikTok LIVE chat (unofficial tiktok-live-connector)
 * - Forwards chat answers, gifts and follows to the overlay over WebSocket (/ws)
 *
 * Usage:
 *   node server.js --user=your_tiktok_username     (real live stream)
 *   node server.js --demo                          (simulated viewers for testing)
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';
import { TikTokLiveConnection, WebcastEvent, ControlEvent } from 'tiktok-live-connector';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);

const PORT = Number(args.port || process.env.PORT || 8080);
const HOST = args.host || '127.0.0.1';
const USERNAME = String(args.user || process.env.TIKTOK_USERNAME || 'atheerenglishapp').replace(/^@/, '').trim();
const DEMO = Boolean(args.demo);
const RECONNECT_MS = 15000;
// Optional helpers for when TikTok blocks the room lookup:
//   --key=EULER_API_KEY   free key from https://www.eulerstream.com (most reliable)
//   --room=ROOM_ID        connect directly to a known live room ID
//   --session=SESSIONID --idc=TT_TARGET_IDC   your TikTok sessionid cookie
const SIGN_KEY = args.key || process.env.EULER_API_KEY || process.env.SIGN_API_KEY || '';
const ROOM_ID = args.room ? String(args.room) : '';
const SESSION_ID = args.session || process.env.TIKTOK_SESSION_ID || '';
const TT_IDC = args.idc || process.env.TIKTOK_TARGET_IDC || '';

/* ------------------------------------------------------------------ */
/* Static file server                                                  */
/* ------------------------------------------------------------------ */
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
};

const server = http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400);
    return res.end('Bad request');
  }
  const rel = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
  const file = path.resolve(ROOT, rel);
  const blocked =
    !file.startsWith(ROOT + path.sep) ||
    rel.split('/').some((p) => p.startsWith('.')) ||
    rel.startsWith('node_modules');

  if (blocked) {
    res.writeHead(404);
    return res.end('Not found');
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not found');
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    res.end(data);
  });
});

/* ------------------------------------------------------------------ */
/* WebSocket bridge to the overlay                                     */
/* ------------------------------------------------------------------ */
const wss = new WebSocketServer({ server, path: '/ws' });
let lastStatus = { type: 'status', state: 'starting', message: 'جاري التشغيل…' };
let overlayState = { qid: 0, phase: 'idle', correct: 'A', count: 3 };

function broadcast(msg) {
  const data = JSON.stringify(msg);
  for (const client of wss.clients) {
    if (client.readyState === 1) client.send(data);
  }
}

function setStatus(state, message) {
  lastStatus = { type: 'status', state, message };
  broadcast(lastStatus);
  console.log(`[status] ${state} — ${message}`);
}

wss.on('connection', (ws) => {
  ws.send(JSON.stringify(lastStatus));
  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw);
      if (msg.type === 'state') overlayState = msg;
    } catch {
      /* ignore malformed messages */
    }
  });
});

function normUser(d) {
  if (!d) return null;
  const u = (d.user && typeof d.user === 'object') ? d.user : d;
  const name = u.uniqueId || u.displayId || d.uniqueId || d.displayId || String(u.userId || d.userId || '');
  if (!name) return null;
  const nick = u.nickname || d.nickname || name;
  const id = String(u.userId || d.userId || name);
  return { id, name, nick };
}

/* ------------------------------------------------------------------ */
/* Real TikTok LIVE connection                                         */
/* ------------------------------------------------------------------ */
let reconnectTimer = null;
let connection = null;

function scheduleReconnect() {
  if (reconnectTimer) return;
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    startTikTok();
  }, RECONNECT_MS);
}

function startTikTok() {
  if (connection) {
    try {
      connection.disconnect();
    } catch {
      /* already closed */
    }
  }
  const opts = {
    enableExtendedGiftInfo: Boolean(SIGN_KEY),
    processInitialData: false,
  };
  if (SIGN_KEY) opts.signApiKey = SIGN_KEY;
  if (ROOM_ID) opts.fetchRoomInfoOnConnect = false;
  if (SESSION_ID && TT_IDC) opts.session = { cookie: { sessionId: SESSION_ID, ttTargetIdc: TT_IDC } };
  connection = new TikTokLiveConnection(USERNAME, opts);

  connection.on(WebcastEvent.CHAT, (d) => {
    const user = normUser(d);
    const comment = d.comment || d.content || d.text || '';
    if (user && comment) {
      console.log(`💬 [chat] ${user.nick} (@${user.name}): ${comment}`);
      broadcast({ type: 'chat', user, text: comment });
    }
  });

  connection.on(WebcastEvent.GIFT, (d) => {
    const info = d.extendedGiftInfo || {};
    const details = d.giftDetails || {};
    const giftType = info.type ?? details.giftType;
    // Streakable gifts (type 1) fire repeatedly during a combo; only count the final event.
    if (giftType === 1 && !d.repeatEnd) return;
    const count = d.repeatCount || 1;
    const unitDiamonds = info.diamond_count ?? details.diamondCount ?? d.diamondCount ?? d.gift?.diamond_count ?? 1;
    const user = normUser(d);
    if (!user) return;
    const giftName = info.name || details.giftName || d.giftName || d.gift?.name || d.describe || 'هدية';
    console.log(`🎁 [gift] ${user.nick} sent ${giftName} x${count} (${unitDiamonds * count} 💎)`);
    broadcast({
      type: 'gift',
      user,
      giftName,
      count,
      diamonds: unitDiamonds * count,
    });
  });

  connection.on(WebcastEvent.FOLLOW, (d) => {
    const user = normUser(d);
    if (user) {
      console.log(`➕ [follow] ${user.nick} followed the stream!`);
      broadcast({ type: 'follow', user });
    }
  });

  connection.on(WebcastEvent.SHARE, (d) => {
    const user = normUser(d);
    if (user) {
      console.log(`📢 [share] ${user.nick} shared the stream!`);
      broadcast({ type: 'share', user });
    }
  });

  connection.on(WebcastEvent.LIKE, (d) => {
    const user = normUser(d);
    if (user && d.likeCount) {
      broadcast({ type: 'like', user, count: d.likeCount, totalLikes: d.totalLikeCount });
    }
  });

  connection.on(WebcastEvent.STREAM_END, () => {
    setStatus('ended', 'انتهى البث — سأعيد المحاولة تلقائياً');
    scheduleReconnect();
  });

  connection.on(ControlEvent.DISCONNECTED, () => {
    setStatus('disconnected', 'انقطع الاتصال بالبث — إعادة المحاولة…');
    scheduleReconnect();
  });

  setStatus('waiting', `جاري الاتصال ببث @${USERNAME}…`);
  connection
    .connect(ROOM_ID || undefined)
    .then((state) => setStatus('connected', `✅ متصل ببث @${USERNAME} (غرفة البث: ${state.roomId})`))
    .catch((err) => {
      const msg = String(err?.message || err || '');
      const isOffline = /isn't online|Business plan|Failed to sign|Room ID|UserOffline/i.test(msg);
      if (isOffline) {
        setStatus('waiting', `⌛ بانتظار فتح البث المباشر في حساب @${USERNAME} على تيك توك... (إعادة الفحص كل ${RECONNECT_MS / 1000} ثانية)`);
      } else {
        setStatus('waiting', `البث غير متاح (@${USERNAME}): ${msg}. إعادة المحاولة كل ${RECONNECT_MS / 1000} ثانية`);
      }
      scheduleReconnect();
    });
}

/* ------------------------------------------------------------------ */
/* Demo mode: simulated viewers                                        */
/* ------------------------------------------------------------------ */
const DEMO_NAMES = [
  'سارة', 'أحمد', 'نورة', 'خالد', 'ريم', 'فهد', 'لينا', 'عمر', 'هيا', 'يوسف',
  'جود', 'سلمان', 'دانة', 'ماجد', 'رهف', 'تركي', 'شهد', 'عبدالله', 'لمى', 'بدر',
  'غلا', 'ناصر', 'مها', 'سعود', 'وعد', 'فيصل', 'أروى', 'مشعل', 'رغد', 'زياد',
  'Emma', 'Liam', 'Noah', 'Mia', 'Adam', 'Lara', 'Omar_99', 'Ali.k', 'Sofi', 'Zain',
];
const DEMO_USERS = DEMO_NAMES.map((nick, i) => ({ id: `demo${i}`, name: `user_${i}`, nick }));
const DEMO_SKILL = new Map(DEMO_USERS.map((u) => [u.id, 0.35 + Math.random() * 0.55]));
const DEMO_NOISE = ['هلا والله 👋', 'صعبة 😂', 'سهلة!', 'ما عرفتها', 'التالي 🔥', 'أنا أسطورة 👑', '❤️❤️', 'wow'];
const DEMO_GIFTS = [
  { giftName: 'Rose', diamonds: 1, weight: 50 },
  { giftName: 'TikTok', diamonds: 1, weight: 20 },
  { giftName: 'Finger Heart', diamonds: 5, weight: 15 },
  { giftName: 'Doughnut', diamonds: 30, weight: 10 },
  { giftName: 'Hand Hearts', diamonds: 100, weight: 5 },
];
const answeredByQid = new Map();
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function weightedGift() {
  const total = DEMO_GIFTS.reduce((s, g) => s + g.weight, 0);
  let r = Math.random() * total;
  for (const g of DEMO_GIFTS) {
    if ((r -= g.weight) <= 0) return g;
  }
  return DEMO_GIFTS[0];
}

function startDemo() {
  setStatus('demo', 'وضع تجريبي: مشاهدون وهميون يجيبون ويرسلون هدايا');

  setInterval(() => {
    const { qid, phase, correct, count } = overlayState;
    if (!['reading', 'countdown'].includes(phase) || wss.clients.size === 0) return;
    if (Math.random() > 0.55) return;

    if (Math.random() < 0.08) {
      broadcast({ type: 'chat', user: pick(DEMO_USERS), text: pick(DEMO_NOISE) });
      return;
    }
    if (!answeredByQid.has(qid)) {
      answeredByQid.clear();
      answeredByQid.set(qid, new Set());
    }
    const answered = answeredByQid.get(qid);
    const free = DEMO_USERS.filter((u) => !answered.has(u.id));
    if (!free.length) return;
    const user = pick(free);
    answered.add(user.id);
    const letters = ['A', 'B', 'C', 'D'].slice(0, count || 3);
    const isRight = Math.random() < DEMO_SKILL.get(user.id);
    const letter = isRight ? correct : pick(letters.filter((l) => l !== correct));
    broadcast({ type: 'chat', user, text: Math.random() < 0.3 ? letter.toLowerCase() : letter });
  }, 260);

  const loopFollow = () => {
    setTimeout(() => {
      if (wss.clients.size) broadcast({ type: 'follow', user: pick(DEMO_USERS) });
      loopFollow();
    }, 14000 + Math.random() * 12000);
  };
  const loopGift = () => {
    setTimeout(() => {
      if (wss.clients.size) {
        const g = weightedGift();
        const count = g.diamonds === 1 ? 1 + Math.floor(Math.random() * 5) : 1;
        broadcast({ type: 'gift', user: pick(DEMO_USERS), giftName: g.giftName, count, diamonds: g.diamonds * count });
      }
      loopGift();
    }, 18000 + Math.random() * 15000);
  };
  loopFollow();
  loopGift();
}

/* ------------------------------------------------------------------ */
server.listen(PORT, HOST, () => {
  console.log('');
  console.log('  🎮 TikTok Quiz Overlay is running');
  console.log(`  ▶ Preview:      http://localhost:${PORT}/`);
  console.log(`  ▶ OBS / LIVE Studio: http://localhost:${PORT}/?stream=1`);
  console.log('');
  if (DEMO) {
    if (!args.demo) console.log('  ℹ No --user given, starting in DEMO mode. Use: node server.js --user=your_username');
    startDemo();
  } else {
    startTikTok();
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n  ✖ Port ${PORT} is already in use. Stop the other server or run with --port=8090\n`);
    process.exit(1);
  }
  throw err;
});
