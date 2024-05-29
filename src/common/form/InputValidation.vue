<script setup>
import { ref, computed } from "vue";
import { isEmpty } from "@/helpers/utilities";
import FormValidation from "@/common/form/FormValidation.vue";
const props = defineProps({
  data: { default: {} },
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
const emit = defineEmits(["update:modelValue", "change", "validate"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    let _value = value;
    if (!isEmpty(_value) && props.type !== "textarea" && props.uppercase) {
      _value = _value.toUpperCase();
    }
    emit("update:modelValue", _value);
  },
});
const inputRef = ref(null);
function focus() {
  inputRef.value.focus();
}
function input() {
  emit("validate", value.value);

  emit("change", value.value.value);
}
function clear() {
  value.value.validation = {};
  emit("change", value.value.value);
}
defineExpose({
  focus,
});
</script>
<template>
  <FormValidation :validation="value.validation" :onlyDanger="onlyDanger">
    <g-input
      ref="inputRef"
      v-model="value.value"
      :id="value.id"
      :type="value.type"
      :placeholder="value.default"
      :viewMode="viewMode"
      :disabled="disabled"
      :display="display"
      :inputClass="['validation', inputClass]"
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
  </FormValidation>
</template>
