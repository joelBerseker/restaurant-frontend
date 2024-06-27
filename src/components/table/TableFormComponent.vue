<script setup>
import { TableModel } from "@/models";
import { tableService } from "@/services";
import { ref } from "vue";

const props = defineProps({
  disabled: { default: false },
});

const formRef = ref(null);

/*CONSULTS*/
async function getElement(_id) {
  let resp = await tableService.getTable(_id);
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function addElement() {
  let resp = await tableService.addTable(formRef.value.getElement());
  return resp;
}
async function editElement() {
  let resp = await tableService.updateTable(formRef.value.getElement());
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function deleteElement() {
  let resp = await tableService.deleteTable(
    formRef.value.getElement().id.value
  );
  return resp;
}
async function editStatusElement() {
  let resp = await tableService.changeStatusTable(formRef.value.getElement());
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
    :elementModel="TableModel"
    v-slot="{ element, validateLabel }"
    class="row gutter-form"
  >
    <g-input-val
      v-model="element.name"
      :label="element.name.name"
      @validate="validateLabel"
      :disabled="disabled"
    />
    <g-input-val
      v-model="element.number"
      :label="element.number.name"
      @validate="validateLabel"
      :disabled="disabled"
    />
    <g-input-val
      v-model="element.description"
      :label="element.description.name"
      @validate="validateLabel"
      :disabled="disabled"
    />
  </g-form>
</template>
