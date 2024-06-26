import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

import Cliente from '../views/Cliente.vue';
import NewCliente from '../components/Cliente/NewCliente.vue';
import EditarCliente from '../components/Cliente/EditarCliente.vue';

import Habitacion from '../views/Habitacion.vue';
import NewHabitacion from '../components/Habitacion/NewHabitacion.vue';
import EditarHabitacion from '../components/Habitacion/EditarHabitacion.vue';

import Reserva from '../views/Reserva.vue';
import EditarReserva from '../components/Reserva/EditarReserva.vue';
import NewReserva from '../components/Reserva/NewReserva.vue';

import Servicio from '../views/Servicios.vue';
import EditarServicio from '../components/Servicio/EditarServicio.vue';
import NewServicio from '../components/Servicio/NewServicio.vue';

import Reservas_servicios from '../views/Reservas_servicios.vue';
import EditarReservaServicio from '../components/Reserva_Servicio/EditarReservaServicio.vue';
import NewReservaServicio from '../components/Reserva_Servicio/NewReservaServicio.vue';

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
  },
  {
    path: '/habitaciones',
    name: 'Habitacion',
    component: Habitacion
  },
  {
    path: '/habitaciones/new',
    name: 'NewHabitacion',
    component: NewHabitacion
  },
  {
    path: '/habitaciones/edit/:id',
    name: 'EditarHabitacion',
    component: EditarHabitacion
  },
  {
    path: '/reservas',
    name: 'Reserva',
    component: Reserva
  },
  {
    path: '/reservas/nueva',
    name: 'NewReserva',
    component: NewReserva
  },
  {
    path: '/reservas/editar/:id',
    name: 'EditarReserva',
    component: EditarReserva
  },
  {
    path: '/servicios',
    name: 'Servicio',
    component: Servicio
  },
  {
    path: '/servicios/edit/:id',
    name: 'EditarServicio',
    component: EditarServicio
  },
  {
    path: '/servicios/new',
    name: 'NewServicio',
    component: NewServicio
  },
  {
    path: '/reserva_servicios',
    name: 'ReservasServicio',
    component: Reservas_servicios
  },
  {
    path: '/reserva_servicios/edit/:id',
    name: 'EditarReservaServicio',
    component: EditarReservaServicio
  },
  {
    path: '/reserva_servicios/new',
    name: 'NewReservaServicio',
    component: NewReservaServicio
  }
];

const router = new VueRouter({
  routes
});

export default router;
