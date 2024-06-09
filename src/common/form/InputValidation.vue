<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: { default: null },
  id: { default: null },
  label: { default: null },
  display: { default: null },
  viewMode: { default: true },
  uppercase: { default: true },
  lowercase: { default: false },

  showHelpText: { default: true },
  disabled: { default: false },
  loading: { default: false },
  onlyDanger: { default: false },
  inputClass: { default: "" },
  viewClass: { default: "" },
  labelClass: { default: "" },
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
  emit("validate", value.value);
  emit("change", value.value.value);
}
const localPlaceHolder = computed(() => {
  if (value.value.default) return value.value.default;
  if (value.value.placeholder) {
    console.log(value.value.placeholder);
    return value.placeholder;
  }
  let resp = "Ingrese un valor";

  return resp;
});
</script>
<template>
  <g-input
    ref="inputRef"
    v-model="value.value"
    :id="value.id"
    :type="value.type"
    :placeholder="localPlaceHolder"
    :viewMode="viewMode"
    :disabled="disabled"
    :display="display"
    :inputClass="inputClass"
    :viewClass="viewClass"
    :loading="loading"
    :label="label"
    :uppercase="uppercase"
    :lowercase="lowercase"
    :labelClass="labelClass"
    :helpText="helpText"
    :showHelpText="showHelpText"
    @input="input()"
    @clear="clear()"
    :formatInBlur="value.formatInBlur"
    :validation="value.validation"
  />
</template>
