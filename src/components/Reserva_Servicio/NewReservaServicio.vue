<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Crear Nueva Reserva Servicio</h1>
      <div class="card">
        <div class="card-header fw-bold">Reserva Servicio</div>
        <div class="card-body">
          <form @submit.prevent="saveServicioreserva">
            <div class="row mb-3">
        <label for="reserva_id" class="form-label">Reserva</label>
        <select class="form-control" id="reserva_id" v-model="reserva_servicio.reserva_id" required>
          <option v-for="reserva in reservas" :key="reserva.id" :value="reserva.id">
            {{ reserva.id }}
          </option>
        </select>
      </div>
            <div class="row mb-3">
              <label for="servicio_id" class="form-label">Servicio</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="door-open" />
                </div>
                <select class="form-control" id="servicio_id" v-model="reserva_servicio.servicio_id" required>
                  <option v-for="servicio in servicios" :key="servicio.id" :value="servicio.id">
                    {{ servicio.nombre }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <label for="fecha" class="form-label">Fecha</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="calendar-alt" />
                </div>
                <input type="date" class="form-control" id="fecha" v-model="reserva_servicio.fecha" required>
              </div>
            </div>
            <div class="row mb-3">
              <label for="cantidad" class="form-label">Cantidad</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="calendar-alt" />
                </div>
                <input type="number" class="form-control" id="cantidad" v-model="reserva_servicio.cantidad" required>
              </div>
            </div>
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
    name: 'NewReservaServicio',
    data() {
      return {
        reserva_servicio: {
          reserva_id: '',
          servicio_id: '',
          fecha: '',
          cantidad: ''
        },
        servicios: [],
        reservas: []
      }
    },
    methods: {
      cancelar() {
        this.$router.push({ name: 'ReservaServicio' })
      },
      async saveServicioreserva() {
        try {
          const res = await axios.post('http://127.0.0.1:8000/api/reservas_servicios', this.reservas_servicio);
          if (res.status == 200) {
            this.$router.push({ name: 'ReservaServicio' })
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Reserva ha sido creada exitosamente',
              showConfirmButton: false,
              timer: 2000
            })
          }
        } catch (error) {
          console.error('Error:', error)
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al guardar la reserva',
            text: error.response.data.message,
            showConfirmButton: true
          })
        }
      },
      async loadData() {
        const [reservasRes, serviciosRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/reservas'),
          axios.get('http://127.0.0.1:8000/api/servicios')
        ]);
        this.reservas = reservasRes.data.reservas;
        this.servicios = serviciosRes.data.servicios;
      }
    },
    mounted() {
      this.loadData()
    }
  }
  </script>
  
  <style scoped>
  /* Tus estilos aquí */
  </style>
  