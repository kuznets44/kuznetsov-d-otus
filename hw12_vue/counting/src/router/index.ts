import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ViewSettings from "../views/ViewSettings.vue";
import ViewPlay from "../views/ViewPlay.vue";
import ViewResults from "../views/ViewResults.vue";
import ViewNotFound from "../views/ViewNotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Настройки',
    component: ViewSettings
  },
  {
    path: '/play',
    name: 'Игра',
    component: ViewPlay
  },
  {
    path: '/results',
    name: 'Результаты',
    component: ViewResults
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: ViewNotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
