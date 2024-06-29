<script setup>
import { computed, inject, ref, onUpdated, watch } from "vue";

import { isEmpty } from "@/helpers";
import { useToastStore } from "@/stores";
const useToast = useToastStore();

import ElementFormLayout from "@/common/form/ElementFormLayout.vue";
import { valid, noValid } from "@/helpers/validations";

const props = defineProps({
  id: { default: null },

  modelValue: {},
  inputClass: {},
  labelClass: {},
  viewClass: {},
  disabled: {},
  viewMode: { default: true },
  label: { default: null },
  helpText: { default: "" },
  showHelpText: { default: true },
  consult: { default: null },
  verifyEquals: { default: true },
  filter: { default: null },
});
const emit = defineEmits(["update:modelValue", "change", "validate"]);
const selectRef = ref(null);
const selectItem = ref(null);
const selectList = ref([]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
function deleteItem(index) {
  value.value.value.splice(index, 1);
  selectList.value.splice(index, 1);

  emit("validate", value.value);
  emit("change");
}
function addItem(_data) {
  if (!_data) return;

  console.log(_data);

  if (existElement(_data.value)) {
    value.value.element.validation = noValid("El elemento ya existe");
    return;
  }
  value.value.element.validation = {};
  value.value.value.push(_data.value);
  selectList.value.push({
    text: _data.valueComplete.text,
    additional: _data.valueComplete.additional,
  });
  emit("validate", value.value);
}
function existElement(_value) {
  for (let i = 0; i < value.value.value.length; i++) {
    const element = value.value.value[i];
    if (element === _value) {
      return true;
    }
  }

  return false;
}
function getListConsultCache() {
  selectRef.value.getListConsultCache();
}
function changeSelect(_data) {}
function reset() {
  selectList.value = [];
}
watch(
  () => value.value.valueText,
  (_new, _old) => {
    console.log(_new);
    selectList.value = JSON.parse(JSON.stringify(value.value.valueText));
  },
  { deep: true }
);
defineExpose({
  getListConsultCache,
  reset,
});
</script>
<template>
  <ElementFormLayout
    :id="id"
    :label="label"
    :labelClass="labelClass"
    :helpText="helpText"
    :showHelpText="showHelpText"
    :disabled="disabled"
    :viewMode="viewMode"
    :validation="value.validation"
  >
    <template v-slot:view>
      <ul class="fix-padding-ul list-selected-view">
        <li v-for="(element, index) in selectList">
          <div>
            {{ element.text }}
          </div>
          <div class="additional-element">
            {{ element.additional }}
          </div>
        </li>
      </ul>
    </template>
    <template v-slot:form>
      <div :class="['input-array g-input validation', inputClass]">
        <div class="row g-1">
          <div class="col">
            <g-select-consult-val
              ref="selectRef"
              v-model="value.element"
              :consult="consult"
              :filter="filter"
              :noChangeValue="true"
              nullText="Seleccione multiples opciones"
              @changeGetComplete="addItem"
              :showAditionalInSelect="false"
              dropDirection="dropup"
              autoClose="outside"
            />
          </div>
        </div>

        <div class="list-selected">
          <div v-show="value.value.length <= 0" class="empty-text">
            No se ingresaron elementos
          </div>
          <div v-for="(element, index) in selectList" class="w-100">
            <!---hr v-show="index !== 0" class="my-0" /---->
            <div class="item-array w-100">
              <div class="row">
                <div class="col">
                  <div>
                    {{ element.text }}
                  </div>
                  <div class="additional-element">
                    {{ element.additional }}
                  </div>
                </div>
                <div class="col-auto button-container">
                  <g-button-x-min @click="deleteItem(index)" title="Eliminar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </ElementFormLayout>
</template>
<style scoped>
.button-container {
  align-items: center;
  display: flex;
}
.additional-element {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-b-v3);
}
.empty-text {
  text-align: center;
  color: var(--color-b-v3);
}

.item-array {
  display: inline-block;
}
.list-selected {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.list-selected-view {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
