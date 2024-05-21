<template>
    <div class="container">
      <h1 class="text-start">
        Listado de Servicios |
        <button @click="newServicio" class="btn btn-success mx-2">
          <font-awesome-icon icon="plus"/>
        </button>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Costo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(servicio, index) in servicios" :key="index">
            <th scope="row">{{ servicio.id }}</th>
            <td>{{ servicio.nombre }}</td>
            <td>{{ servicio.descripcion }}</td>
            <td>{{ servicio.costo }}</td>
            <td>
              <button @click="deleteServicio(servicio.id)" class="btn btn-danger mx-2">
                <font-awesome-icon icon="trash" />
              </button>
              <button @click="editServicio(servicio.id)" class="btn btn-warning mx-2">
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
    name: 'Servicio',
    data() {
      return {
        servicios: []
      }
    },
    methods: {
      deleteServicio(codigo) {
        Swal.fire({
          title: `Do you want to delete the client with id ${codigo}?`,
          showCancelButton: true,
          confirmButtonText: 'Delete',
        }).then(result => {
          if (result.isConfirmed) {
            axios.delete(`http://127.0.0.1:8000/api/servicios/${codigo}`)
              .then(response => {
                if (response.data.success) {
                  Swal.fire('Deleted!', '', 'success')
                  this.servicios = this.servicios.filter(servicio => servicio.id !== codigo)
                }
              })
          }
        })
      },
      editServicio(id) {
        this.$router.push({ name: 'EditarServicio', params: { id:`${id}` } })
      },
      newServicio() {
        this.$router.push({ name: 'NewServicio' })
      }
    },
    mounted() {
      axios.get('http://127.0.0.1:8000/api/servicios')
        .then(response => (
          this.servicios = response.data.servicios 
        ))
    }
  }
  </script>
  