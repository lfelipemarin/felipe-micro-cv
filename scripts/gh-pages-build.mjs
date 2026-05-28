import { execSync } from 'child_process';
import { cpSync, mkdirSync, rmSync } from 'fs';

const DEPLOY_BASE = process.env.DEPLOY_BASE
  ?? 'https://lfelipemarin.github.io/felipe-micro-cv/';

const env = { ...process.env, DEPLOY_BASE };

console.log(`\n→ Building for ${DEPLOY_BASE}\n`);

execSync('pnpm -F mfe-react build', { env, stdio: 'inherit' });
execSync('pnpm -F mfe-vue build',   { env, stdio: 'inherit' });
execSync('pnpm -F shell build',     { env, stdio: 'inherit' });

// Merge all three dists into a single folder:
//   dist/             ← shell
//   dist/mfe-react/   ← React MFE
//   dist/mfe-vue/     ← Vue MFE
rmSync('dist', { recursive: true, force: true });
mkdirSync('dist/mfe-react', { recursive: true });
mkdirSync('dist/mfe-vue',   { recursive: true });

cpSync('packages/shell/dist',     'dist',           { recursive: true });
cpSync('packages/mfe-react/dist', 'dist/mfe-react', { recursive: true });
cpSync('packages/mfe-vue/dist',   'dist/mfe-vue',   { recursive: true });

console.log('\n✓ GH Pages dist ready at ./dist/\n');
