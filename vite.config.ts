import type { UserConfig, ConfigEnv } from 'vite';
/* build */
import { generateModifyVars } from './build/generate/generateModifyVars';
import { wrapperEnv } from './build/utils';

/* plugin */
import vue from '@vitejs/plugin-vue';
import viteESLint from '@ehutch79/vite-eslint';

/* method */
import { loadEnv } from 'vite';
import { resolve } from 'path';

/* pkg */
import pkg from './package.json';

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  // lastBuildTime: moment().format('YYYY-MM-DD HH:mm:ss'),
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH } = viteEnv;
  const isBuild = command === 'build';
  console.log(isBuild);

  return {
    root,
    base: VITE_PUBLIC_PATH,
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
    plugins: [vue(), viteESLint({ include: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'] })],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        _views: resolve(__dirname, 'src/views'),
        _comp: resolve(__dirname, 'src/components'),
        _hooks: resolve(__dirname, 'src/hooks'),
      },
    },
    server: {
      host: true,
      port: VITE_PORT,
      open: true,
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  };
};
