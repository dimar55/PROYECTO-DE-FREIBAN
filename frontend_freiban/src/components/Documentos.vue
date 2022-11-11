<template>
  <transition name="fade">
    <div class="modal-overlay" v-show="showModalRecurso"></div>
  </transition>
  <transition name="fade">
    <div class="modal" v-show="showModalRecurso">
      <div class="modal-container">
        <div class="container-flex">
          <h1>Añadir EPP</h1>
          <img src="../assets/icon_X.png" alt="" @click="cerrarModal()">
        </div>
        <div>
          <form class="" v-on:submit.prevent="actualizarRecurso">
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

  <transition name="fade">
    <div class="modal-overlay" v-show="showModalPDF"></div>
  </transition>
  <transition name="fade">
    <div class="modal" v-show="showModalPDF">
      <div class="modal-container">
        <div class="container-flex">
          <h1>PDF</h1>
          <img src="../assets/icon_X.png" alt="" @click="cerrarPDF()">
        </div>
        <div>
          <iframe class="embed-responsive-item" :src="pdf" allowfullscreen width="1280" height="720"></iframe>
        </div>
      </div>
    </div>
  </transition>

  <div class="ctn-equipos">
    <div class="equipos" v-for="recurso in recursos">
      <h1>{{ recurso.nombre_recurso }}</h1>
      <div class="container-flex-se">
        <button class="btn" @click="actualizar(recurso.id_recurso)">ACTUALIZAR</button>
        <button class="btn" @click="verPDF(recurso.valor_recurso)">VER PDF</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: 'Documentos',
  data() {
    return {
      file: null,
      recurso: null,
      showModalRecurso: false,
      showModalPDF: false,
      equipo: this.$route.params.Id_equipo,
      pdf: "",
      recursos: []
    }
  },
  methods: {
    cargarRecursos() {
      axios.get("https://app-controljf.herokuapp.com/recurso/" + this.equipo)
        .then((result) => {
          if (result.data.success) {
            this.recursos = result.data.body
          } else {
            Swal.fire({
              icon: "info",
              title: "No se han cargado los recursos",
              showConfirmButton: false,
              timer: 1200,
            });
          }
        }).catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "No se han cargado los recursos",
            showConfirmButton: false,
            timer: 1200,
          });
        })
    },
    actualizar(recurso) {
      this.showModalRecurso = true;
      this.recurso = recurso;
    },
    cerrarModal(){
      this.showModalRecurso = false;
      this.file = null;
      this.$refs.actualizarRecurso.value = null;
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return this.file = null
      this.file = files[0];
    },
    actualizarRecurso() {
      console.log(this.file)
      if (this.recurso) {
        Swal.fire({
          title: 'Actualizando',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        });
        var formData = new FormData();
        formData.append("file", this.file);
        formData.append("Id_recurso", this.recurso);
        axios.put("https://app-controljf.herokuapp.com/recurso/", formData)
          .then((result) => {
            Swal.close();
            if (result.data.success) {
              Swal.fire({
                icon: "success",
                title: "Recurso actualizado",
                showConfirmButton: false,
                timer: 1000,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "No se ha podido actualizar el recurso",
                showConfirmButton: false,
                timer: 1200,
              });
            }
            this.$router.push({ path: '/Menu' });
          }).catch((err) => {
            Swal.close();
            
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "No se ha podido actualizar el recurso",
              showConfirmButton: false,
              timer: 1200,
            });
            this.$router.push({ path: '/Menu' });
          })
          this.cerrarModal();
          
      }

    },
    verPDF(pdf){
      this.pdf = pdf;
      this.showModalPDF = true;
    },
    cerrarPDF(){
      this.pdf = "";
      this.showModalPDF = false;
    }
  },
  mounted() {
    this.cargarRecursos();
  }
}
</script>

<style>
.modal-overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);

}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
}

.modal-container {
  background: #A6E8FA;
  padding: 2rem;
  border-radius: 25px;

}


.modal-container p {
  font-size: 30px;
  padding-right: 10px;
}

.container-flex {
  display: flex;
  justify-content: space-between;
}

.container-flex h1 {
  margin-left: 30px;
  font-size: 30px;
  font-weight: bolder;
}

.text-centerB {
  text-align: center;
}
</style>