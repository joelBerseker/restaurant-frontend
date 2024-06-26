<script setup>
import { isEmpty } from "@/helpers";
import { ref } from "vue";

const inputName = ref(null);
const inputFolder = ref(null);
const errorText = ref(null);

function generateCode() {
  console.log(inputName.value);
  console.log(inputFolder.value);
  if (isEmpty(inputName.value) || isEmpty(inputFolder.value)) {
    errorText.value = "Ingrese todos los datos";
    return;
  }
  errorText.value = null;
  /*AQUI LO QUE QUIERAS*/
}
</script>
<template>
  <div class="row g-4 container-content">
    <div class="col-5">
      <g-section-4 title="Ingreso de Datos" contentClass="row gutter-form">
        <g-input
          class="col-12"
          label="Palabra clave"
          v-model="inputName"
          :uppercase="false"
        />
        <g-input label="Carpeta" v-model="inputFolder" :uppercase="false" />

        <div>
          <g-button
            text="Generar clase y servicio"
            icon="fa-solid fa-rotate"
            @click="generateCode()"
          />
        </div>
        <div class="errors">
          <div v-show="errorText">
            <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
            {{ errorText }}
          </div>
        </div>
      </g-section-4>
    </div>
  </div>
</template>
<style scoped>
.errors {
  color: var(--color-d);
  font-size: 13px !important;
}
.container-content {
  justify-content: center;
}
</style>
