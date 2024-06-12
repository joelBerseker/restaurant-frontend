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
  awaitInput: { default: false },
});
const emit = defineEmits(["update:modelValue", "input", "clear"]);
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
  },
});
function focus() {
  inputRef.value.focus();
}
function input() {
  if (props.awaitInput) {
    inputAwait();
    return;
  }
  emit("input");
}

const waitNumber = ref(0);
const waitLoading = ref(false);
async function inputAwait() {
  waitLoading.value = true;
  waitNumber.value++;
  const _waitNumber = waitNumber.value;
  await sleep(400);
  if (_waitNumber === waitNumber.value) {
    waitLoading.value = false;
    emit("input");
  }
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
        :type="localType"
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
  border-radius: 0;
  border-color: var(--color-b-v4) !important;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  border-left: none;
  border-right: none;
  border-top: none;
  padding-top: calc(0.25rem + 1px);
  padding-bottom: 0.25rem;

  font-size: 14px;
}
.g-form-wrapper.show-extra .form-control-sm {
  padding-right: 1.8rem;
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
</style>
<style scoped></style>
