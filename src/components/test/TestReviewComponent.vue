<script setup>
import { ref, reactive, onMounted, inject, computed } from "vue";
import TestElementComponent from "@/components/test/TestElementComponent.vue";
import TestListComponent from "@/components/test/TestListComponent.vue";
import TestStatusElementComponent from "@/components/test/TestStatusElementComponent.vue";

import { RolModel, TableModel } from "@/models";
import { rolService, tableService } from "@/services";
import { isEmpty, sleep } from "@/helpers";

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
  getList: 0,
  get: 0,
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
const inputName = ref(null);

const inputClass = ref(null);
const inputService = ref(null);

const defaultClass = ref("");
const defaultService = ref("");

const okClass = ref(false);
const okService = ref(false);

const errorClass = ref(null);
const errorService = ref(null);

const inputNameCorrect = computed(() => {
  if (okClass.value && okService.value) {
    return inputName.value;
  }
  return null;
});

async function generateClass() {
  await import(`@/models/index.js`)
    .then(async (module) => {
      let _className = isEmpty(inputClass.value)
        ? defaultClass.value
        : inputClass.value;
      let importedClass = module[_className];
      let instance = new importedClass();

      modelTest.value = importedClass;
      await sleep(0);
      elementRef.value.initModel();
      console.log(instance);
      okClass.value = true;
      errorClass.value = null;
    })
    .catch((err) => {
      console.error(`Error al importar la clase`);
      errorClass.value = "No se encontro la clase";

      okClass.value = false;
    });
  import(`@/services/index.js`)
    .then((module) => {
      let _serviceName = isEmpty(inputService.value)
        ? defaultService.value
        : inputService.value;

      let importedService = module[_serviceName];

      console.log(importedService);
      console.log("add" + capitalize(inputName.value));
      consults.add = importedService["add" + capitalize(inputName.value)];
      consults.getList =
        importedService["getList" + capitalize(inputName.value)];
      consults.get = importedService["get" + capitalize(inputName.value)];
      consults.edit = importedService["update" + capitalize(inputName.value)];
      consults.delete = importedService["delete" + capitalize(inputName.value)];
      okService.value = true;
      errorService.value = null;
    })
    .catch((err) => {
      console.error(`Error al importar el servicio`);
      okService.value = false;
      errorService.value = "No se encontro el servicio";
    });
}
function onInputKeyWord() {
  if (isEmpty(inputName.value)) return;

  defaultClass.value = capitalize(inputName.value) + "Model";
  defaultService.value = inputName.value + "Service";
}
function capitalize(_text) {
  return _text.charAt(0).toUpperCase() + _text.slice(1);
}
const generateCode = ref(null);
function generateCodeFunc(_data) {
  console.log(_data);
  generateCode.value = _data;
}
async function copyClipboard() {
  let texto = generateCode.value;

  try {
    await navigator.clipboard.writeText(texto);
    console.log("Contenido copiado al portapapeles");
  } catch (err) {
    console.error("Error al copiar: ", err);
  }
}
</script>
<template>
  <div class="row g-4 container-content">
    <div class="col-5">
      <g-section-4 title="Ingreso de datos" contentClass="row gutter-form">
        <g-input
          class="col-12"
          label="Palabra clave"
          v-model="inputName"
          :uppercase="false"
          @input="onInputKeyWord()"
        />
        <g-input
          class="col-6"
          label="Clase"
          v-model="inputClass"
          :placeholder="defaultClass"
          :uppercase="false"
        />
        <g-input
          class="col-6"
          label="Servicio"
          v-model="inputService"
          :placeholder="defaultService"
          :uppercase="false"
        />

        <div>
          <g-button
            text="Revisar clase y servicio"
            icon="fa-solid fa-rotate"
            @click="generateClass()"
          />
        </div>
        <div class="errors">
          <div v-show="errorClass">
            <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
            {{ errorClass }}
          </div>
          <div v-show="errorService">
            <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
            {{ errorService }}
          </div>
        </div>
      </g-section-4>
    </div>
    <div v-show="inputNameCorrect" class="col-7">
      <g-section-4
        title="Estado de Consultas"
        :subTitle="inputNameCorrect"
        class="h-100"
      >
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
        <div class="mt-4">
          <g-button
            text="Probar"
            icon="fa-solid fa-gears"
            @click="startTry()"
          />
        </div>
      </g-section-4>
    </div>
    <div v-show="inputNameCorrect" class="col-5">
      <TestElementComponent
        ref="elementRef"
        :modelTest="modelTest"
        :subTitle="inputNameCorrect"
        @generateCode="generateCodeFunc"
      />
    </div>
    <div v-show="inputNameCorrect" class="col-7">
      <TestListComponent
        ref="listRef"
        :getListConsult="consults.getList"
        :subTitle="inputNameCorrect"
      />
    </div>
    <div v-show="inputNameCorrect && generateCode" class="col-12">
      <g-section-4
        title="Codigo generado"
        :subTitle="inputNameCorrect"
        class="h-100"
      >
        <template #buttons>
          <g-button icon="fa-solid fa-clone" @click="copyClipboard()" />
        </template>
        <pre class="pre-code"><code id="copyText">{{generateCode}}</code></pre>
      </g-section-4>
    </div>
  </div>
</template>
<style scoped>
.errors {
  color: var(--color-d);
  font-size: 13px !important;
}
.status-elements {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 0.5rem;
}
.container-content {
}
</style>
