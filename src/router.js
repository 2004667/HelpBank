import { createRouter, createWebHistory } from 'vue-router';
import Main from './views/Main.vue';
import Favourites from './views/Favourites.vue';

const routes = [
  { path: '/main', component: Main },
  { path: '/favourites', component: Favourites }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
