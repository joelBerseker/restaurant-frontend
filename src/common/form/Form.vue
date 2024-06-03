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
  }
}
init();

function validateLabel(_data) {
  element.value.validateLabel(_data);
}
function validate() {
  element.value.validate();
}
</script>
<template>
  <form @submit.prevent>
    <slot :element="element" :validateLabel="validateLabel"></slot>
  </form>
</template>
<style scoped></style>
