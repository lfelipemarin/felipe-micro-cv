import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => {
  const deployBase = process.env.DEPLOY_BASE;

  // Same CSS-path fix as mfe-react: absolute base prevents the double-assets
  // segment bug in federation's dynamicLoadingCss when the shell loads this remote.
  // For GH Pages, DEPLOY_BASE provides the absolute origin instead.
  const base = deployBase
    ? `${deployBase}mfe-vue/`
    : command === 'build' ? 'http://localhost:5002/' : '/';

  return {
    base,
    plugins: [
      vue(),
      tailwindcss(),
      federation({
        name: 'mfe_vue',
        filename: 'remoteEntry.js',
        exposes: {
          './App': './src/expose',
        },
        shared: {
          vue: { singleton: true, requiredVersion: '^3.0.0' },
          pinia: { singleton: true },
        },
      }),
    ],
    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },
    build: {
      target: 'esnext',
      modulePreload: false,
      minify: false,
    },
    server: { port: 5002, cors: true },
    preview: { port: 5002 },
  };
});
