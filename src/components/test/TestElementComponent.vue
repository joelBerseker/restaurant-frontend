<script setup>
import { ref, reactive, onMounted, inject } from "vue";
const emit = defineEmits([
  "generateCode",
  "deleteEl",
  "editEl",
  "addEl",
  "getEl",
]);
import LoadingContainer from "@/common/container/LoadingContainer.vue";

const props = defineProps({
  modelTest: { default: null },
});
const listKey = ref([]);
function init() {
  listKey.value = [];
  if (props.modelTest) {
    let _model = new props.modelTest();
    console.log(_model);
    for (var key in _model) {
      if (key !== "status" && key !== "id") {
        listKey.value.push(key);
      }
    }
  }
}
const isLoading = ref(false);
const formRef = ref(null);
function validate() {
  return formRef.value.validate();
}
function getElement() {
  return formRef.value.getElement();
}
function copy(_data) {
  return formRef.value.copy(_data);
}
function initModel() {
  init();
  return formRef.value.init();
}
function reset() {
  formRef.value.reset();
}
function generateCode() {
  let resp = "";
  let _model = new props.modelTest();

  listKey.value.forEach((key) => {
    resp +=
      "<g-input-file-val\n" +
      '\t:label="element.' +
      key +
      '.name"\n' +
      '\tv-model="element.' +
      key +
      '"\n' +
      '\t:disabled="false"\n' +
      '\t@validate="validateLabel"\n' +
      "/>\n";
  });
  emit("generateCode", resp);
}
function editEl() {
  emit("editEl", true);
}
function addEl() {
  emit("addEl", true);
}
function deleteEl() {
  emit("deleteEl");
}
function getEl() {
  emit("getEl", idElement.value);
}
function setIsLoading(_value) {
  isLoading.value = _value;
}
const idElement = ref(null);
function getIdInput() {
  return idElement.value;
}
function copyTest() {
  formRef.value.copyDefulttTest();
}
defineExpose({
  validate,
  getElement,
  copy,
  initModel,
  reset,
  setIsLoading,
  getIdInput,
});
init();
</script>
<template>
  <LoadingContainer :loading="isLoading" loadingClass="loading-transparent">
    <g-section-4 title="Modelo">
      <template #buttons>
        <g-button
          icon="fa-solid fa-gears"
          @click="generateCode()"
          type="secondary"
        />
        <g-button icon="fa-solid fa-broom" @click="reset()" type="secondary" />
        <g-button
          icon="fa-solid fa-clone"
          @click="copyTest()"
          type="secondary"
        />
      </template>
      <g-form
        ref="formRef"
        :elementModel="modelTest"
        v-slot="{ element, validateLabel }"
        class="row gutter-form"
      >
        <div>
          <label>ID</label>
          <div class="id-container">
            <g-input
              v-model="idElement"
              class="input-button-left w-100"
              :placeholder="element.id.value"
              :disabled="false"
            />
            <g-button
              class="button-input-right button-id"
              type="search"
              icon="fa-solid fa-arrow-down"
              title="Obtener"
              @click="getEl"
            />
          </div>
        </div>
        <div v-for="(key, index) in listKey" :key="index">
          <div v-if="!element[key].name"></div>
          <div
            v-else-if="
              element[key].type === 'file' || element[key].type === 'image'
            "
          >
            <g-input-file-val
              :label="element[key].name"
              v-model="element[key]"
              :disabled="false"
              @validate="validateLabel"
            />
          </div>
          <div
            v-else-if="
              element[key].value === true || element[key].value === false
            "
          >
            <g-input-check
              v-model="element[key].value"
              :label="element[key].name"
              :disabled="false"
              labelClass="imp-label"
              checkPosition="bottom"
              :switchMode="true"
            />
          </div>
          <div v-else>
            <g-input-val
              v-model="element[key]"
              :label="element[key].name"
              @validate="validateLabel"
              :disabled="false"
              :uppercase="false"
            />
          </div>
        </div>
        <div>
          <div v-if="element.id.value">
            <g-button
              text="Editar"
              icon="fa-solid fa-pen-to-square"
              @click="editEl()"
            />
            <g-button
              text="Eliminar"
              icon="fa-solid fa-trash"
              @click="deleteEl()"
              type="secondary"
            />
          </div>

          <g-button
            v-else
            text="Agregar"
            icon="fa-solid fa-plus"
            @click="addEl()"
          />
        </div>
      </g-form>
    </g-section-4>
  </LoadingContainer>
</template>
<style scoped>
.id-container {
  display: flex;
  width: 100%;
}
.button-id {
  background-color: var(--color-c1);
}
</style>
