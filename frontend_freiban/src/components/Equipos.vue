<template>
    <div class="ctn-equipos">
        <div class="equipos">
            <h1>EQUIPO WE ARE THE BEST</h1>
            <div class="campos">
                <p class="p">MARCA:</p>
                <p>sdsasdsddsad</p>
            </div>
            <div class="campos">
                <p class="p">MARCA:</p>
                <p>sadsdasdsdasd</p>
            </div>
            <div class="campos">
                <p class="p">MODELO:</p>
                <p>asdsadsadsdasda</p>
            </div>
            <div class="campos">
                <p class="p">SERIAL:</p>
                <p>asdsadsaasdasdsa</p>
            </div>
            <div class="campos">
                <p class="p">ACTIVO FIJO:</p>
                <p>asdsadasdasdsa</p>
            </div>
            <div class="campos">
                <p class="p">UBICACIÓN:</p>
                <p>asdasdsadasdasdsadas</p>
            </div>
            <div>
                <button class="btn">VER DOCUMENTOS</button>
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
            equipos: []
        }
    },
    methods: {
        cargarEquipos(){
            axios.get("https://app-controljf.herokuapp.com/equipo/activos")
            .then((result)=>{
                if(result.data.success){
                    this.equipos = result.data.body
                }else{
                    Swal.fire({
                            icon: "info",
                            title: "No se han cargado equipos",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                }
            }).catch((err)=>{
                Swal.fire({
                            icon: "error",
                            title: "Usuario y/o contraseña incorrecta",
                            showConfirmButton: false,
                            timer: 1200,
                        });
            })
        }
    },
    mounted(){
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
    width: 500px;
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
</style>