import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(rootDir, 'src')
      },
      {
        find: '@service',
        replacement: resolve(rootDir, 'src/service')
      }
    ],
    extensions: ['.js', '.jsx', '.json']
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
