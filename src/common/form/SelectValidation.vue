<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: { default: null },
  options: { default: [] },
  label: { default: null },
  viewMode: { default: true },
  disabled: { default: false },
  loading: { default: false },
  display: { default: null },
  inputClass: { default: "" },
  viewClass: { default: "" },
  labelClass: { default: "" },
  helpText: { default: "" },
  clearButton: { default: true },
  display: { default: null },
  loadingSelect: { default: true },
  noChangeValue: { default: false },
  showHelpText: { default: false },
  showAditionalInSelect: { default: true },
  nullOption: { default: false },
  nullText: { default: "Seleccione una opción" },
});

const selectRef = ref(null);

const emit = defineEmits(["change", "validate"]);

const value = computed({
  get() {
    return props.modelValue;
  },
});

function change(_data) {
  emit("validate", value.value);
  emit("change", _data);
}

function clear() {
  value.value.validation = {};
}
</script>
<template>
  <g-select
    ref="selectRef"
    v-model="value.value"
    :options="options"
    :valueText="value.valueText"
    :viewMode="viewMode"
    :disabled="disabled"
    :loading="loading"
    :viewClass="viewClass"
    selectClass="validation"
    :label="label"
    :labelClass="labelClass"
    :helpText="helpText"
    :showHelpText="showHelpText"
    :clearButton="clearButton"
    @change="change"
    @clear="clear()"
    :display="display"
    :loadingSelect="loadingSelect"
    :showAditionalInSelect="showAditionalInSelect"
    :noChangeValue="noChangeValue"
    :nullText="nullText"
    :nullOption="nullOption"
    :validation="value.validation"
  >
    <template v-slot:header-list><slot name="header-list"></slot></template>
    <template v-slot:footer-list><slot name="footer-list"></slot></template>
  </g-select>
</template>
