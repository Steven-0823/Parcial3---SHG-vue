<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Agregar Nuevo Cliente</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Cliente
        </div>
        <div class="card-body">
          <form @submit.prevent="saveCliente">
            <div class="row mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="user" />
                </div>
                <input type="text" class="form-control" id="nombre" placeholder="Nombre del cliente" v-model="cliente.nombre" required>
              </div>
            </div>
            <div class="row mb-3">
              <label for="apellido" class="form-label">Apellido</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="user" />
                </div>
                <input type="text" class="form-control" id="apellido" placeholder="Apellido del cliente" v-model="cliente.apellido" required>
              </div>
            </div>
            <div class="row mb-3">
              <label for="email" class="form-label">Email</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="envelope" />
                </div>
                <input type="email" class="form-control" id="email" placeholder="Email del cliente" v-model="cliente.email" required>
              </div>
            </div>
            <div class="row mb-3">
              <label for="telefono" class="form-label">Teléfono</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="phone" />
                </div>
                <input type="text" class="form-control" id="telefono" placeholder="Teléfono del cliente" v-model="cliente.telefono" required>
              </div>
            </div>
            <button type="submit" class="btn btn-success">Agregar</button>
            <button type="button" class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'NewCliente',
    data() {
      return {
        cliente: {
          nombre: '',
          apellido: '',
          email: '',
          telefono: ''
        }
      }
    },
    methods: {
      cancelar() {
        this.$router.push({ name: 'Cliente' });
      },
      async saveCliente() {
        
          const res = await axios.post(`http://127.0.0.1:8000/api/clientes`, this.cliente);
          if (res.status == 200) {
            this.$router.push({ name: 'Cliente' });
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cliente creado exitosamente',
              showConfirmButton: false,
              timer: 2000
            });
          }
        
      }
    }
  }
  </script>
  
  <style scoped>
  /* Tus estilos aquí */
  </style>
  