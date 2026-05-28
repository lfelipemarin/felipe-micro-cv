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

function setupEventBus() {
  // MFE → shell: action results
  window.addEventListener('cv:react-action', (e) => addLog('react-log', e.detail.result, 'react'));
  window.addEventListener('cv:vue-action',   (e) => addLog('vue-log',   e.detail.result, 'vue'));

  // Cross-MFE pings (relayed by the shell)
  window.addEventListener('cv:ping-vue',   () => addLog('vue-log',   '↩ pong from react mfe', 'vue'));
  window.addEventListener('cv:ping-react', () => addLog('react-log', '↩ pong from vue mfe',   'react'));

  // Shell → React MFE buttons
  document.getElementById('btn-rx-section')?.addEventListener('click', () => {
    rxIdx = (rxIdx + 1) % RX_SECTIONS.length;
    window.dispatchEvent(new CustomEvent('cv:shell-react', { detail: { action: 'SET_ACTIVE_SECTION', payload: RX_SECTIONS[rxIdx] } }));
  });
  document.getElementById('btn-rx-theme')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('cv:shell-react', { detail: { action: 'TOGGLE_THEME' } }));
  });
  document.getElementById('btn-rx-ping')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('cv:shell-react', { detail: { action: 'PING_MFE' } }));
  });

  // Shell → Vue MFE buttons
  document.getElementById('btn-pn-section')?.addEventListener('click', () => {
    pnIdx = (pnIdx + 1) % PN_SECTIONS.length;
    window.dispatchEvent(new CustomEvent('cv:shell-vue', { detail: { action: 'setSection', payload: PN_SECTIONS[pnIdx] } }));
  });
  document.getElementById('btn-pn-fetch')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('cv:shell-vue', { detail: { action: 'fetchProjects' } }));
  });
  document.getElementById('btn-pn-broadcast')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('cv:shell-vue', { detail: { action: 'broadcastEvent' } }));
  });
}

async function bootstrap() {
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
