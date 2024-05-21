<template>
    <div class="container">
      <h1 class="text-start">
        Listado de reservas |
        <button @click="newReserva" class="btn btn-success mx-2">
          <font-awesome-icon icon="plus"/>
        </button>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Cliente</th>
            <th scope="col">Habitación</th>
            <th scope="col">Fecha de Entrada</th>
            <th scope="col">Fecha de Salida</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(reserva, index) in reservas" :key="index">
            <th scope="row">{{ reserva.id }}</th>
            <td>{{ reserva.cliente_nombre }}</td>
            <td>{{ reserva.habitacion_numero }}</td>
            <td>{{ reserva.fecha_entrada }}</td>
            <td>{{ reserva.fecha_salida }}</td>
            <td>{{ reserva.estado }}</td>
            <td>
              <button @click="deleteReserva(reserva.id)" class="btn btn-danger mx-2">
                <font-awesome-icon icon="trash" />
              </button>
              <button @click="editReserva(reserva.id)" class="btn btn-warning mx-2">
                <font-awesome-icon icon="pencil" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import Swal from 'sweetalert2'
  
  export default {
    name: 'Reserva',
    data() {
      return {
        reservas: []
      }
    },
    methods: {
      deleteReserva(id) {
        Swal.fire({
          title: `¿Deseas eliminar la reserva con id ${id}?`,
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
        }).then(result => {
          if (result.isConfirmed) {
            axios.delete(`http://127.0.0.1:8000/api/reservas/${id}`)
              .then(response => {
                if (response.data.success) {
                  Swal.fire('¡Eliminada!', '', 'success')
                  this.reservas = this.reservas.filter(reserva => reserva.id !== id)
                }
              })
          }
        })
      },
      editReserva(id) {
        this.$router.push({ name: 'EditarReserva', params: { id: `${id}` } })
      },
      newReserva() {
        this.$router.push({ name: 'NewReserva' })
      }
    },
    mounted() {
      axios.get('http://127.0.0.1:8000/api/reservas')
        .then(response => {
          this.reservas = response.data.reservas
        })
    }
  }
  </script>
  
  <style scoped>
  /* Tus estilos aquí */
  </style>
  