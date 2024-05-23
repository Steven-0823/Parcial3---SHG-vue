<template>
  <div class="container">
    <h1 class="text-start">
      Listado de Reservas Servicios |
      <button @click="newReservaServicio" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus"/>
      </button>
    </h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Reserva</th>
          <th scope="col">Servicios</th>
          <th scope="col">Fecha</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(reserva_servicio, index) in reservas_servicios" :key="index">
          <th scope="row">{{ reserva_servicio.id }}</th>
          <td>{{ reserva_servicio.reserva_id }}</td>
          <td>{{ reserva_servicio.servicio_id }}</td>
          <td>{{ reserva_servicio.fecha }}</td>
          <td>{{ reserva_servicio.cantidad }}</td>
          <td>
            <button @click="deleteReservaservicio(reserva_servicio.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
            <button @click="editReservaservicio(reserva_servicio.id)" class="btn btn-warning mx-2">
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
  name: 'ReservaServicios',
  data() {
    return {
      reservas_servicios: []
    }
  },
  methods: {
    deleteReservaservicio(id) {
      Swal.fire({
        title: `¿Deseas eliminar la reserva con id ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
      }).then(result => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/reservas_servicios/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminada!', '', 'success')
                this.reservas_servicios = this.reservas_servicios.filter(reserva_servicio => reserva_servicio.id !== id)
              }
            }).catch(error => {
              Swal.fire('Error', 'Error al eliminar la reserva', 'error')
              console.error('Error:', error)
            })
        }
      })
    },
    editReservaservicio(id) {
      this.$router.push({ name: 'EditarReservaServicio', params: { id: `${id}` } })
    },
    newReservaServicio() {
      this.$router.push({ name: 'NewReservaServicio' })
    }
  },
  mounted() {
  axios.get('http://127.0.0.1:8000/api/reservas_servicios')
    .then(response => {
      console.log(response.data); // Agrega esto para verificar los datos recibidos
      this.reservas_servicios = response.data.reserva_servicios;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

}
</script>

<style scoped>
/* Tus estilos aquí */
</style>
