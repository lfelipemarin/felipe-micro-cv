import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
// Same inline-CSS strategy as mfe-react: federation doesn't inject the .css
// chunk, so we pull the processed Tailwind CSS as a string and inject it.
import css from './style.css?inline';

function injectStyles() {
  const id = '__mfe_vue_styles__';
  if (!document.getElementById(id)) {
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
  }
}

export function mount(el: HTMLElement) {
  injectStyles();
  const pinia = createPinia();
  const app = createApp(App);
  app.use(pinia);
  app.mount(el);
  return () => app.unmount();
}

// Default export keeps @originjs/vite-plugin-federation from wrapping
// the module under .default, allowing `vueMFE.mount(el)` in the shell.
export default { mount };
