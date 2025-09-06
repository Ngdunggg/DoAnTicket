import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    assetsInclude: [
        '**/*.png',
        '**/*.jpg',
        '**/*.jpeg',
        '**/*.svg',
        '**/*.gif',
    ],

    base: './',

    build: {
        outDir: '../dist',
        rollupOptions: {
            input: './src/index.html',
            output: {
                assetFileNames: assetInfo => {
                    const [name] = assetInfo.names;
                    if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(name)) {
                        return 'assets/images/[name].[hash][extname]';
                    }
                    if (/\.(css|scss)$/i.test(name)) {
                        return 'assets/[name].[hash][extname]';
                    }
                    return 'assets/[name].[hash][extname]';
                },
            },
        },
    },
    // Define global variables and process.env variables
    define: {
        global: 'window',
        'process.env': {
            ...loadEnv(mode, process.cwd(), 'VITE_APP'),
            NODE_ENV: mode,
        },
    },
    plugins: [
        react(),
        tsconfigPaths(),
        tailwindcss(),
        viteStaticCopy({
            targets: [
                {
                    dest: '.',
                    src: '../public/mockServiceWorker.js',
                },
                {
                    dest: 'assets/images',
                    src: './assets/images/*',
                },
            ],
        }),
    ],
    publicDir: false,
    root: './src',
    server: {
        port: 3000,
    },
}));
