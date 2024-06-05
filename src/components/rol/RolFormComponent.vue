<script setup>
import { RolModel } from "@/models";
import { rolService } from "@/services";
import { ref } from "vue";

const props = defineProps({
  disabled: { default: false },
});

const emit = defineEmits([
  "onAdded",
  "onDeleted",
  "onEdited",
  "onEditedStatus",
  "onGot",
]);

const formRef = ref(null);

async function getElement(_id) {
  let resp = await rolService.getRol(_id);
  if (resp !== undefined) {
    formRef.value.copy(resp);
    emit("onGot", resp);
  }
}
async function addElement() {
  if (!formRef.value.validate()) return;
  let resp = await rolService.addRol(formRef.value.getElement());
  if (resp !== undefined) emit("onAdded", resp);
  console.log(resp);
}
async function editElement() {
  if (!formRef.value.validate()) return;
  let resp = await rolService.updateRol(formRef.value.getElement());
  if (resp !== undefined) {
    formRef.value.copy(resp);
    emit("onEdited", resp);
  }
}
async function deleteElement() {
  let resp = await rolService.deleteRol(formRef.value.getElement().id.value);
  if (resp !== undefined) emit("onDeleted", resp);
}
async function editStatusElement() {
  let resp = await rolService.changeStatusRol(formRef.value.getElement());
  if (resp !== undefined) {
    console.log(resp);
    emit("onEditedStatus", formRef.value.getElement().status.value);
  }
}
function restoreElement() {
  formRef.value.restore();
}
function resetElement() {
  formRef.value.reset();
}
defineExpose({
  getElement,
  addElement,
  editElement,
  deleteElement,
  restoreElement,
  resetElement,
  editStatusElement,
});
</script>
<template>
  <g-form
    ref="formRef"
    :elementModel="RolModel"
    v-slot="{ element, validateLabel }"
  >
    <g-input-val
      v-model="element.name"
      :label="element.name.name"
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
