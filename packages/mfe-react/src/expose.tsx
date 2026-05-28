import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
// `?inline` imports the fully-processed Tailwind CSS as a string so we can
// inject it ourselves. @originjs/vite-plugin-federation does not call
// dynamicLoadingCss() from the module map, so the separate .css chunk is
// never loaded when the shell fetches this remote. Inline injection is reliable.
import css from './style.css?inline';

function injectStyles() {
  const id = '__mfe_react_styles__';
  if (!document.getElementById(id)) {
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
  }
}

export function mount(el: HTMLElement) {
  injectStyles();
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
  return () => root.unmount();
}

// Default export keeps @originjs/vite-plugin-federation from wrapping
// the module under .default, allowing `reactMFE.mount(el)` in the shell.
export default { mount };
