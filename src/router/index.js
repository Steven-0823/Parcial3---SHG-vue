import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

import Cliente from '../views/Cliente.vue';
import NewCliente from '../components/Cliente/NewCliente.vue';
import EditarCliente from '../components/Cliente/EditarCliente.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/clientes',
    name: 'Cliente',
    component: Cliente
  },
  {
    path: '/clientes/new',
    name: 'NewCliente',
    component: NewCliente
  },
  {
    path: '/clientes/edit/:id',
    name: 'EditarCliente',
    component: EditarCliente
  }
];

const router = new VueRouter({
  routes
});

export default router;
