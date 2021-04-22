import { createRouter, createWebHistory } from 'vue-router'
import ViewSettings from '../views/ViewSettings';
import ViewPlay from '../views/ViewPlay';
import ViewResults from '../views/ViewResults';
import ViewNotFound from '../views/ViewNotFound';

const routes = [
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
