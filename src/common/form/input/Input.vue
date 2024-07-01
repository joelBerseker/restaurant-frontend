<script setup>
import { computed, ref, reactive } from "vue";
import { isEmpty, sleep } from "@/helpers/utilities";
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
  lowercase: { default: false },
  disabled: { default: false },
  loading: { default: false },
  type: { default: "text" },
  inputClass: { default: "" },
  viewClass: { default: "" },
  labelClass: { default: "" },
  helpText: { default: "" },
  delay: { default: false },
});
const emit = defineEmits([
  "update:modelValue",
  "input",
  "clear",
  "change",
  "delayChange",
]);
const inputRef = ref(null);
const localType = ref("text");
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    let _value = value;
    if (
      !isEmpty(_value) &&
      props.type !== "textarea" &&
      typeof _value === "string"
    ) {
      if (props.lowercase) {
        _value = _value.toLowerCase();
      } else if (props.uppercase) {
        _value = _value.toUpperCase();
      }
    }
    emit("update:modelValue", _value);
    emit("change", _value);
  },
});
function focus() {
  inputRef.value.focus();
}
function input(_data) {
  inputAwait();
  emit("input", _data);
}

const waitNumber = ref(0);
const waitLoading = ref(false);
async function inputAwait() {
  if (!props.delay) return;
  waitLoading.value = true;
  waitNumber.value++;
  const _waitNumber = waitNumber.value;
  await sleep(400);
  if (_waitNumber === waitNumber.value) {
    waitLoading.value = false;
    emit("delayChange", value.value);
  }
}

function blur() {
  if (props.type === "decimal") {
    let number = Number(value.value);
    if (isNaN(number)) return;
    if (value.value === null) return;
    value.value = number.toFixed(2);
  }
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
function init() {
  if (props.type !== "number" && props.type !== "decimal") {
    localType.value = props.type;
  }
}
init();
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
    :loading="loading || waitLoading"
    :viewMode="viewMode"
    :type="type"
    @clear="clear"
    @blur="blur()"
    :validation="validation"
    wrapperClass="g-input"
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
    <template v-slot:form="{ onFocus, onBlur }">
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
        @input="input"
        @focus="onFocus"
        @blur="onBlur"
      >
      </textarea>
      <input
        v-else
        ref="inputRef"
        v-model.trim="value"
        autocomplete="off"
        :type="localType"
        :id="id"
        :class="['g-input form-control form-control-sm', inputClass]"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="input"
        @focus="onFocus"
        @blur="onBlur"
      />
    </template>
  </ElementFormLayout>
</template>
<style>
.g-text-area {
  field-sizing: content;
  min-height: 5rem !important;
  max-height: 15rem !important;
  padding-right: 1.45rem !important;
}
.form-control-sm,
.form-control,
.input-group-text,
.form-select {
  border-radius: 0;
  border-color: var(--color-border) !important;
  padding-left: 0rem;
  padding-right: 0rem;
  border: none;
  padding-top: calc(0.25rem + 1px);
  padding-bottom: 0.25rem;

  font-size: 14px;
}
.g-form-wrapper.show-extra .form-control-sm {
  padding-right: 1.5rem;
}
.g-form-wrapper.show-extra .form-control-sm.filter-input {
  padding-right: 2.4rem;
}
.form-control,
.form-select {
  background-color: transparent !important;
}
.form-control:hover,
.form-control:focus,
.form-select:hover,
.form-select:focus {
  background-color: transparent;
}
.input-white {
  color: var(--color-w-v2);
}
.input-white:hover,
.input-white:focus {
  color: var(--color-w-v2);
}
::placeholder {
  color: var(--color-b-v3) !important;
  opacity: 1; /* Firefox */
}
.g-input:disabled {
  border-color: rgb(238, 238, 238) !important;
  color: var(--color-b-v3) !important;
}
</style>
<style scoped></style>
