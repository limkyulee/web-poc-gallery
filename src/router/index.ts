// import { createRouter, createWebHistory } from 'vue-router';

// import LayoutDefault from '@/layouts/main.vue'

// import Upcoming from '@/pages/common/upcoming.vue';
// import NotFound from '@/pages/common/not-found.vue';

// import infinityRoute from '@/router/modules/poc.infinity-scroll';
// import webGlRoute from '@/router/modules/poc.web-gl';
// // import gsapRoute from '@/router/modules/poc.gsap';

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   scrollBehavior() {
//     return { top: 0 }; // 페이지 이동 시 항상 최상단 스크롤
//   },
//   routes: [
//     // 기본 레이아웃
//     {
//       path: '/',
//       component: LayoutDefault,
//       children: [
//         {
//           path: '',
//           name: 'Home',
//           component: () => import('@/pages/index.vue'),
//         }
//       ],
//     },
//     infinityRoute,
//     webGlRoute,
//     // gsapRoute,
//     { path: '/upcoming', name: 'Upcoming', component: Upcoming },
//     { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
//   ],
// });

// // beforeEach
// router.beforeEach(() => {})
// // afterEach
// router.afterEach(() => {});

// export default router;
