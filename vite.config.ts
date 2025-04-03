import { defineConfig } from 'vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import path from 'node:path'

import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import Markdown from 'vite-plugin-md';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core'
      ],
      resolvers: [ElementPlusResolver()],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables/**', 'src/store', 'src/utils'],
      vueTemplate: true,
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // ⚠️ Vue must be placed after VueRouter()
    vue({
      include: [/\.vue$/, /\.md$/], // .md 파일을 vue 컴포넌트로 처리
    }),
    Pages({
      dirs: 'src/pages',
      extensions: ['vue']
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default'
    }),
    Markdown(),
    tailwindcss(),
  ],
  resolve: {
      alias: {
         '@': `${path.resolve(__dirname, 'src')}`,
      },
  },
})

