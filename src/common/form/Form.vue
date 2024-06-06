<script setup>
import { onUpdated, ref } from "vue";
import { useToastStore } from "@/stores";
const useToast = useToastStore();

const emit = defineEmits(["onUpdated"]);
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
  if (!resp.value) {
    useToast.show("validation_error", {
      list_error: resp.list,
    });
  }

  return resp.value;
}
function getElement() {
  return element.value;
}
function copy(_data) {
  element.value.copy(_data);
  elementBackup.value.copy(element.value);
  emit("onUpdated", element.value);
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
