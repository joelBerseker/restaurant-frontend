<script setup>
import { ref, reactive, onMounted, inject } from "vue";

const props = defineProps({
  modelTest: { default: null },
});
const listKey = ref([]);
function init() {
  listKey.value = [];
  if (props.modelTest) {
    let _model = new props.modelTest();

    for (var key in _model) {
      if (key !== "status" && key !== "id") {
        listKey.value.push(key);
      }
    }
  }
}
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
defineExpose({
  validate,
  getElement,
  copy,
});
init();
</script>
<template>
  <g-section-4 title="Elemento">
    <g-form
      ref="formRef"
      :elementModel="modelTest"
      v-slot="{ element, validateLabel }"
      class="row gutter-form"
    >
      <div v-for="(key, index) in listKey" :key="index">
        <g-input-val
          v-model="element[key]"
          :label="element[key].name"
          @validate="validateLabel"
          :disabled="false"
        />
      </div>
    </g-form>
  </g-section-4>
</template>
