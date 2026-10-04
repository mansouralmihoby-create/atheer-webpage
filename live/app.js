/**
 * TikTok LIVE Interactive Quiz Engine v2
 * - Auto question cycle (reading → countdown → reveal → next)
 * - Reads live chat answers (A/B/C/D, a/b/c, أ/ب/ج/د or the word itself) via server WebSocket
 * - Live vote bars, first-3 winners, points, streaks, leaderboard
 * - Gifts: thanks + bonus points + double / boss questions; follow welcomes
 */
(() => {
  'use strict';

  const CFG = window.QUIZ_CONFIG;
  const $ = (id) => document.getElementById(id);
  const LETTERS = ['A', 'B', 'C', 'D'];
  const ARABIC_LETTERS = { 'أ': 0, 'ا': 0, 'إ': 0, 'ب': 1, 'ج': 2, 'د': 3 };
  const LEVELS = {
    easy: 'مستوى 1: إحماء سهل ⚡',
    trap: 'مستوى 2: فخاخ شائعة 🔥',
    pro: 'مستوى 3: للمحترفين فقط 🧠',
  };
  const MEDALS = ['🥇', '🥈', '🥉'];
  const STORAGE_KEY = 'tiktokQuizPlayers_v2';
  const CIRC = 2 * Math.PI * 60;
  const sound = window.soundEngine;

  /* ---------------- URL params ---------------- */
  const params = new URLSearchParams(location.search);
  if (params.get('time')) CFG.countdownSeconds = Math.max(3, Number(params.get('time')) || CFG.countdownSeconds);
  if (window.FORCE_STREAM || params.get('stream') === '1' || params.get('stream') === 'true') $('streamerControls').classList.add('hidden');
  if (params.get('bg') === 'transparent') document.body.classList.add('obs-transparent');

  /* ---------------- Helpers ---------------- */
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const shortNick = (n) => (n.length > 18 ? n.slice(0, 17) + '…' : n);

  /* ---------------- Stage scaling ---------------- */
  const stage = $('stage');
  function fitStage() {
    const s = Math.min(innerWidth / 1080, innerHeight / 1920);
    stage.style.transform = `translate(-50%, -50%) scale(${s})`;
  }
  addEventListener('resize', fitStage);
  fitStage();

  /* ---------------- Questions ---------------- */
  const ALL = (window.QUIZ_QUESTIONS || []).map(([level, sentence, translation, opts, explanation], id) => ({
    id, level, sentence, translation, opts, explanation,
  }));
  const pools = { easy: [], trap: [], pro: [] };

  function fromPool(level) {
    if (!pools[level].length) pools[level] = shuffle(ALL.filter((q) => q.level === level));
    return pools[level].pop();
  }
  function buildRound() {
    const round = [];
    for (const lvl of ['easy', 'trap', 'pro']) {
      for (let i = 0; i < (CFG.round[lvl] || 0); i++) {
        const q = fromPool(lvl);
        if (q) round.push(q);
      }
    }
    return round;
  }

  /* ---------------- Players / scores ---------------- */
  const players = new Map();
  try {
    for (const p of JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')) players.set(p.id, p);
  } catch { /* ignore corrupt storage */ }

  function savePlayers() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...players.values()])); } catch { /* storage full/blocked */ }
  }
  function getPlayer(user) {
    let p = players.get(user.id);
    if (!p) {
      p = { id: user.id, nick: user.nick, points: 0, streak: 0, correct: 0 };
      players.set(user.id, p);
    }
    p.nick = user.nick || p.nick;
    return p;
  }
  const ranking = () => [...players.values()].filter((p) => p.points > 0).sort((a, b) => b.points - a.points);

  /* ---------------- Game state ---------------- */
  const S = {
    phase: 'idle',
    q: null,
    qNum: 0,
    answers: new Map(), // userId -> { user, idx, at }
    votes: [],
    timeLeft: 0,
    paused: false,
    pending: null,
    timer: null,
    tick: null,
    revealAt: 0,
    multiplier: 1,
    multiplierBy: null,
    nextMultiplier: 1,
    nextMultiplierBy: null,
    sinceBoard: 0,
    round: [],
    history: [],
    ws: null,
  };

  function after(ms, fn) {
    clearTimeout(S.timer);
    S.timer = setTimeout(() => {
      if (S.paused) S.pending = fn;
      else fn();
    }, ms);
  }
  function clearTimers() {
    clearTimeout(S.timer);
    clearInterval(S.tick);
    S.pending = null;
  }

  /* ---------------- Flow ---------------- */
  function nextQuestion() {
    clearTimers();
    if (S.sinceBoard >= CFG.leaderboardEvery && ranking().length) {
      showLeaderboard();
      after(CFG.leaderboardSeconds * 1000, () => startQuestion(takeNext()));
    } else {
      startQuestion(takeNext());
    }
  }

  function takeNext() {
    if (!S.round.length) S.round = buildRound();
    return S.round.shift();
  }

  function prevQuestion() {
    if (S.history.length < 2) return;
    clearTimers();
    S.round.unshift(S.history.pop());
    const prev = S.history.pop();
    S.qNum = Math.max(0, S.qNum - 2);
    startQuestion(prev);
  }

  function startQuestion(base) {
    if (!base) return;
    S.history.push(base);
    if (S.history.length > 50) S.history.shift();
    S.qNum++;
    S.sinceBoard++;

    const shuffled = shuffle(base.opts.map((text, i) => ({ text, correct: i === 0 })));
    S.q = {
      ...base,
      options: shuffled.map((o) => o.text),
      correctIndex: shuffled.findIndex((o) => o.correct),
    };
    S.multiplier = S.nextMultiplier;
    S.multiplierBy = S.nextMultiplierBy;
    S.nextMultiplier = 1;
    S.nextMultiplierBy = null;
    S.answers = new Map();
    S.votes = S.q.options.map(() => 0);
    S.phase = 'reading';

    renderQuestion();
    sendState();
    sound.playWhoosh();
    if (S.multiplier >= 3) sound.playFanfare();

    after(CFG.readingSeconds * 1000, startCountdown);
  }

  function startCountdown() {
    S.phase = 'countdown';
    S.timeLeft = CFG.countdownSeconds;
    $('timerCircleProgress').classList.remove('reading');
    sendState();
    renderTick();
    clearInterval(S.tick);
    S.tick = setInterval(() => {
      if (S.paused) return;
      S.timeLeft--;
      if (S.timeLeft > 0) {
        renderTick();
      } else {
        clearInterval(S.tick);
        reveal();
      }
    }, 1000);
  }

  function reveal() {
    S.phase = 'reveal';
    S.revealAt = Date.now();
    sendState();

    const q = S.q;
    $('timerContainer').classList.add('hidden');
    q.options.forEach((_, i) => $(`option-${i}`).classList.add(i === q.correctIndex ? 'correct' : 'faded'));
    const blank = $('blankSpot');
    if (blank) {
      blank.textContent = q.options[q.correctIndex];
      blank.classList.add('resolved');
    }
    $('explanationText').textContent = q.explanation;
    $('resultStats').textContent = '⏳ جاري احتساب الإجابات المتأخرة…';
    $('winners').innerHTML = '';
    $('resultBox').classList.add('show');
    sound.playCorrect();

    after(CFG.lateAnswerGraceMs, finalize);
  }

  function finalize() {
    S.phase = 'scored';
    sendState();
    const q = S.q;
    const P = CFG.points;
    const all = [...S.answers.values()].sort((a, b) => a.at - b.at);
    const correct = all.filter((a) => a.idx === q.correctIndex);
    const legends = [];

    all.forEach((a) => {
      const p = getPlayer(a.user);
      if (a.idx !== q.correctIndex) {
        p.streak = 0;
        return;
      }
      const rank = correct.indexOf(a);
      const base = [P.first, P.second, P.third][rank] ?? P.correct;
      a.gained = base * S.multiplier;
      p.points += a.gained;
      p.correct++;
      p.streak++;
      if (p.streak > 0 && p.streak % P.streakTarget === 0) {
        p.points += P.streakBonus;
        a.gained += P.streakBonus;
        legends.push(p);
      }
    });
    savePlayers();

    const total = all.length;
    const pct = total ? Math.round((correct.length / total) * 100) : 0;
    $('resultStats').textContent = total
      ? `✅ ${correct.length} من ${total} جاوبوا صح (${pct}%)`
      : '😴 ما أحد جاوب! اكتبوا الحرف في الشات';

    $('winners').innerHTML = correct.length
      ? correct
          .slice(0, 3)
          .map(
            (a, i) => `<div class="winner-row">
              <span>${MEDALS[i]}</span>
              <span class="winner-name">${esc(shortNick(a.user.nick))}</span>
              <span class="winner-pts">+${a.gained}</span>
            </div>`
          )
          .join('')
      : total
        ? '<div class="no-winner">🪤 الفخ اشتغل! ولا أحد جاوب صح</div>'
        : '';

    if (correct.length) burstConfetti(correct.length > 2 ? 140 : 80);
    legends.forEach((p, i) =>
      setTimeout(() => {
        toast(`👑 <span class="t-name">${esc(shortNick(p.nick))}</span> جاوب ${p.streak} متتالية! أسطورة 🔥`, 'legend', 5000);
        sound.playFanfare();
      }, 600 + i * 900)
    );

    renderMiniBoard();
    after(CFG.revealSeconds * 1000, nextQuestion);
  }

  function showLeaderboard() {
    S.phase = 'leaderboard';
    S.sinceBoard = 0;
    sendState();
    $('quizCard').classList.add('hidden');
    $('leaderboardCard').classList.remove('hidden');
    $('levelBadge').textContent = 'استراحة المتصدرين 🏆';
    $('levelBadge').className = 'level-badge pro';
    $('multiplierBadge').classList.add('hidden');

    const top = ranking().slice(0, 8);
    $('leaderboardList').innerHTML = top.length
      ? top
          .map(
            (p, i) => `<li class="lb-row ${i < 3 ? 'top' + (i + 1) : ''}" style="animation-delay:${i * 0.08}s">
              <span class="lb-rank">${MEDALS[i] || i + 1}</span>
              <span class="lb-name">${esc(shortNick(p.nick))}</span>
              ${p.streak >= 2 ? `<span class="lb-streak">🔥${p.streak}</span>` : ''}
              <span class="lb-pts">${p.points}</span>
            </li>`
          )
          .join('')
      : '<li class="lb-empty">لا يوجد متصدرون بعد… كن الأول! 🚀</li>';

    sound.playFanfare();
    burstConfetti(100);
  }

  /* ---------------- Rendering ---------------- */
  function renderQuestion() {
    const q = S.q;
    $('leaderboardCard').classList.add('hidden');
    const card = $('quizCard');
    card.classList.remove('hidden');
    card.classList.toggle('boss', S.multiplier >= 3);
    card.style.animation = 'none';
    void card.offsetWidth;
    card.style.animation = '';

    $('levelBadge').className = `level-badge ${q.level}`;
    $('levelBadge').textContent = S.multiplier >= 3 ? '👑 سؤال الزعيم' : LEVELS[q.level];

    const mb = $('multiplierBadge');
    if (S.multiplier > 1) {
      const by = S.multiplierBy ? ` — بفضل ${shortNick(S.multiplierBy)}` : '';
      mb.textContent = `⚡ نقاط ×${S.multiplier}${by}`;
      mb.classList.remove('hidden');
    } else {
      mb.classList.add('hidden');
    }

    $('questionCounter').textContent = `سؤال ${S.qNum}`;
    const [before, afterText] = q.sentence.split('___');
    $('sentenceText').innerHTML = `${esc(before)}<span class="blank-spot" id="blankSpot">___</span>${esc(afterText ?? '')}`;
    $('translationText').textContent = q.translation;

    $('optionsContainer').innerHTML = q.options
      .map(
        (text, i) => `<div class="option-card" id="option-${i}">
          <div class="vote-bar" id="voteBar-${i}"></div>
          <div class="option-badge">${LETTERS[i]}</div>
          <div class="option-text">${esc(text)}</div>
          <div class="vote-info"><div class="vote-pct" id="votePct-${i}">0%</div><div class="vote-count" id="voteCount-${i}">0</div></div>
        </div>`
      )
      .join('');

    $('resultBox').classList.remove('show');
    $('timerContainer').classList.remove('hidden');
    const circle = $('timerCircleProgress');
    circle.classList.remove('danger');
    circle.classList.add('reading');
    circle.style.transition = 'none';
    circle.style.strokeDashoffset = '0';
    void circle.offsetWidth;
    circle.style.transition = '';
    $('timerNumber').textContent = CFG.countdownSeconds;
    renderVotes();
  }

  function renderTick() {
    const n = $('timerNumber');
    n.textContent = S.timeLeft;
    n.classList.remove('pulse');
    void n.offsetWidth;
    n.classList.add('pulse');

    const circle = $('timerCircleProgress');
    circle.style.strokeDashoffset = String(CIRC - ((S.timeLeft - 1) / CFG.countdownSeconds) * CIRC);
    if (S.timeLeft <= 3) {
      circle.classList.add('danger');
      sound.playUrgentTick();
    } else {
      sound.playTick();
    }
  }

  function renderVotes() {
    const total = S.votes.reduce((a, b) => a + b, 0);
    S.votes.forEach((v, i) => {
      const pct = total ? Math.round((v / total) * 100) : 0;
      const bar = $(`voteBar-${i}`);
      if (!bar) return;
      bar.style.width = `${pct}%`;
      $(`votePct-${i}`).textContent = `${pct}%`;
      $(`voteCount-${i}`).textContent = v;
    });
    const counter = $('answerCounter');
    counter.textContent = `✍️ ${total} إجابة`;
    counter.classList.remove('bump');
    void counter.offsetWidth;
    counter.classList.add('bump');
  }

  function renderMiniBoard() {
    const top = ranking().slice(0, 3);
    $('miniBoard').innerHTML = top.length
      ? '🏆 ' +
        top
          .map(
            (p, i) => `<span class="mb-item">${MEDALS[i]} <span class="mb-name">${esc(shortNick(p.nick))}</span> <span class="mb-pts">${p.points}</span></span>`
          )
          .join('')
      : '🏆 كن أول من يدخل لوحة المتصدرين!';
  }

  /* ---------------- Chat answers ---------------- */
  function parseAnswer(text) {
    const t = String(text).trim();
    if (!t) return -1;
    const m = t.match(/^([a-dA-D])[\s).!.]*$/);
    if (m) return LETTERS.indexOf(m[1].toUpperCase());
    const ar = t.replace(/[\s).!.]+$/, '');
    if (ar.length === 1 && ar in ARABIC_LETTERS) return ARABIC_LETTERS[ar];
    const lower = t.toLowerCase().replace(/[!.]+$/, '');
    return S.q ? S.q.options.findIndex((o) => o.toLowerCase() === lower) : -1;
  }

  function acceptingAnswers() {
    if (S.phase === 'reading' || S.phase === 'countdown') return true;
    return S.phase === 'reveal' && Date.now() - S.revealAt <= CFG.lateAnswerGraceMs;
  }

  function onChat(user, text) {
    if (!user || !S.q || !acceptingAnswers() || S.answers.has(user.id)) return;
    const idx = parseAnswer(text);
    if (idx < 0 || idx >= S.q.options.length) return;
    S.answers.set(user.id, { user, idx, at: Date.now() });
    S.votes[idx]++;
    renderVotes();
  }

  /* ---------------- Gifts & follows ---------------- */
  function onGift({ user, giftName, count, diamonds }) {
    if (!user) return;
    const G = CFG.gifts;
    const bonus = Math.min(G.maxBonusPoints, Math.max(1, Math.round(diamonds * G.pointsPerDiamond)));
    const p = getPlayer(user);
    p.points += bonus;
    savePlayers();
    renderMiniBoard();

    const qty = count > 1 ? ` ×${count}` : '';
    toast(`🎁 <span class="t-name">${esc(shortNick(user.nick))}</span> أرسل ${esc(giftName)}${qty}! +${bonus} نقطة ❤️`, 'gift', 4500);
    sound.playGift();
    burstConfetti(Math.min(200, 40 + diamonds * 2));

    if (diamonds >= G.bossMin && S.nextMultiplier < 3) {
      S.nextMultiplier = 3;
      S.nextMultiplierBy = user.nick;
      setTimeout(() => toast(`👑 السؤال القادم "سؤال الزعيم" نقاطه ×3 بفضل <span class="t-name">${esc(shortNick(user.nick))}</span>`, 'legend', 5000), 800);
    } else if (diamonds >= G.doubleMin && S.nextMultiplier < 2) {
      S.nextMultiplier = 2;
      S.nextMultiplierBy = user.nick;
      setTimeout(() => toast(`⚡ السؤال القادم نقاطه ×2 بفضل <span class="t-name">${esc(shortNick(user.nick))}</span>`, 'legend', 4500), 800);
    }
  }

  function onFollow({ user }) {
    if (!user) return;
    toast(`👋 أهلاً <span class="t-name">${esc(shortNick(user.nick))}</span>! شكراً للمتابعة 💙`, 'follow', 3500);
    sound.playFollow();
  }

  /* ---------------- Toasts ---------------- */
  const toastQueue = [];
  function toast(html, kind = '', ms = 4000) {
    toastQueue.push({ html, kind, ms });
    pumpToasts();
  }
  function pumpToasts() {
    const box = $('toasts');
    while (toastQueue.length && box.children.length < 2) {
      const { html, kind, ms } = toastQueue.shift();
      const el = document.createElement('div');
      el.className = `toast ${kind}`;
      el.innerHTML = html;
      box.appendChild(el);
      setTimeout(() => {
        el.classList.add('out');
        setTimeout(() => {
          el.remove();
          pumpToasts();
        }, 350);
      }, ms);
    }
    if (toastQueue.length > 8) toastQueue.splice(0, toastQueue.length - 8);
  }

  /* ---------------- Confetti ---------------- */
  const canvas = $('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = 1080;
  canvas.height = 1920;
  let particles = [];
  let confettiRunning = false;
  const COLORS = ['#fe2c55', '#00f2fe', '#ffd700', '#10b981', '#a855f7', '#ffffff'];

  function burstConfetti(n = 100) {
    for (let i = 0; i < n; i++) {
      particles.push({
        x: 540 + (Math.random() - 0.5) * 300,
        y: 700,
        vx: (Math.random() - 0.5) * 26,
        vy: -Math.random() * 26 - 8,
        r: 6 + Math.random() * 8,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.4,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        life: 0,
      });
    }
    if (!confettiRunning) {
      confettiRunning = true;
      requestAnimationFrame(drawConfetti);
    }
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter((p) => p.y < 2000 && p.life < 240);
    for (const p of particles) {
      p.life++;
      p.vy += 0.6;
      p.vx *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
      ctx.restore();
    }
    if (particles.length) requestAnimationFrame(drawConfetti);
    else {
      confettiRunning = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  /* ---------------- WebSocket (server bridge) ---------------- */
  function setConn(state, message) {
    const el = $('connStatus');
    el.className = `conn-status ${state}`;
    const labels = { connected: 'متصل بالبث', demo: 'وضع تجريبي', waiting: 'بانتظار البث', ended: 'انتهى البث', disconnected: 'انقطع', offline: 'غير متصل' };
    el.querySelector('b').textContent = labels[state] || state;
    el.title = message || '';
  }

  function connectWS() {
    // Served by the local server → same host. Hosted online (atheerapp.com) or file:// → local server on this Mac.
    const isLocalHost = ['localhost', '127.0.0.1'].includes(location.hostname) || location.hostname.endsWith('.loca.lt');
    const wsUrl = params.get('ws') || window.WS_URL
      || (location.protocol.startsWith('http') && isLocalHost
        ? `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws`
        : 'ws://127.0.0.1:8080/ws');
    let ws;
    try { ws = new WebSocket(wsUrl); } catch {
      setConn('offline', 'الخادم غير متصل — شغّل npm start');
      setTimeout(connectWS, 3000);
      return;
    }
    S.ws = ws;
    ws.onopen = () => sendState();
    ws.onmessage = (e) => {
      let m;
      try { m = JSON.parse(e.data); } catch { return; }
      if (m.type === 'chat') onChat(m.user, m.text);
      else if (m.type === 'gift') onGift(m);
      else if (m.type === 'follow') onFollow(m);
      else if (m.type === 'status') setConn(m.state, m.message);
    };
    ws.onclose = () => {
      setConn('offline', 'الخادم غير متصل — شغّل npm start');
      setTimeout(connectWS, 3000);
    };
  }

  function sendState() {
    if (!S.ws || S.ws.readyState !== 1 || !S.q) return;
    S.ws.send(JSON.stringify({
      type: 'state',
      qid: S.qNum,
      phase: S.phase,
      correct: LETTERS[S.q.correctIndex],
      count: S.q.options.length,
    }));
  }

  /* ---------------- Controls ---------------- */
  function togglePause() {
    S.paused = !S.paused;
    $('playPauseBtn').textContent = S.paused ? '▶ استئناف' : '⏸ إيقاف';
    if (!S.paused && S.pending) {
      const fn = S.pending;
      S.pending = null;
      fn();
    }
  }
  function toggleMute() {
    sound.enabled = !sound.enabled;
    $('soundToggleBtn').textContent = sound.enabled ? '🔊' : '🔇';
  }
  function resetScores() {
    if (!confirm('تصفير كل النقاط ولوحة المتصدرين؟')) return;
    players.clear();
    savePlayers();
    renderMiniBoard();
  }
  function forceLeaderboard() {
    clearTimers();
    showLeaderboard();
    after(CFG.leaderboardSeconds * 1000, () => startQuestion(takeNext()));
  }

  $('playPauseBtn').addEventListener('click', togglePause);
  $('nextBtn').addEventListener('click', nextQuestion);
  $('prevBtn').addEventListener('click', prevQuestion);
  $('boardBtn').addEventListener('click', forceLeaderboard);
  $('soundToggleBtn').addEventListener('click', toggleMute);
  $('bgToggleBtn').addEventListener('click', () => document.body.classList.toggle('obs-transparent'));
  $('resetBtn').addEventListener('click', resetScores);
  addEventListener('click', () => sound.init(), { once: true });

  addEventListener('keydown', (e) => {
    if (e.code === 'Space') { e.preventDefault(); togglePause(); }
    else if (e.code === 'ArrowRight' || e.code === 'KeyN') nextQuestion();
    else if (e.code === 'ArrowLeft' || e.code === 'KeyP') prevQuestion();
    else if (e.code === 'KeyM') toggleMute();
    else if (e.code === 'KeyH') $('streamerControls').classList.toggle('hidden');
    else if (e.code === 'KeyT') document.body.classList.toggle('obs-transparent');
    else if (e.code === 'KeyL') forceLeaderboard();
    else if (e.code === 'KeyR' && e.shiftKey) resetScores();
  });

  // Debug hook for testing in the browser console: quiz.chat('Sara', 'B')
  window.quiz = {
    chat: (nick, text) => onChat({ id: 'test_' + nick, nick }, text),
    gift: (nick, diamonds = 1) => onGift({ user: { id: 'test_' + nick, nick }, giftName: 'Rose', count: 1, diamonds }),
    follow: (nick) => onFollow({ user: { id: 'test_' + nick, nick } }),
    state: S,
  };

  /* ---------------- Boot ---------------- */
  renderMiniBoard();
  connectWS();
  if (ALL.length) nextQuestion();
})();
