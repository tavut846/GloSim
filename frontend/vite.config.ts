import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  const rootEnvDir = path.resolve(__dirname, '../');
  const env = loadEnv(mode, rootEnvDir, '');
  const port = parseInt(env.FRONTEND_PORT || '5173', 10);
  const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'));

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(pkg.version || '0.0.1'),
    },
    envDir: rootEnvDir,
    server: {
      port,
      host: true,
    },
    preview: {
      port: 3000,
      host: true,
    },
  };
});
// Vite config reload trigger

