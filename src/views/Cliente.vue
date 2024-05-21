<template>
    <div class="container">
      <h1 class="text-start">
        Listado de Clientes |
        <button @click="newCliente" class="btn btn-success mx-2">
          <font-awesome-icon icon="plus"/>
        </button>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Email</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cliente, index) in clientes" :key="index">
            <th scope="row">{{ cliente.id }}</th>
            <td>{{ cliente.nombre }}</td>
            <td>{{ cliente.apellido }}</td>
            <td>{{ cliente.email }}</td>
            <td>{{ cliente.telefono }}</td>
            <td>
              <button @click="deleteCliente(cliente.id)" class="btn btn-danger mx-2">
                <font-awesome-icon icon="trash" />
              </button>
              <button @click="editCliente(cliente.id)" class="btn btn-warning mx-2">
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
    name: 'Cliente',
    data() {
      return {
        clientes: []
      }
    },
    methods: {
      deleteCliente(codigo) {
        Swal.fire({
          title: `Do you want to delete the client with id ${codigo}?`,
          showCancelButton: true,
          confirmButtonText: 'Delete',
        }).then(result => {
          if (result.isConfirmed) {
            axios.delete(`http://127.0.0.1:8000/api/clientes/${codigo}`)
              .then(response => {
                if (response.data.success) {
                  Swal.fire('Deleted!', '', 'success')
                  this.clientes = this.clientes.filter(cliente => cliente.id !== codigo)
                }
              })
          }
        })
      },
      editCliente(id) {
        this.$router.push({ name: 'EditarCliente', params: { id:`${id}` } })
      },
      newCliente() {
        this.$router.push({ name: 'NewCliente' })
      }
    },
    mounted() {
      axios.get('http://127.0.0.1:8000/api/clientes')
        .then(response => (
          this.clientes = response.data.clientes 
        ))
    }
  }
  </script>
  