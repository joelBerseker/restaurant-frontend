<script setup>
import { isEmpty } from "@/helpers/utilities";
const props = defineProps({
  validation: { default: {} },
  onlyDanger: { default: false },
  containerClass: { default: "" },
});
</script>
<template>
  <div
    :class="[
      'g-form-validation',
      onlyDanger && validation.isValid ? '' : validation.validationClass,
    ]"
  >
    <main :class="['g-form-validation-container', props.containerClass]">
      <slot></slot>
    </main>
    <footer class="footer">
      <span
        v-if="!isEmpty(validation.message)"
        :class="['message', validation.validationClass]"
      >
        <span v-if="onlyDanger">
          <span v-if="!validation.isValid">
            <i :class="validation.icon"></i>
            {{ validation.message }}
          </span>
        </span>
        <span v-else>
          <i :class="validation.icon"></i>
          {{ validation.message }}
        </span>
      </span>
    </footer>
  </div>
</template>
<style>
.g-input:focus,
.g-select:focus {
  box-shadow: 0 0 0 3px rgba(184, 184, 184, 0.25) inset;
  border-color: var(--g-wb500);
}
.g-form-validation.no-valid
  > .g-form-validation-container
  > .g-form-element
  > div
  > div
  > .g-form-content
  > .g-form-container
  > :is(.g-input.validation, .g-select.validation, .g-image-container) {
  border-color: var(--g-danger) !important;
}

.g-form-validation.no-valid
  > .g-form-validation-container
  > .g-form-element
  > .g-form-label
  > label {
  color: var(--g-danger) !important;
}
.g-form-validation.no-valid
  > .g-form-validation-container
  > .g-form-element
  > div
  > div
  > .g-form-content
  > .g-form-container
  > :is(.g-input.validation:focus, .g-select.validation:focus) {
  box-shadow: 0 0 0 3px rgba(var(--g-danger-rgb), 0.25) inset !important;
}
.g-form-validation.valid
  > .g-form-validation-container
  > .g-form-element
  > div
  > div
  > .g-form-content
  > .g-form-container
  > :is(.g-input.validation, .g-select.validation, .g-image-container) {
  border-color: var(--g-success-form) !important;
}
.g-form-validation.valid
  > .g-form-validation-container
  > .g-form-element
  > div
  > div
  > .g-form-content
  > .g-form-container
  > :is(.g-input.validation:focus, .g-select.validation:focus) {
  box-shadow: 0 0 0 3px rgba(var(--g-success-form-rgb), 0.25) inset !important;
}
.g-form-validation .message,
.g-form .message {
  font-size: 13px !important;
  color: var(--g-wb500);
}
</style>
<style scoped>
.message.no-valid {
  color: var(--g-danger);
}
.message.normal {
  color: var(--g-wb500);
}
</style>
