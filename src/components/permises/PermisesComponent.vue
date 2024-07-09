<script setup>
import { ref, defineEmits, computed } from "vue";
import Table from "@/common/table/Table.vue";
import { rolService, permisesService, Permissions_table } from "@/services";
import { module } from "@/helpers";
import FormButtons from "@/common/form/FormButtons.vue";

// Emitir evento al cargar por primera vez
const emit = defineEmits(["onFirstLoad"]);

// Definición de referencias reactivas
const id_role = ref({ value: null, name: "" });
const isLoading = ref(false);
const subTitle = ref("Permisos de los modulos del sistema segun roles");
const columns = ref(Permissions_table);
const data = ref([]);
const data_ = ref([]);

function onFirstLoad() {
  emit("onFirstLoad");
}

const mode = ref("view");
const disabled = ref(true);
const elementText = ref(null);

function addMode() {
  mode.value = "add";
  disabled.value = false;
}
async function viewMode(_id = null) {
  mode.value = "view";
  disabled.value = true;
}
function editMode() {
  mode.value = "edit";
  disabled.value = false;
}

async function init() {
  onFirstLoad();
}

async function getRol(role) {
  if (!role) {
    data.value = [];
    data_.value = [];

    return;
  }
  await getData(role);
  console.log(role);
}

// permisos segun el rol
async function getData(role) {
  isLoading.value = true;
  const response = await permisesService.getListPermises({ role_id: role });
  data.value = response;
  data_.value = JSON.parse(JSON.stringify(response)); // Clonar el objeto para evitar referencias
  console.log(data.value);
  isLoading.value = false;
}
async function asyncData(response) {
  data.value = response;
  data_.value = JSON.parse(JSON.stringify(response)); // Clonar el objeto para evitar referencias
  console.log(data.value);
}

async function onSave(params) {
  data_.value = JSON.parse(JSON.stringify(data.value)); // Clonar el objeto para evitar referencias
  const response_save = await permisesService.editPermission(
    JSON.stringify(data.value)
  );
  asyncData(response_save);
}

function onCancel(params) {
  viewMode();

  data.value = JSON.parse(JSON.stringify(data_.value)); // Clonar el objeto para evitar referencias
  console.log("Cambios cancelados, datos originales restaurados:", data.value);
}
function onEdit() {
  editMode();
}

//checks all
const checkAllCount = ref(0);
const checkAllValue = computed(() => {
  if (
    checkAllCount.value <
    data.value.length *
      (columns.value.length - 1) /*- 1 por la columna de modulo */
  ) {
    return false;
  }
  return true;
});

function checkAll(_value) {
  for (let i = 0; i < data.value.length; i++) {
    const _row = data.value[i];
    _row.countChecks = _value ? columns.value.length - 1 : 0;
    _row.all = _value;

    for (let j = 0; j < columns.value.length; j++) {
      if (j === 0) continue;
      const _col = columns.value[j];
      if (i === 0) {
        _col.countChecks = _value ? data.value.length : 0;
        _col.all = _value;
      }
      _row[_col.key] = _value;
    }
  }
  if (_value) {
    checkAllCount.value = data.value.length * (columns.value.length - 1);
  } else {
    checkAllCount.value = 0;
  }
  console.log(checkAllCount.value);
}

// Inicializar el componente al montar
init();
</script>
<template>
  <g-section-1 :subTitle="subTitle">
    <template #buttons>
      <FormButtons
        v-if="id_role.value"
        :mode="mode"
        @onEdit="onEdit"
        @onCancel="onCancel"
        @onSave="onSave"
        :showDelete="false"
        :showStatus="false"
      />
    </template>
    <template #content>
      <div class="select-container">
        <div class="select-container-flex">
          <div class="w-50">
            <div><label>Rol</label></div>
            <g-select-consult-val
              v-model="id_role"
              :consult="rolService.getListRol"
              :filter="{ order: 'asc', orderBy: 'name', searchBy: ['name'] }"
              @change="getRol"
              helpText="Seleccione un rol para ver sus permisos"
              :showHelpText="!id_role.value"
            />
          </div>
          <div v-show="mode === 'edit'">
            <div><label>&nbsp;</label></div>
            <g-button
              v-show="!checkAllValue"
              text="Seleccionar Todos"
              type="search"
              @click="checkAll(true)"
            />
            <g-button
              v-show="checkAllValue"
              text="Deseleccionar Todos"
              type="search"
              @click="checkAll(false)"
            />
          </div>
        </div>
      </div>

      <Table
        ref="tableRef"
        :rows="data"
        :columns="columns"
        :isLoading="isLoading"
      >
        <template #headerNext="{ col }">
          <div v-if="col.all !== undefined">
            <g-input-check
              v-show="!disabled"
              v-model="col.all"
              :disabled="disabled"
            />
          </div>
        </template>
        <template v-slot:module_id="{ row, index }">
          <div class="d-flex">
            <div v-show="!disabled" class="me-1">
              <g-input-check v-model="row.all" :disabled="disabled" />
            </div>
            <div>
              {{ module.get(row.module_id) }}
            </div>
          </div>
        </template>
        <template v-slot:create="{ row, index }">
          <g-input-check v-model="row.create" :disabled="disabled" />
        </template>
        <template v-slot:read="{ row, index }">
          <g-input-check v-model="row.read" :disabled="disabled" />
        </template>
        <template v-slot:active="{ row, index }">
          <g-input-check v-model="row.active" :disabled="disabled" />
        </template>
        <template v-slot:update="{ row, index }">
          <g-input-check v-model="row.update" :disabled="disabled" />
        </template>
        <template v-slot:delete="{ row, index }">
          <g-input-check v-model="row.delete" :disabled="disabled" />
        </template>
        <template v-slot:print="{ row, index }">
          <g-input-check v-model="row.print" :disabled="disabled" />
        </template>
        <template v-slot:export="{ row, index }">
          <g-input-check v-model="row.export" :disabled="disabled" />
        </template>
        <template v-slot:notify="{ row, index }">
          <g-input-check v-model="row.notify" :disabled="disabled" />
        </template>
      </Table>
    </template>
  </g-section-1>
</template>
<style scoped>
.select-container-flex {
  display: flex;
  gap: 1rem;
}
.select-container {
  background-color: var(--color-c1);
  padding: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  padding-bottom: 1.6rem;
  border-radius: var(--br);
  position: relative;
  margin-bottom: 1.5rem;
}
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
