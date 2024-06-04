<script setup>
import { ref } from "vue";

const props = defineProps({
  elementModel: { default: null },
});

const element = ref({});
const elementBackup = ref({});

function init() {
  if (props.elementModel !== null) {
    element.value = new props.elementModel();
    elementBackup.value = new props.elementModel();
  }
}
init();

function validateLabel(_data) {
  element.value.validateLabel(_data);
}
function validate() {
  let resp = element.value.validate();
  console.log(resp);
  return resp;
}
function getElement() {
  return element.value;
}
function copy(_data) {
  element.value.copy(_data);
  elementBackup.value.copy(element.value);
}
function restore() {
  element.value.copy(elementBackup.value);
}
function reset() {
  element.value = new props.elementModel();
  elementBackup.value = new props.elementModel();
}
defineExpose({
  reset,
  validate,
  getElement,
  copy,
  restore,
});
</script>
<template>
  <form @submit.prevent class="row g-3">
    <slot :element="element" :validateLabel="validateLabel"></slot>
  </form>
</template>
<style scoped></style>
