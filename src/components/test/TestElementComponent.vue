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
    console.log(_model);
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
function initModel() {
  init();
  return formRef.value.init();
}
defineExpose({
  validate,
  getElement,
  copy,
  initModel,
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
        <div
          v-if="element[key].type === 'file' || element[key].type === 'image'"
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
            :disabled="disabled"
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
          />
        </div>
      </div>
    </g-form>
  </g-section-4>
</template>
