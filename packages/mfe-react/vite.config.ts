import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => {
  const deployBase = process.env.DEPLOY_BASE;

  // When built as a federation remote the preview server lives at :5001.
  // Setting an absolute base makes dynamicLoadingCss() in remoteEntry.js use
  // the isAbsoluteUrl branch, which resolves CSS as:
  //   http://localhost:5001 + assets/__federation_expose_App-*.css   ✓
  // Without it, curUrl is already "…/assets/" and the relative join doubles
  // the segment: …/assets/assets/__federation_expose_App-*.css       ✗
  // For GH Pages, DEPLOY_BASE provides the absolute origin instead.
  const base = deployBase
    ? `${deployBase}mfe-react/`
    : command === 'build' ? 'http://localhost:5001/' : '/';

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: 'mfe_react',
        filename: 'remoteEntry.js',
        exposes: {
          './App': './src/expose',
        },
        shared: {
          react: { singleton: true, requiredVersion: '^19.0.0' },
          'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
          // jsx-runtime is imported by the automatic JSX transform ("react-jsx").
          // Without this, React gets bundled twice — once here and once in the shell —
          // causing "Invalid hook call / more than one copy of React".
          'react/jsx-runtime': { singleton: true },
          'react/jsx-dev-runtime': { singleton: true },
          '@reduxjs/toolkit': { singleton: true },
          'react-redux': { singleton: true },
        },
      }),
    ],
    build: {
      target: 'esnext',
      modulePreload: false,
      minify: false,
    },
    server: { port: 5001, cors: true },
    preview: { port: 5001 },
  };
});
