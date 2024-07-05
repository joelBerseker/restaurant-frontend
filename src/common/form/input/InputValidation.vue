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
function change(_value) {
  emit("validate", value.value);
  emit("change", _value);
}
const localPlaceHolder = computed(() => {
  if (value.value.default) return value.value.default;
  if (value.value.placeholder) {
    return value.placeholder;
  }

  if (value.value.required === false) return "Valor no requerido";
  else {
    return "*Valor requerido";
  }
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
    @change="change()"
    @clear="clear()"
    :formatInBlur="value.formatInBlur"
    :validation="value.validation"
  >
    <template #next><slot name="next"></slot></template>
    <template #prev><slot name="prev"></slot></template>
  </g-input>
</template>
