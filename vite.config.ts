import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
/// <reference types="vitest/config" />
export default defineConfig({
    plugins: [vue()],
    base: '/byu-cs-music-capstone/',
    server: {
        warmup: {
            clientFiles: [
                './src/App.vue',
                './src/models/translator.ts',
                './src/nestedMenuItems.ts',
            ],
        },
    },
    resolve: {
        extensions: [
            '.ts',
            '.vue',
            '.json',
            '.mts',
            '.tsx',
            '.mjs',
            '.js',
            '.jsx',
        ],
    },
    css: {
        preprocessorOptions: {
            sass: {
                // a newline character is required because sass doesn't use ; 😼
                additionalData: `@use "/src/style/variables.sass" as *\n`,
            },
        },
    },
})
