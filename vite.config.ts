import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Markdown from 'vite-plugin-md';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: [
        { src: 'src/pages', path: '' },
      ],
      extensions: ['.vue', '.md'],
      importMode: 'async',
    }),
    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        '@vueuse/core'
      ],
      resolvers: [ElementPlusResolver()],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables/**', 'src/store', 'src/utils', 'src/system/store'],
      vueTemplate: true,
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    Pages(),
    Layouts({
      layoutsDirs: 'src/layouts',
    }),
    // ⚠️ Vue must be placed after VueRouter()
    vue({
      include: [/\.vue$/], // .md 파일을 vue 컴포넌트로 처리
    }),
    Markdown()
  ],
  resolve: {
      alias: {
         '@/': `${path.resolve(__dirname, 'src')}/`,
      },
  },
})

