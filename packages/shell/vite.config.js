import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';

/**
 * @originjs/vite-plugin-federation requires remotes to be built before the
 * shell can consume them — the devExposePlugin is a no-op in Vite dev mode.
 *
 * Dev strategy:
 *   pnpm dev:mfes   → builds mfe-react + mfe-vue (outputs dist/assets/remoteEntry.js)
 *   pnpm -F mfe-react preview --port 5001   → serves the built remote
 *   pnpm -F mfe-vue  preview --port 5002
 *   pnpm -F shell    dev     --port 5000    → this config (HMR for shell itself)
 *
 * GH Pages:
 *   Set DEPLOY_BASE=https://user.github.io/repo/ — all remote URLs and the
 *   shell base switch to the deploy origin automatically.
 */
export default defineConfig(() => {
  const deployBase = process.env.DEPLOY_BASE; // undefined in local dev

  const mfeReactUrl = deployBase
    ? `${deployBase}mfe-react/assets/remoteEntry.js`
    : 'http://localhost:5001/assets/remoteEntry.js';

  const mfeVueUrl = deployBase
    ? `${deployBase}mfe-vue/assets/remoteEntry.js`
    : 'http://localhost:5002/assets/remoteEntry.js';

  return {
    base: deployBase ?? '/',
    plugins: [
      federation({
        name: 'shell',
        remotes: {
          mfe_react: mfeReactUrl,
          mfe_vue:   mfeVueUrl,
        },
        // The shell is pure vanilla JS — it does NOT own React, Vue, or any
        // framework runtime. Listing them here would cause the shell's Vite dev
        // server to register a *separate* instance of each library in
        // globalThis.__federation_shared__, which makes importShared() in each
        // MFE return the shell's copy (a different URL / module evaluation).
        // The result is two React instances → "Invalid hook call".
        // Solution: leave shared empty. Each MFE falls back to its own bundled
        // copies exclusively (getSharedFromRuntime finds nothing → getSharedFromLocal).
        shared: [],
      }),
    ],
    build: {
      target: 'esnext',
      modulePreload: false,
      minify: false,
    },
    server: { port: 5000, cors: true },
    preview: { port: 5000 },
  };
});
