<script setup>
import { ref, defineEmits } from "vue";
import Table from "@/common/table/Table.vue";
import { rolService, permisesService, Permissions_table } from "@/services";
import { module } from "@/helpers";

// Emitir evento al cargar por primera vez
const emit = defineEmits(["onFirstLoad"]);

// Definición de referencias reactivas
const id_role = ref({ value: null, name: "" });
const isLoading = ref(false);
const subTitle = ref(null);
const columns = ref(Permissions_table);
const data = ref([]);
const data_ = ref([]);

function onFirstLoad() {
  emit("onFirstLoad");
}

async function init() {
  onFirstLoad();
}

async function getRol(role) {
  await getData(role);
  console.log(role);
}

// permisos segun el rol
async function getData(role) {
  const response = await permisesService.getListPermises({ role_id: role });
  data.value = response;
  data_.value = JSON.parse(JSON.stringify(response)); // Clonar el objeto para evitar referencias
  console.log(data.value);
}
async function asyncData(response) {
  data.value = response;
  data_.value = JSON.parse(JSON.stringify(response)); // Clonar el objeto para evitar referencias
  console.log(data.value);
}

async function save(params) {
  data_.value = JSON.parse(JSON.stringify(data.value)); // Clonar el objeto para evitar referencias
  const response_save = await permisesService.editPermission(
    JSON.stringify(data.value)
  );
  asyncData(response_save);
}

function cancel(params) {
  data.value = JSON.parse(JSON.stringify(data_.value)); // Clonar el objeto para evitar referencias
  console.log("Cambios cancelados, datos originales restaurados:", data.value);
}

// Inicializar el componente al montar
init();
</script>
<template>
  <g-section-1 :subTitle="subTitle">
    <template #content>
      <g-select-consult-val
        v-model="id_role"
        :label="id_role.name"
        :consult="rolService.getListRol"
        :filter="{ order: 'asc', orderBy: 'name', searchBy: ['name'] }"
        @change="getRol"
      />
      <div class="d-flex justify-content-end mb-3 mt-3">
        <g-button
          @click="cancel()"
          title="Detalles"
          text="Cancela Papi"
          type="secundary"
          class="cancel-button"
        />
        <g-button
          @click="save()"
          title="Detalles"
          text="Guardar Papi"
          class="save-button"
        />
      </div>
      <Table
        ref="tableRef"
        :rows="data"
        :columns="columns"
        :isLoading="isLoading"
      >
        <template v-slot:module_id="{ row, index }">
          {{ module.get(row.module_id) }}
        </template>
        <template v-slot:create="{ row, index }">
          <g-input-check v-model="row.create" />
        </template>
        <template v-slot:read="{ row, index }">
          <g-input-check v-model="row.read" />
        </template>
        <template v-slot:active="{ row, index }">
          <g-input-check v-model="row.active" />
        </template>
        <template v-slot:update="{ row, index }">
          <g-input-check v-model="row.update" />
        </template>
        <template v-slot:delete="{ row, index }">
          <g-input-check v-model="row.delete" />
        </template>
        <template v-slot:print="{ row, index }">
          <g-input-check v-model="row.print" />
        </template>
        <template v-slot:export="{ row, index }">
          <g-input-check v-model="row.export" />
        </template>
        <template v-slot:notify="{ row, index }">
          <g-input-check v-model="row.notify" />
        </template>
      </Table>
    </template>
  </g-section-1>
</template>
<style scoped>
.save-button {
  background-color: #007bff; /* Azul */
  color: white; /* Color del texto blanco */
  border: none; /* Sin borde */
  padding: 10px 20px; /* Espaciado interno */
  font-size: 16px; /* Tamaño de fuente */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor a un puntero */
  transition: background-color 0.3s ease; /* Transición para el color de fondo */
}

.save-button:hover {
  background-color: #0056b3; /* Azul más oscuro al pasar el mouse */
}

.save-button:active {
  background-color: #0a58ca; /* Azul más oscuro al hacer clic */
}

.save-button:disabled {
  background-color: #c3c8cf; /* Color de fondo gris al estar deshabilitado */
  color: #8492a6; /* Color de texto gris */
  cursor: not-allowed; /* Cursor no permitido */
}

.cancel-button {
  background-color: #6c757d; /* Gris oscuro */
  color: white; /* Color del texto blanco */
  border: none; /* Sin borde */
  padding: 10px 20px; /* Espaciado interno */
  font-size: 16px; /* Tamaño de fuente */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor a un puntero */
  transition: background-color 0.3s ease; /* Transición para el color de fondo */
}

.cancel-button:hover {
  background-color: #5a6268; /* Gris un poco más oscuro al pasar el mouse */
}

.cancel-button:active {
  background-color: #495057; /* Gris más oscuro al hacer clic */
}

.cancel-button:disabled {
  background-color: #e2e8f0; /* Color de fondo gris al estar deshabilitado */
  color: #a0aec0; /* Color de texto gris */
  cursor: not-allowed; /* Cursor no permitido */
}
</style>
