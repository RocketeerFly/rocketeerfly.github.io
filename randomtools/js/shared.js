/* ========================================
   Random Tools - Shared Utilities
   ======================================== */

const Storage = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem('rt_' + key);
      return v !== null ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('rt_' + key, JSON.stringify(value)); } catch {}
  },
  remove(key) {
    try { localStorage.removeItem('rt_' + key); } catch {}
  }
};

const History = {
  MAX: 20,
  get(tool) {
    return Storage.get(tool + '_history', []);
  },
  add(tool, entry) {
    const list = this.get(tool);
    list.unshift(entry);
    if (list.length > this.MAX) list.length = this.MAX;
    Storage.set(tool + '_history', list);
    return list;
  },
  clear(tool) {
    Storage.remove(tool + '_history');
  }
};

function showToast(msg) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.remove('show');
  void el.offsetWidth;
  el.classList.add('show');
  clearTimeout(el._tid);
  el._tid = setTimeout(() => el.classList.remove('show'), 2200);
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast('Copied!'));
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Copied!');
  }
}

function randomInt(min, max) {
  const range = max - min + 1;
  if (window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return min + (arr[0] % range);
  }
  return min + Math.floor(Math.random() * range);
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Sound = {
  _enabled: Storage.get('sound_enabled', true),
  _ctx: null,

  get enabled() { return this._enabled; },
  set enabled(v) { this._enabled = v; Storage.set('sound_enabled', v); },

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  },

  _getContext() {
    if (!this._ctx) {
      this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this._ctx;
  },

  playDiceRoll() {
    if (!this._enabled) return;
    try {
      const audio = new Audio('assets/roll_dice.mp3');
      audio.volume = 0.5;
      audio.play();
    } catch {}
  },

  playClick() {
    if (!this._enabled) return;
    try {
      const ctx = this._getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  },

  playCardFlip() {
    if (!this._enabled) return;
    try {
      const audio = new Audio('assets/flip_sound.mp3');
      audio.volume = 0.5;
      audio.play();
    } catch {}
  },

  playShuffle() {
    if (!this._enabled) return;
    try {
      const ctx = this._getContext();
      for (let i = 0; i < 3; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const t = ctx.currentTime + i * 0.06;
        osc.frequency.setValueAtTime(400 + i * 200, t);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.05);
      }
    } catch {}
  },

  playWheelTick() {
    if (!this._enabled) return;
    try {
      const ctx = this._getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {}
  },

  playWin() {
    if (!this._enabled) return;
    try {
      const ctx = this._getContext();
      const notes = [523, 659, 784, 1047];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const t = ctx.currentTime + i * 0.12;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.25);
      });
    } catch {}
  }
};

function renderHistory(containerId, tool, formatter) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const items = History.get(tool);
  if (items.length === 0) {
    container.innerHTML = '<div class="history-empty">No history yet</div>';
    return;
  }
  container.innerHTML = items.map((item, i) => formatter(item, i)).join('');
}

function toggleGuide(btn) {
  const body = btn.nextElementSibling;
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
  body.classList.toggle('open', !expanded);
}

function renderFooter() {
  const el = document.getElementById('siteFooter');
  if (!el) return;
  el.innerHTML = `<div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-col"><h4>Tools</h4><ul>
        <li><a href="number.html">Random Number</a></li>
        <li><a href="dice.html">Dice Roller</a></li>
        <li><a href="list.html">List Picker</a></li>
        <li><a href="card.html">Card Draw</a></li>
        <li><a href="coin.html">Coin Flip</a></li>
        <li><a href="wheel.html">Spin Wheel</a></li>
      </ul></div>
      <div class="footer-col"><h4>Company</h4><ul>
        <li><a href="about.html">About</a></li>
        <li><a href="about.html#contact">Contact</a></li>
      </ul></div>
      <div class="footer-col"><h4>Legal</h4><ul>
        <li><a href="privacy.html">Privacy Policy</a></li>
        <li><a href="terms.html">Terms of Service</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <div class="footer-brand">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="8" cy="16" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/>
        </svg>
        Random Tools
      </div>
      <span class="footer-copy">&copy; 2026 Random Tools. All rights reserved.</span>
    </div>
  </div>`;
}

document.addEventListener('DOMContentLoaded', renderFooter);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}
