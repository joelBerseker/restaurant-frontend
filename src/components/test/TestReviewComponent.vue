<script setup>
import { ref, reactive, onMounted, inject, computed } from "vue";
import TestElementComponent from "@/components/test/TestElementComponent.vue";
import TestListComponent from "@/components/test/TestListComponent.vue";
import TestStatusElementComponent from "@/components/test/TestStatusElementComponent.vue";

import { RolModel, TableModel } from "@/models";
import { rolService, tableService } from "@/services";
import { isEmpty, sleep } from "@/helpers";
import { useSystemStore } from "@/stores/systemStore";

const useSystem = useSystemStore();

/*INICIO CAMBIAR SEGUN LO REQUERIDO*/
const modelTest = ref(TableModel);
const commonNameService = ref("Table");
const consults = reactive({
  add: tableService["add" + commonNameService.value],
  getList: tableService["getList" + commonNameService.value],
  get: tableService["get" + commonNameService.value],
  edit: tableService["update" + commonNameService.value],
  delete: tableService["delete" + commonNameService.value],

  verifyExistence() {
    for (var key in this) {
      if (key === "verifyExistence") continue;
      if (this[key]) {
        issues[key].push({
          text: "Existencia",
          type: 1,
        });
      } else {
        issues[key].push({
          text: "Existencia",
          type: 2,
        });
      }
    }
  },
});
/*FIN CAMBIAR SEGUN LO REQUERIDO*/

const status = reactive({
  add: 0,
  getList: 0,
  get: 0,
  edit: 0,
  delete: 0,
  clear() {
    this.add = 0;
    this.getList = 0;
    this.get = 0;
    this.edit = 0;
    this.delete = 0;
  },
});
const loading = reactive({
  add: false,
  getList: false,
  get: false,
  edit: false,
  delete: false,
});
const issues = reactive({
  add: [
    { text: "success", type: 2 },
    { text: "success", type: 1 },
  ],
  getList: [],
  get: [],
  edit: [],
  delete: [],
  clear() {
    this.add = [];
    this.getList = [];
    this.get = [];
    this.edit = [];
    this.delete = [];
  },
});

const elementRef = ref(null);
const listRef = ref(null);

async function startTry() {
  status.add = 0;
  status.getList = 0;
  status.get = 0;
  status.edit = 0;
  status.delete = 0;
  await addTry();
  await getListTry();
  await getElementTry();
  await editTry();
  await deleteTry();
}
async function addTry(_get = false) {
  issues.add = [];

  if (!consults.add) {
    issues.add.push({
      text: "Existencia",
      type: 2,
    });
    status.add = 2;
    return false;
  } else {
    issues.add.push({
      text: "Existencia",
      type: 1,
    });
  }
  if (!elementRef.value.validate()) {
    issues.add.push({
      text: "Validación",
      type: 2,
    });
    status.add = 2;
    return false;
  } else {
    issues.add.push({
      text: "Validación",
      type: 1,
    });
  }
  loading.add = true;
  elementRef.value.setIsLoading(true);

  await sleep(200);
  const resp = await consults.add(elementRef.value.getElement());
  if (resp) {
    issues.add.push({
      text: "Ejecución",
      type: 1,
    });

    lastAdded.value = resp.id.value;
    status.add = 1;
    loading.add = false;
    elementRef.value.setIsLoading(false);

    if (_get) {
      getListTry();
    }
    return true;
  } else {
    issues.add.push({
      text: "Ejecución",
      type: 2,
    });
    status.add = 2;
    loading.add = false;
    elementRef.value.setIsLoading(false);

    return false;
  }
}
async function getListTry() {
  issues.getList = [];

  if (!consults.getList) {
    issues.getList.push({
      text: "Existencia",
      type: 2,
    });
    status.getList = 2;
    return false;
  } else {
    issues.getList.push({
      text: "Existencia",
      type: 1,
    });
  }
  loading.getList = true;
  listRef.value.setIsLoading(true);
  await sleep(200);

  const resp = await listRef.value.getList();
  if (resp) {
    issues.getList.push({
      text: "Ejecución",
      type: 1,
    });
    status.getList = 1;
    loading.getList = false;
    listRef.value.setIsLoading(false);

    return true;
  } else {
    issues.getList.push({
      text: "Ejecución",
      type: 2,
    });
    status.getList = 2;
    loading.getList = false;
    listRef.value.setIsLoading(false);

    return false;
  }
}

const lastAdded = ref(null);
async function getElementTry(_id = null) {
  let idElement = null;
  issues.get = [];

  if (!consults.get) {
    issues.get.push({
      text: "Existencia",
      type: 2,
    });
    status.get = 2;
    return false;
  } else {
    issues.get.push({
      text: "Existencia",
      type: 1,
    });
  }
  if (_id) {
    idElement = _id;
  } else if (elementRef.value.getIdInput()) {
    idElement = elementRef.value.getIdInput();
  } else {
    idElement = lastAdded.value;
  }
  if (!idElement) {
    issues.get.push({
      text: "Existe ID",
      type: 2,
    });
    status.get = 2;
    return false;
  } else {
    issues.get.push({
      text: "Existe ID",
      type: 1,
    });
  }

  loading.get = true;
  elementRef.value.setIsLoading(true);

  await sleep(200);

  const resp = await consults.get(idElement);
  if (resp) {
    elementRef.value.copy(resp);
    status.get = 1;
    loading.get = false;
    elementRef.value.setIsLoading(false);

    issues.get.push({
      text: "Ejecución",
      type: 1,
    });
    return true;
  } else {
    issues.get.push({
      text: "Ejecución",
      type: 2,
    });
    status.get = 2;
    loading.get = false;
    elementRef.value.setIsLoading(false);

    return false;
  }
}
async function editTry(_get = false) {
  issues.edit = [];

  if (!consults.edit) {
    issues.edit.push({
      text: "Existencia",
      type: 2,
    });
    status.edit = 2;
    return false;
  } else {
    issues.edit.push({
      text: "Existencia",
      type: 1,
    });
  }
  if (!elementRef.value.validate()) {
    status.edit = 2;
    issues.edit.push({
      text: "Validación",
      type: 2,
    });
    return false;
  } else {
    issues.edit.push({
      text: "Validación",
      type: 1,
    });
  }

  loading.edit = true;
  elementRef.value.setIsLoading(true);

  await sleep(200);

  const resp = await consults.edit(elementRef.value.getElement());
  if (resp) {
    elementRef.value.copy(resp);

    issues.edit.push({
      text: "Ejecución",
      type: 1,
    });
    if (_get) {
      getListTry();
    }
    status.edit = 1;
    loading.edit = false;
    elementRef.value.setIsLoading(false);

    return true;
  } else {
    issues.edit.push({
      text: "Ejecución",
      type: 2,
    });
    status.edit = 2;
    loading.edit = false;
    elementRef.value.setIsLoading(false);

    return false;
  }
}
async function deleteTry(_get = true) {
  issues.delete = [];

  if (!consults.delete) {
    issues.delete.push({
      text: "Existencia",
      type: 2,
    });
    status.delete = 2;
    return false;
  } else {
    issues.delete.push({
      text: "Existencia",
      type: 1,
    });
  }
  loading.delete = true;
  elementRef.value.setIsLoading(true);

  await sleep(200);

  const resp = await consults.delete(elementRef.value.getElement().id.value);
  if (resp) {
    if (_get) {
      getListTry();
    }
    elementRef.value.reset();
    status.delete = 1;
    loading.delete = false;
    elementRef.value.setIsLoading(false);

    issues.delete.push({
      text: "Ejecución",
      type: 1,
    });
    return true;
  } else {
    status.delete = 2;
    loading.delete = false;
    elementRef.value.setIsLoading(false);

    issues.delete.push({
      text: "Ejecución",
      type: 2,
    });
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

const inputNameCorrect = ref(null);
async function generateClass() {
  status.clear();
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
  await import(`@/services/index.js`)
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
      issues.clear();
      consults.verifyExistence();
    })
    .catch((err) => {
      console.error(`Error al importar el servicio`);
      okService.value = false;
      errorService.value = "No se encontro el servicio";
    });
  if (okService.value && okClass.value) {
    useSystem.setTestCache(inputName.value);
    inputNameCorrect.value = inputName.value;
  }
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
function clearInput() {
  inputName.value = "";
  useSystem.setTestCache("");
}
function init() {
  if (useSystem.testCache) {
    console.log("existe en cache");
    inputName.value = useSystem.testCache;
    onInputKeyWord();
    generateClass();
  }
}
init();
</script>
<template>
  <div class="row g-4 container-content">
    <div class="col-5">
      <g-section-4 title="Ingreso de datos" contentClass="row gutter-form">
        <template #buttons
          ><g-button
            v-if="useSystem.testCache"
            icon="fa-solid fa-broom"
            @click="clearInput()"
            type="secondary"
            title="Limpiar cache"
        /></template>
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
        title="Estado de Servicio"
        :subTitle="inputNameCorrect"
        class="h-100"
      >
        <div class="status-elements">
          <TestStatusElementComponent
            :status="status.add"
            :loading="loading.add"
            :issues="issues.add"
            text="Agregar"
            icon="fa-solid fa-plus"
          />
          <TestStatusElementComponent
            :status="status.getList"
            :loading="loading.getList"
            :issues="issues.getList"
            text="Obtener Lista"
            icon="fa-solid fa-bars-staggered"
          />
          <TestStatusElementComponent
            :status="status.get"
            :loading="loading.get"
            :issues="issues.get"
            text="Obtener Elemento"
            icon="fa-solid fa-arrow-down"
          />
          <TestStatusElementComponent
            :status="status.edit"
            :loading="loading.edit"
            :issues="issues.edit"
            text="Editar"
            icon="fa-solid fa-pen-to-square"
          />
          <TestStatusElementComponent
            :status="status.delete"
            :loading="loading.delete"
            :issues="issues.delete"
            text="Eliminar"
            icon="fa-solid fa-trash"
            :arrow="false"
          />
        </div>
        <div class="mt-4">
          <g-button
            text="Probar Todos"
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
        @addEl="addTry"
        @editEl="editTry"
        @deleteEl="deleteTry"
        @getEl="getElementTry"
      />
    </div>
    <div v-show="inputNameCorrect" class="col-7">
      <TestListComponent
        ref="listRef"
        :getListConsult="consults.getList"
        :subTitle="inputNameCorrect"
        @getEl="getElementTry"
        @getLi="getListTry"
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
</style>
