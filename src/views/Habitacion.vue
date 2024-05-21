<template>
    <div class="container">
      <h1 class="text-start">
        Listado de habitaciones |
        <button @click="newHabitacion" class="btn btn-success mx-2">
          <font-awesome-icon icon="plus"/>
        </button>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Número</th>
            <th scope="col">Tipo</th>
            <th scope="col">Precio por Noche</th>
            <th scope="col">Estado</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(habitacion, index) in habitaciones" :key="index">
            <th scope="row">{{ habitacion.id }}</th>
            <td>{{ habitacion.numero }}</td>
            <td>{{ habitacion.tipo }}</td>
            <td>{{ habitacion.precio_noche }}</td>
            <td>{{ habitacion.estado }}</td>
            <td>
              <button @click="deleteHabitacion(habitacion.id)" class="btn btn-danger mx-2">
                <font-awesome-icon icon="trash" />
              </button>
              <button @click="editHabitacion(habitacion.id)" class="btn btn-warning mx-2">
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
    name: 'Habitacion',
    data() {
      return {
        habitaciones: []
      }
    },
    methods: {
      deleteHabitacion(id) {
        Swal.fire({
          title: `¿Deseas eliminar la habitación con id ${id}?`,
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
        }).then(result => {
          if (result.isConfirmed) {
            axios.delete(`http://127.0.0.1:8000/api/habitaciones/${id}`)
              .then(response => {
                if (response.data.success) {
                  Swal.fire('¡Eliminada!', '', 'success')
                  this.habitaciones = this.habitaciones.filter(habitacion => habitacion.id !== id)
                }
              })
          }
        })
      },
      editHabitacion(id) {
        this.$router.push({ name: 'EditarHabitacion', params: { id: `${id}` } })
      },
      newHabitacion() {
        this.$router.push({ name: 'NewHabitacion' })
      }
    },
    mounted() {
      axios.get('http://127.0.0.1:8000/api/habitaciones')
        .then(response => {
          this.habitaciones = response.data.habitaciones
        })
    }
  }
  </script>
  
  <style scoped>
  /* Tus estilos aquí */
  </style>
  