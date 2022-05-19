import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  base: '/nft-meta-wall-frontend/', // gh-pages 設定路徑
  plugins: [
    vue(),
    viteMockServe({
      supportTs: true,
    }),
    AutoImport({
      imports: ['vue', 'vue-router'], // 自動引入的 api
      dts: 'src/auto-imports.js',
    }),
    Components({
      // 從 `./src/components/` 路徑查找
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/auto-components.js',
    }),
  ],
  resolve: {
    alias: { '@/': `${path.resolve(__dirname, 'src')}/` },
  },
});
