<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Reserva Servicio</h1>
    <div class="card">
      <div class="card-header fw-bold">Reserva Servicio</div>
      <div class="card-body">
        <form @submit.prevent="updateServicioreserva">
          <div class="row mb-3">
            <label for="reserva_id" class="form-label">Reserva</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="user" />
              </div>
              <select class="form-control" id="reserva_id" v-model="reserva_servicio.reserva_id" required>
                <option v-for="reserva in reservas" :key="reserva.id" :value="reserva.id">
                  {{ reserva.id }}
                </option>
              </select>
            </div>
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
  name: 'EditarReservaServicio',
  data() {
    return {
      reserva_servicio: {
        id: null,
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
    async updateServicioreserva() {
      try {
        const res = await axios.put(`http://127.0.0.1:8000/api/reservas_servicios/${this.$route.params.id}`, this.reserva_servicio);

        if (res.status == 200) {
          this.$router.push({ name: 'ReservaServicio' })
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
    async loadReservaservicio() {
      const response = await axios.get(`http://127.0.0.1:8000/api/reservas_servicios/${this.$route.params.id}`)
      this.reserva_servicio = response.data.reserva_servicio
    },
    async loadReserva() {
      const reservasRes = await axios.get('http://127.0.0.1:8000/api/reservas')
      this.reservas = reservasRes.data.reservas
    },
    async loadServicios() {
      const serviciosRes = await axios.get('http://127.0.0.1:8000/api/servicios')
      this.servicios = serviciosRes.data.servicios
    }
  },
  mounted() {
    this.loadReservaservicio()
    this.loadReserva()   
    this.loadServicios()
  }
}
</script>

<style scoped>
/* Tus estilos aquí */
</style>
