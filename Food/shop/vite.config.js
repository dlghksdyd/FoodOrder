import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 57432,
    },
    build: {
        outDir: '../Food.Server/wwwroot/',
        emptyOutDir: true, // outDir 비우고 새 빌드 (권장)
    },
})
