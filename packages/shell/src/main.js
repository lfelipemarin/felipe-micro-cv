import { emit, on } from './eventBus.js';

const RX_SECTIONS = ['experience', 'skills', 'contact'];
const PN_SECTIONS  = ['projects', 'education', 'about'];
let rxIdx = 0, pnIdx = 0;

function ts() {
  return new Date().toLocaleTimeString('en', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function addLog(id, msg, type) {
  const log = document.getElementById(id);
  if (!log) return;
  const el = document.createElement('div');
  el.className = `log-entry log-${type}`;
  el.innerHTML = `<span class="log-time">${ts()}</span>${msg}`;
  log.prepend(el);
}

// ─── Theme ───────────────────────────────────────────────
const THEMES = ['dark', 'light', 'nord', 'monokai', 'dracula'];

function applyTheme(name) {
  if (!THEMES.includes(name)) name = 'dark';
  document.documentElement.setAttribute('data-theme', name);
  localStorage.setItem('cv-theme', name);
  document.querySelectorAll('.theme-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.theme === name);
  });
}

function setupThemeSwitcher() {
  applyTheme(localStorage.getItem('cv-theme') || 'dark');
  document.querySelectorAll('.theme-btn').forEach((btn) => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
  });
}

// ─── Event bus ───────────────────────────────────────────
function setupEventBus() {
  // MFE → shell: action results
  on('react-action', ({ result }) => addLog('react-log', result, 'react'));
  on('vue-action',   ({ result }) => addLog('vue-log',   result, 'vue'));

  // Cross-MFE pings (relayed by the shell)
  on('ping-vue',   () => addLog('vue-log',   '↩ pong from react mfe', 'vue'));
  on('ping-react', () => addLog('react-log', '↩ pong from vue mfe',   'react'));

  // Shell → React MFE buttons
  document.getElementById('btn-rx-section')?.addEventListener('click', () => {
    rxIdx = (rxIdx + 1) % RX_SECTIONS.length;
    emit('shell-react', { action: 'SET_ACTIVE_SECTION', payload: RX_SECTIONS[rxIdx] });
  });
  document.getElementById('btn-rx-theme')?.addEventListener('click', () => {
    emit('shell-react', { action: 'TOGGLE_THEME' });
  });
  document.getElementById('btn-rx-ping')?.addEventListener('click', () => {
    emit('shell-react', { action: 'PING_MFE' });
  });

  // Shell → Vue MFE buttons
  document.getElementById('btn-pn-section')?.addEventListener('click', () => {
    pnIdx = (pnIdx + 1) % PN_SECTIONS.length;
    emit('shell-vue', { action: 'setSection', payload: PN_SECTIONS[pnIdx] });
  });
  document.getElementById('btn-pn-fetch')?.addEventListener('click', () => {
    emit('shell-vue', { action: 'fetchProjects' });
  });
  document.getElementById('btn-pn-broadcast')?.addEventListener('click', () => {
    emit('shell-vue', { action: 'broadcastEvent' });
  });
}

async function bootstrap() {
  setupThemeSwitcher();
  setupEventBus();

  try {
    const [reactMFE, vueMFE] = await Promise.all([
      import('mfe_react/App'),
      import('mfe_vue/App'),
    ]);

    const reactRoot = document.getElementById('react-root');
    const vueRoot   = document.getElementById('vue-root');
    if (reactRoot) { reactRoot.innerHTML = ''; reactMFE.mount(reactRoot); }
    if (vueRoot)   { vueRoot.innerHTML   = ''; vueMFE.mount(vueRoot); }
  } catch (err) {
    console.error('[shell] Failed to load MFEs:', err);
    document.querySelectorAll('.panel-loading').forEach((el) => {
      el.textContent = '⚠ MFE load failed — check that all servers are running.';
      el.style.color = '#ef4444';
      el.style.animation = 'none';
    });
  }
}

bootstrap();
