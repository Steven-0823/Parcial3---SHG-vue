<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Editar Reserva</h1>
      <div class="card">
        <div class="card-header fw-bold">Reserva</div>
        <div class="card-body">
          <form @submit.prevent="updateReserva">
            <div class="row mb-3">
              <label for="cliente_id" class="form-label">Cliente</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="user" />
                </div>
                <select class="form-control" id="cliente_id" v-model="reserva.cliente_id" required>
                  <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                    {{ cliente.nombre }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <label for="habitacion_id" class="form-label">Habitación</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="door-open" />
                </div>
                <select class="form-control" id="habitacion_id" v-model="reserva.habitacion_id" required>
                  <option v-for="habitacion in habitaciones" :key="habitacion.id" :value="habitacion.id">
                    {{ habitacion.numero }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <label for="fecha_entrada" class="form-label">Fecha de Entrada</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="calendar-alt" />
                </div>
                <input type="date" class="form-control" id="fecha_entrada" v-model="reserva.fecha_entrada" required>
              </div>
            </div>
            <div class="row mb-3">
              <label for="fecha_salida" class="form-label">Fecha de Salida</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="calendar-alt" />
                </div>
                <input type="date" class="form-control" id="fecha_salida" v-model="reserva.fecha_salida" required>
              </div>
            </div>
            <div class="row mb-3">
              <label for="estado" class="form-label">Estado</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="info-circle" />
                </div>
                <input type="text" class="form-control" id="estado" placeholder="Estado de la reserva" v-model="reserva.estado" required>
              </div>
            </div>
            <!-- Agrega aquí los demás campos de reserva -->
            <button class="btn btn-primary" type="submit">Guardar</button>
            <button class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import Swal from 'sweetalert2'
  
  export default {
    name: 'EditarReserva',
    data() {
      return {
        reserva: {
          cliente_id: '',
          habitacion_id: '',
          fecha_entrada: '',
          fecha_salida: '',
          estado: ''
          // Agrega aquí los demás campos de reserva
        },
        clientes: [],
        habitaciones: []
      }
    },
    methods: {
      cancelar() {
        this.$router.push({ name: 'Reserva' })
      },
      async updateReserva() {
        try {
          const res = await axios.put(`http://127.0.0.1:8000/api/reservas/${this.reserva.id}`, this.reserva)
          if (res.status == 200) {
            this.$router.push({ name: 'Reserva' })
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Reserva ha sido actualizada',
              showConfirmButton: false,
              timer: 2000
            })
          }
        } catch (error) {
          console.error('Error:', error)
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al actualizar la reserva',
            text: error.response.data.message,
            showConfirmButton: true
          })
        }
      },
      async loadReserva() {
        const response = await axios.get(`http://127.0.0.1:8000/api/reservas/${this.$route.params.id}`)
        this.reserva = response.data.reserva
      },
      async loadClientes() {
        const clientesRes = await axios.get('http://127.0.0.1:8000/api/clientes')
        this.clientes = clientesRes.data.clientes
      },
      async loadHabitaciones() {
        const habitacionesRes = await axios.get('http://127.0.0.1:8000/api/habitaciones')
        this.habitaciones = habitacionesRes.data.habitaciones
      }
    },
    mounted() {
      this.loadReserva()
      this.loadClientes()
      this.loadHabitaciones()
    }
  }
  </script>
  
  <style scoped>
  /* Tus estilos aquí */
  </style>
  