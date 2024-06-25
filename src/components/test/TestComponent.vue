<script setup>
import { ref, reactive, onMounted, inject } from "vue";
import TestElementComponent from "@/components/test/TestElementComponent.vue";
import TestListComponent from "@/components/test/TestListComponent.vue";
import TestStatusElementComponent from "@/components/test/TestStatusElementComponent.vue";

import { RolModel, TableModel } from "@/models";
import { rolService, tableService } from "@/services";
import { sleep } from "@/helpers";

/*INICIO CAMBIAR SEGUN LO REQUERIDO*/
const modelTest = ref(TableModel);
const commonNameService = ref("Table");
const consults = reactive({
  add: tableService["add" + commonNameService.value],
  getList: tableService["getList" + commonNameService.value],
  get: tableService["get" + commonNameService.value],
  edit: tableService["update" + commonNameService.value],
  delete: tableService["delete" + commonNameService.value],
});
/*FIN CAMBIAR SEGUN LO REQUERIDO*/

const status = reactive({
  add: 0,
  getList: 1,
  get: 2,
  edit: 0,
  delete: 0,
});
const loading = reactive({
  add: false,
  getList: false,
  get: false,
  edit: false,
  delete: false,
});

const elementRef = ref(null);
const listRef = ref(null);

async function startTry() {
  status.add = 0;
  status.getList = 0;
  status.get = 0;
  status.edit = 0;
  status.delete = 0;
  if (!(await addTry())) return;
  if (!(await getListTry())) return;
  if (!(await getElementTry())) return;
  if (!(await editTry())) return;
  if (!(await deleteTry())) return;
}
async function addTry() {
  if (!elementRef.value.validate()) {
    status.add = 2;

    return false;
  }
  if (!consults.add) {
    console.error("No se encontro la funcion add");
    status.add = 2;
    return false;
  }
  loading.add = true;
  await sleep(200);
  const resp = await consults.add(elementRef.value.getElement());
  if (resp) {
    status.add = 1;
    loading.add = false;
    return true;
  } else {
    status.add = 2;
    loading.add = false;
    return false;
  }
}
async function getListTry() {
  loading.getList = true;
  await sleep(200);

  const resp = await listRef.value.getList();
  if (resp) {
    status.getList = 1;
    loading.getList = false;
    return true;
  } else {
    status.getList = 2;
    loading.getList = false;
    return false;
  }
}
async function getElementTry() {
  const firstId = listRef.value.getFirstId();
  if (!firstId) {
    status.get = 2;
    return false;
  }
  if (!consults.get) {
    console.error("No se encontro la funcion get");
    status.get = 2;
    return false;
  }

  loading.get = true;
  await sleep(200);

  const resp = await consults.get(firstId);
  if (resp) {
    elementRef.value.copy(resp);
    status.get = 1;
    loading.get = false;
    return true;
  } else {
    status.get = 2;
    loading.get = false;
    return false;
  }
}
async function editTry() {
  if (!elementRef.value.validate()) {
    status.edit = 2;

    return false;
  }
  if (!consults.edit) {
    console.error("No se encontro la funcion edit");
    status.edit = 2;
    return false;
  }
  loading.edit = true;
  await sleep(200);

  const resp = await consults.edit(elementRef.value.getElement());
  if (resp) {
    status.edit = 1;
    loading.edit = false;
    return true;
  } else {
    status.edit = 2;
    loading.edit = false;
    return false;
  }
}
async function deleteTry() {
  if (!consults.delete) {
    console.error("No se encontro la funcion delete");
    status.delete = 2;
    return false;
  }
  loading.delete = true;
  await sleep(200);

  const resp = await consults.delete(elementRef.value.getElement().id.value);
  if (resp) {
    listRef.value.getList();
    status.delete = 1;
    loading.delete = false;
    return true;
  } else {
    status.delete = 2;
    loading.delete = false;
    return false;
  }
}
</script>
<template>
  <g-section-1 :refresh="true" @onRefresh="refresh()" subTitle="BETA v1.00">
    <template #buttons>
      <g-button
        text="Probar"
        icon="fa-solid fa-gears"
        @click="startTry()"
      ></g-button>
    </template>
    <template #content>
      <div class="row g-4">
        <div class="col-12">
          <g-section-4 title="Estado de Consultas">
            <div class="status-elements">
              <TestStatusElementComponent
                :status="status.add"
                :loading="loading.add"
                text="Agregar"
                icon="fa-solid fa-plus"
              />
              <TestStatusElementComponent
                :status="status.getList"
                :loading="loading.getList"
                text="Obtener Lista"
                icon="fa-solid fa-bars-staggered"
              />
              <TestStatusElementComponent
                :status="status.get"
                :loading="loading.get"
                text="Obtener Elemento"
                icon="fa-regular fa-square"
              />
              <TestStatusElementComponent
                :status="status.edit"
                :loading="loading.edit"
                text="Editar"
                icon="fa-solid fa-pen-to-square"
              />
              <TestStatusElementComponent
                :status="status.delete"
                :loading="loading.delete"
                text="Eliminar"
                icon="fa-solid fa-trash"
                :arrow="false"
              />
            </div>
          </g-section-4>
        </div>
        <div class="col-5">
          <TestElementComponent ref="elementRef" :modelTest="modelTest" />
        </div>
        <div class="col-7">
          <TestListComponent ref="listRef" :getListConsult="consults.getList" />
        </div>
      </div>
    </template>
  </g-section-1>
</template>
<style scoped>
.status-elements {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 0.5rem;
}
</style>
