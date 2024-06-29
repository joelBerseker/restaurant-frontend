<script setup>
import { days } from "@/helpers";
import { MenuModel } from "@/models";
import { menuService, productService, rolService } from "@/services";
import { ref, onMounted, inject } from "vue";
const emit = defineEmits(["onFirstLoad"]);

const props = defineProps({
  disabled: { default: false },
  mode: { default: null },
});
const idElement = inject("idElement", null);
const formRef = ref(null);

/*CONSULTS*/
async function getElement(_id) {
  let resp = await menuService.getMenu(_id);
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function addElement() {
  let resp = await menuService.addMenu(formRef.value.getElement());
  return resp;
}
async function editElement() {
  let resp = await menuService.updateMenu(formRef.value.getElement());
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function deleteElement() {
  let resp = await menuService.deleteMenu(formRef.value.getElement().id.value);
  return resp;
}
async function editStatusElement() {
  let resp = await menuService.changeStatusMenu(formRef.value.getElement());
  if (resp) return formRef.value.getElement().status.value;
  return;
}
function restoreElement() {
  formRef.value.restore();
}
function resetElement() {
  formRef.value.reset();
}
function validateElement() {
  return formRef.value.validate();
}
onMounted(async () => {
  if (idElement) await getElement(idElement);
  emit("onFirstLoad");
});
defineExpose({
  getElement,
  addElement,
  editElement,
  deleteElement,
  restoreElement,
  resetElement,
  editStatusElement,
  validateElement,
});
</script>
<template>
  <g-form
    ref="formRef"
    :elementModel="MenuModel"
    v-slot="{ element, validateLabel }"
  >
    <div class="row gutter-sec container-content">
      <div class="col-12 col-sm-10 col-md-6 col-lg-5 col-xl-4">
        <g-section-4
          title="Información del Menu"
          contentClass="row gutter-form"
          :topLine="false"
        >
          <g-input-val
            :label="element.name.name"
            v-model="element.name"
            :disabled="disabled"
            @validate="validateLabel"
          />

          <g-select-val
            :label="element.day.name"
            v-model="element.day"
            :options="days.options"
            :disabled="disabled"
            @validate="validateLabel"
          />
          <g-input-val
            :label="element.price.name"
            v-model="element.price"
            :disabled="disabled"
            @validate="validateLabel"
          />
          <g-input-check
            :label="element.is_publish.name"
            v-model="element.is_publish.value"
            :switchMode="true"
            labelClass="imp-label"
            :disabled="disabled"
            @validate="validateLabel"
          />
        </g-section-4>
      </div>
      <div class="col-12 col-sm-10 col-md-6 col-lg-5 col-xl-4">
        <g-section-4
          title="Entradas"
          contentClass="row gutter-form"
          :mbTitle="true"
        >
          <g-select-multiple-consult-val
            v-model="element.starters"
            :consult="productService.getListProduct"
            :filter="{
              order: 'asc',
              orderBy: 'name',
              searchBy: ['name'],
            }"
            :disabled="disabled"
            @validate="validateLabel"
          />
        </g-section-4>
        <g-section-4 title="Platos Principales" contentClass="row gutter-form">
          <g-select-multiple-consult-val
            v-model="element.main_courses"
            :consult="productService.getListProduct"
            :filter="{
              order: 'asc',
              orderBy: 'name',
              searchBy: ['name'],
            }"
            :disabled="disabled"
            @validate="validateLabel"
          />
        </g-section-4>
      </div>
    </div>
  </g-form>
</template>
<style scoped>
.container-content {
  justify-content: center;
}
</style>
