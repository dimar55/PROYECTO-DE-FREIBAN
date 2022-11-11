<template>

    <transition name="fade">
        <div class="modal-overlay" v-show="showModalEquipo"></div>
    </transition>
    <transition name="fade">
        <div class="modal" v-show="showModalEquipo">
            <div class="modal-container">
                <div class="container-flex">
                    <h1>Añadir Recurso</h1>
                    <img src="../assets/icon_X.png" alt="" @click="cerrarModal()">
                </div>
                <div>
                    <form class="" v-on:submit.prevent="crearRecurso">
                        <div class="campos_usua">
                            <p>NOMBRE DEL DOCUMENTO:</p>
                            <input type="text" class="campo" v-model="recurso.Nombre_recurso" required>
                        </div>
                        <div class="campos_usu">
                            <p>DOCUMENTO:</p>
                            <input type="file" ref="actualizarRecurso" v-on:change="onFileChange" required>
                        </div>
                        <div class="text-centerB">
                            <button class="btn mbttm" type="submit">AÑADIR</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </transition>

    <div class="ctn-equipos">
        <div class="equipos" v-for="equipo in equipos">
            <h1>{{ equipo.nombre_equipo }}</h1>
            <div class="campos">
                <p class="p">MARCA:</p>
                <p>{{ equipo.marca_equipo }}</p>
            </div>
            <div class="campos">
                <p class="p">MODELO:</p>
                <p>{{ equipo.modelo_equipo }}</p>
            </div>
            <div class="campos">
                <p class="p">SERIAL:</p>
                <p>{{ equipo.serial_equipo }}</p>
            </div>
            <div class="campos">
                <p class="p">ACTIVO FIJO:</p>
                <p>{{ equipo.num_placa_equipo }}</p>
            </div>
            <div class="campos">
                <p class="p">UBICACIÓN:</p>
                <p>{{ equipo.area_equipo }}</p>
            </div>
            <div class="container-flex-se">
                <div><button class="btn" @click="goRecursos(equipo.id_equipo)">VER DOCUMENTOS</button></div>
                <div><button class="btn" @click="abrirModal(equipo.id_equipo)">SUBIR DOCUMENTO</button></div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
    name: 'Equipos',
    data() {
        return {
            equipos: [],
            showModalEquipo: false,
            recurso: {
                file: null,
                Nombre_recurso: "",
                Id_equipo: ""
            }
        }
    },
    methods: {
        cargarEquipos() {
            axios.get("https://app-controljf.herokuapp.com/equipo/activos")
                .then((result) => {
                    if (result.data.success) {
                        this.equipos = result.data.body
                    } else {
                        Swal.fire({
                            icon: "info",
                            title: "No se han cargado los equipos",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: "error",
                        title: "No se han cargado los equipos",
                        showConfirmButton: false,
                        timer: 1200,
                    });
                })
        },
        goRecursos(equipo) {
            this.$router.push({ name: 'VerDocumentos', params: { Id_equipo: equipo } });
        },
        abrirModal(equipo){
            this.showModalEquipo = true;
            this.recurso.Id_equipo = equipo;

        },
        cerrarModal() {
            this.showModalEquipo = false;
            this.$refs.actualizarRecurso.value = null;
            this.recurso = {
                file: null,
                Nombre_recurso: ""
            }
        },
        onFileChange(e) {
            const files = e.target.files || e.dataTransfer.files;
            if (!files.length) return this.file = null
            this.recurso.file = files[0];
        },
        crearRecurso(equipo) {
            if (this.recurso.file) {
                const formData = new FormData();
                formData.append("file", this.recurso.file);
                formData.append("Nombre_recurso", this.recurso.Nombre_recurso);
                formData.append("Id_equipo", this.recurso.Id_equipo);
                Swal.fire({
                    title: 'Guardando documento',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading()
                    }
                });
                axios.post("https://app-controljf.herokuapp.com/recurso/", formData)
                    .then((result) => {
                        Swal.close();
                        if (result.data.success) {
                            Swal.fire({
                                icon: "success",
                                title: "Documento insertado exitosamente",
                                showConfirmButton: false,
                                timer: 1000,
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "No se ha podido insertar el documento",
                                showConfirmButton: false,
                                timer: 1200,
                            });
                        }
                    }).catch((err) => {
                        Swal.close();
                        console.log(err);
                        Swal.fire({
                            icon: "error",
                            title: "No se ha podido insertar el documento",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                    })
                this.cerrarModal();
            }

        }
    },
    mounted() {
        this.cargarEquipos();
    }
}
</script>

<style>
.ctn-equipos {
    background-color: #0E5A96;
    width: 800px;
    margin: auto;
    margin-top: 40px;
    padding: 40px;
    border-radius: 25px;

}

.equipos {
    margin: auto;
    margin-top: 20px;
    background-color: white;
    font-size: 18px;
    color: black;
    border-radius: 25px;
    padding: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    text-align: center;
}

.campos {
    display: flex;
    padding: 10px;
    margin-left: 10px;
    font-size: 20px;
}

.p {
    font-weight: bold;
    padding-right: 20px;
}

.container-flex-se {
    display: flex;
    justify-content: space-evenly;
}

.campo{
    width: 430px;
    height: 60px;
    border-radius: 25px;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 30px;
    padding-left: 10px;
    
}

.campos_usu input{
    width: 430px;
font-size: 18px;
}
</style>