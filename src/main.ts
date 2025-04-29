import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

// page
import NotFound from '@/pages/common/not-found.vue'

// plugin
import VueMaplibreGl from '@indoorequal/vue-maplibre-gl'

// style
import './style.css'

// catch-all 추가
routes.push({
  path: '/:pathMatch(.*)*',
  component: NotFound,
  meta: { layout: false }
})

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes)
})

createApp(App)
  .use(router)
  .use(VueMaplibreGl)
  .mount('#app')