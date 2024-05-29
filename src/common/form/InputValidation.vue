<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: { default: null },
  id: { default: null },
  label: { default: null },
  viewMode: { default: true },
  disabled: { default: false },
  loading: { default: false },
  display: { default: null },
  inputClass: { default: "" },
  viewClass: { default: "" },
  labelClass: { default: "" },
  onlyDanger: { default: false },
  uppercase: { default: true },
  showHelpText: { default: true },
  helpText: { default: "" },
});
const emit = defineEmits(["change", "validate"]);

const value = computed({
  get() {
    return props.modelValue;
  },
});
const inputRef = ref(null);
function input() {
  emit("validate", value.value);
  emit("change", value.value.value);
}
function clear() {
  value.value.validation = {};
  emit("change", value.value.value);
}
</script>
<template>
  <g-input
    ref="inputRef"
    v-model="value.value"
    :id="value.id"
    :type="value.type"
    :placeholder="value.default"
    :viewMode="viewMode"
    :disabled="disabled"
    :display="display"
    :inputClass="inputClass"
    :viewClass="viewClass"
    :loading="loading"
    :label="label"
    :uppercase="uppercase"
    :labelClass="labelClass"
    :helpText="helpText"
    :showHelpText="showHelpText"
    @input="input()"
    @clear="clear()"
    :formatInBlur="value.formatInBlur"
    :validation="value.validation"
  />
</template>
