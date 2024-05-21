<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Agregar Nueva Habitación</h1>
        <div class="card">
            <div class="card-header fw-bold">Habitación</div>
            <div class="card-body">
                <form @submit.prevent="saveHabitacion">
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
    name: 'NewHabitacion',
    data() {
        return {
            habitacion: {
                numero: '',
                tipo: '',
                precio_noche: '',
                estado: ''
            }
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'Habitacion' });
        },
        async saveHabitacion() {
            try {
                const res = await axios.post(`http://127.0.0.1:8000/api/habitaciones`, this.habitacion);
                if (res.status == 200) {
                    this.$router.push({ name: 'Habitacion' });
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Habitación creada exitosamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al crear la habitación',
                    text: error.response.data.message,
                    showConfirmButton: true
                });
            }
        }
    }
}
</script>

<style scoped>
/* Tus estilos aquí */
</style>
