import { defineConfig, loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import vitePluginHtmlEnv from 'vite-plugin-html-env';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }): UserConfig => {
  /**
   * 获取项目目录
   */
  // @ts-ignore
  const root = process.cwd();
  /**
   * 获取环境变量
   */
  const { VITE_PORT, VITE_GLOB_API_URL } = loadEnv(mode, root);

  return {
    /**
     * fix: The esm-bundler builds now exposes global feature flags that can be overwritten at compile time
     * see: https://vue-i18n.intlify.dev/guide/advanced/optimization.html#reduce-bundle-size-with-feature-build-flags
     */
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    plugins: [
      vue(),
      eslintPlugin({
        include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
      }),
      vitePluginHtmlEnv({
        compiler: true,
      }),
      vueJsx(),
    ],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve('src') }],
    },
    server: {
      host: '0.0.0.0',
      port: Number(VITE_PORT),
      proxy: {
        '^/proxy/.*': {
          target: 'http://127.0.0.1:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy/, ''),
        },
      },
    },
  };
});
