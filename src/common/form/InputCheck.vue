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
  checkPosition: { default: "left" },
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
    <div :class="['d-flex g-check', checkPosition]">
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
      <div class="g-check-label">
        <label v-if="!isEmpty(label)" :class="labelClass"> {{ label }} </label>
      </div>
    </div>
  </div>
</template>
<style scoped>
.g-check.left .g-check-label {
  margin-left: 0.5rem;
  order: 2;
}
.g-check.right .g-check-label {
  margin-right: 0.5rem;
  order: 0;
}
.g-check.bottom {
  flex-direction: column;
}
.g-check.bottom .g-check-label {
  order: 0;
}

.form-check {
  min-height: auto;
  margin-bottom: 0;
  padding-left: 0;
  display: flex;
}
.form-check .form-check-input {
  margin-left: 0;
  margin-top: 0.32rem;
}
</style>
