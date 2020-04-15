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
    path: '/project',
    name: 'project-index',
    component: () => import(/* webpackChunkName: "project-index" */ '@/views/projects/Index.vue'),
  },
  {
    path: '/project/:slug',
    name: 'project-view',
    component: () => import(/* webpackChunkName: "project-view" */ '@/views/projects/ViewProject.vue'),
  },
  {
    path: '/users',
    name: 'users-index',
    component: () => import(/* webpackChunkName: "users-index" */ '@/views/users/Index.vue'),
  },
  {
    path: '/settings',
    name: 'settings-index',
    component: () => import(/* webpackChunkName: "settings-index" */ '@/views/settings/Index.vue'),
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/errors/404.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
