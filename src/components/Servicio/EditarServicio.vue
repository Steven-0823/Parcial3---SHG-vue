<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Editar Servicio</h1>
      <div class="card">
        <div class="card-header fw-bold">Servicio</div>
        <div class="card-body">
          <form @submit.prevent="updateServicio">
            <div class="row mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="user" />
                </div>
                <input type="text" class="form-control" id="nombre" placeholder="Nombre" v-model="servicio.nombre" required />
              </div>
            </div>
            <div class="row mb-3">
              <label for="descripcion" class="form-label">Descripcion</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="user" />
                </div>
                <input type="text" class="form-control" id="descripcion" placeholder="Descripcion" v-model="servicio.descripcion" required />
              </div>
            </div>
            <div class="row mb-3">
              <label for="costo" class="form-label">Costo</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="envelope" />
                </div>
                <input type="number" class="form-control" id="costo" placeholder="Costo" v-model="servicio.costo" required />
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
  name: 'EditarServicio',
  data() {
    return {
      servicio: {
        id: null,
        nombre: '',
        descripcion: '',
        costo: ''
      }
    }
  },
  methods: {
    cancelar() {
      this.$router.push({ name: 'Servicio' })
    },
    async updateServicio() {
      try {
        const res = await axios.put(`http://127.0.0.1:8000/api/servicios/${this.servicio.id}`, this.servicio)
        if (res.status === 200) {
          this.$router.push({ name: 'Servicio' })
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El servicio ha sido actualizado',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch (error) {
        console.error('Error updating servicio:', error)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al actualizar el servicio',
          showConfirmButton: false,
          timer: 2000
        });
      }
    },
    loadServicio() {
      axios.get(`http://127.0.0.1:8000/api/servicios/${this.$route.params.id}`)
        .then(response => {
          this.servicio = response.data.servicio
        })
        .catch(error => {
          console.error('Error loading servicio:', error)
        })
    }
  },
  mounted() {
    this.loadServicio()
  }
}
</script>
