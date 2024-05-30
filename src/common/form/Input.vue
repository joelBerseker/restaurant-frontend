<script setup>
import { computed, ref, reactive } from "vue";
import { isEmpty } from "@/helpers/utilities";
import ElementFormLayout from "@/common/form/ElementFormLayout.vue";

const props = defineProps({
  modelValue: { default: null },
  id: { default: null },
  placeholder: { default: null },
  display: { default: null },
  label: { default: null },
  formatInBlur: { default: null },
  validation: { default: null },
  viewMode: { default: true },
  showHelpText: { default: true },
  uppercase: { default: true },
  disabled: { default: false },
  loading: { default: false },
  type: { default: "text" },
  inputClass: { default: "" },
  viewClass: { default: "" },
  labelClass: { default: "" },
  helpText: { default: "" },
});
const emit = defineEmits(["update:modelValue", "input", "clear"]);
const inputRef = ref(null);
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
function focus() {
  inputRef.value.focus();
}
function input() {
  emit("input");
}
function blur() {
  if (props.formatInBlur === null) return;
  formatInBlurOptions.init(props.formatInBlur);
  emit("input");
}
function clear() {
  value.value = null;
  emit("clear");
}
function displayText() {
  if (isEmpty(value.value)) return "No definido";
  else {
    return props.display(value.value);
  }
}
const formatInBlurOptions = reactive({
  init(_data) {
    if (_data === null) return;
    if (this[_data] !== undefined) {
      this[_data](value.value);
    }
  },
  price() {
    let number = Number(value.value);
    if (isNaN(number)) return;
    if (value.value === null) return;
    value.value = number.toFixed(2);
  },
});

defineExpose({
  focus,
});
</script>
<template>
  <ElementFormLayout
    :id="id"
    :label="label"
    :value="value"
    :labelClass="labelClass"
    :helpText="helpText"
    :showHelpText="showHelpText"
    :disabled="disabled"
    :loading="loading"
    :viewMode="viewMode"
    :type="type"
    @clear="clear"
    :validation="validation"
  >
    <template v-slot:view>
      <div :class="[viewClass]">
        <span v-if="isEmpty(value)" class="status-element no-defined-status">
          Por determinar
        </span>
        <span v-else-if="display !== null">
          {{ displayText() }}
        </span>
        <span v-else>
          {{ value }}
        </span>
      </div>
    </template>
    <template v-slot:form>
      <textarea
        v-if="type == 'textarea'"
        ref="inputRef"
        v-model="value"
        :id="id"
        :class="[
          'g-input form-control form-control-sm g-text-area',
          inputClass,
        ]"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="input()"
        @blur="blur()"
      >
      </textarea>
      <input
        v-else
        ref="inputRef"
        v-model.trim="value"
        autocomplete="off"
        :type="type"
        :id="id"
        :class="['g-input form-control form-control-sm', inputClass]"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="input()"
        @blur="blur()"
      />
    </template>
  </ElementFormLayout>
</template>
<style>
.g-text-area {
  field-sizing: content;
  min-height: 5rem !important;
  max-height: 15rem !important;
}
.form-control-sm,
.form-control,
.input-group-text,
.form-select {
  border-radius: var(--br);
  border-color: var(--g-wb400);
  font-size: 14px;
}
.form-control,
.form-select {
  background-color: transparent !important;
}
</style>
<style scoped></style>
