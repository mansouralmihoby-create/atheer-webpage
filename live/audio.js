/**
 * Procedural Audio Synthesizer via Web Audio API
 * No external MP3 files needed - 100% reliable offline & in OBS
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Short click / mechanical clock tick
  playTick(pitchMultiplier = 1) {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800 * pitchMultiplier, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.04);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Urgent double-tick for the final 2 seconds
  playUrgentTick() {
    this.playTick(1.4);
    setTimeout(() => this.playTick(1.8), 80);
  }

  // Victorious Ding! (Multi-oscillator chime)
  playCorrect() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;

    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Major chord)
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.05 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.9);
    });
  }

  // Whoosh sound for transitions
  playWhoosh() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(2400, now + 0.15);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.3);
    filter.Q.setValueAtTime(3, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.3);
  }

  // Generic short tone helper
  tone(freq, start, duration, type = 'sine', volume = 0.2) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(volume, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.05);
  }

  // Sparkly rising arpeggio for gifts
  playGift() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    [880, 1108.73, 1318.51, 1760, 2217.46].forEach((f, i) => this.tone(f, now + i * 0.06, 0.5, 'triangle', 0.16));
  }

  // Soft pop for new followers
  playFollow() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    this.tone(660, now, 0.18, 'sine', 0.2);
    this.tone(990, now + 0.09, 0.25, 'sine', 0.18);
  }

  // Short fanfare for legends / leaderboard / boss questions
  playFanfare() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    [[523.25, 0], [659.25, 0.12], [783.99, 0.24], [1046.5, 0.36], [783.99, 0.5], [1046.5, 0.6]].forEach(([f, t]) =>
      this.tone(f, now + t, 0.35, 'square', 0.07)
    );
  }
}

window.soundEngine = new SoundEngine();
