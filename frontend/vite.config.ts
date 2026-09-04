import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const rootEnvDir = path.resolve(__dirname, '../');
  const env = loadEnv(mode, rootEnvDir, '');
  const port = parseInt(env.FRONTEND_PORT || '5173', 10);

  return {
    plugins: [react()],
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
