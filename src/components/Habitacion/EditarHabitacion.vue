<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar Habitación</h1>
        <div class="card">
            <div class="card-header fw-bold">Habitación</div>
            <div class="card-body">
                <form @submit.prevent="updateHabitacion">
                    <div class="row mb-3">
                        <label for="numero" class="form-label">Número</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="door-open" />
                            </div>
                            <input type="text" class="form-control" id="numero" placeholder="Número de la habitación" v-model="habitacion.numero" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="tipo" class="form-label">Tipo</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="bed" />
                            </div>
                            <input type="text" class="form-control" id="tipo" placeholder="Tipo de la habitación" v-model="habitacion.tipo" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="precio_noche" class="form-label">Precio por Noche</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="dollar-sign" />
                            </div>
                            <input type="number" class="form-control" id="precio_noche" placeholder="Precio por noche" v-model="habitacion.precio_noche" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="estado" class="form-label">Estado</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="info-circle" />
                            </div>
                            <input type="text" class="form-control" id="estado" placeholder="Estado de la habitación" v-model="habitacion.estado" required>
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
    name: 'EditarHabitacion',
    data() {
        return {
            habitacion: {
                id: null,
                numero: '',
                tipo: '',
                precio_noche: '',
                estado: ''
            }
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'Habitacion' })
        },
        async updateHabitacion() {
                const res = await axios.put(`http://127.0.0.1:8000/api/habitaciones/${this.habitacion.id}`, this.habitacion)
                if (res.status == 200) {
                    this.$router.push({ name: 'Habitacion' })
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Habitación ha sido actualizada',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            
        },
        loadHabitacion() {
            axios.get(`http://127.0.0.1:8000/api/habitaciones/${this.$route.params.id}`)
                .then(response => {
                    this.habitacion = response.data.habitacion
                })
        }
    },
    mounted() {
        this.loadHabitacion()
    }
}
</script>

<style scoped>
/* Tus estilos aquí */
</style>
