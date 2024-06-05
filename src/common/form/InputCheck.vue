<script setup>
import { computed, ref } from "vue";
import { isEmpty } from "@/helpers";
const props = defineProps({
  modelValue: { default: null },
  id: { default: null },
  inline: { default: true },
  disabled: { default: false },
  label: { default: null },
  helpText: { default: "" },
  showHelpText: { default: true },
  labelLeft: { default: false },
  switchMode: { default: false },
  labelClass: { default: "" },
});
const emit = defineEmits(["update:modelValue", "change"]);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
function change(_data) {
  emit("change", _data);
}
</script>
<template>
  <div>
    <div class="d-flex">
      <div class="order-1">
        <div :class="['form-check ', switchMode ? 'form-switch' : '']">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            :id="id"
            v-model="value"
            :disabled="disabled"
            @change="change"
          />
        </div>
      </div>
      <div :class="[labelLeft ? 'me-2 order-0' : 'ms-2 order-2']">
        <label v-if="!isEmpty(label)" :class="labelClass"> {{ label }} </label>
      </div>
    </div>
  </div>
</template>
<style scoped>
.g-check {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.form-check {
  min-height: auto;
  margin-bottom: 0;
  padding-left: 0;
  display: flex;
}
.form-check .form-check-input {
  margin-left: 0;
}
</style>
