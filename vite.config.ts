import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteESLint from '@ehutch79/vite-eslint';

export default defineConfig({
  plugins: [vue(), viteESLint({ include: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'] })],
});
