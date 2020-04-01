import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Dashboard,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/projects',
    name: 'projects-index',
    component: () => import(/* webpackChunkName: "projects-index" */ '../views/projects/index.vue'),
  },
  {
    path: '/users',
    name: 'users-index',
    component: () => import(/* webpackChunkName: "projects-index" */ '../views/users/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
