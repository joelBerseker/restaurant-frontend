<script setup>
import { isEmpty } from "@/helpers/utilities";
import { computed, ref } from "vue";
const props = defineProps({
  id: { default: null },
  label: { default: null },
  value: { default: null },
  type: { default: null },
  validation: { default: null },
  showHelpText: { default: true },
  disabled: { default: true },
  viewMode: { default: true },
  clearButton: { default: true },
  loading: { default: false },
  helpText: { default: "" },
  contentClass: { default: "" },
  labelClass: { default: "" },
});
const emit = defineEmits(["clear"]);
const isHover = ref(null);
const showClearButton = computed(() => {
  let resp = false;
  if (
    !props.loading &&
    !isEmpty(props.value) &&
    !props.disabled &&
    props.clearButton
  ) {
    resp = true;
    if (
      props.validation !== null &&
      props.validation.isValid !== undefined &&
      !isHover.value
    ) {
      resp = false;
    }
  }
  return resp;
});
const showValidationIcon = computed(() => {
  let resp = false;
  if (
    !props.loading &&
    props.validation !== null &&
    props.validation.isValid !== undefined &&
    !showClearButton.value
  ) {
    resp = true;
  }
  return resp;
});
function clear() {
  emit("clear");
}
</script>
<template>
  <div
    :class="[
      'g-form-element',
      validation === null ? '' : validation.validationClass,
      type,
    ]"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <label v-if="!isEmpty(label)" :class="[labelClass, 'g-label']" :for="id">
      {{ label }}:
    </label>
    <div v-show="viewMode && disabled">
      <slot name="view"></slot>
    </div>
    <div v-show="!(viewMode && disabled)" class="g-form-container">
      <main class="g-form-container-aditional">
        <div
          :class="[
            'g-form-wrapper',
            loading || showClearButton || showValidationIcon
              ? 'show-extra'
              : '',
          ]"
        >
          <slot name="form"></slot>
          <div v-show="loading" class="form-loading">
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            >
            </span>
          </div>
          <div v-show="showClearButton" class="form-close">
            <g-button-x-min @click="clear()" title="Limpiar" />
          </div>
          <div v-show="showValidationIcon" class="validation-icon">
            <font-awesome-icon
              v-if="validation !== null && !isEmpty(validation.icon)"
              :icon="validation.icon"
            />
          </div>
        </div>
        <slot name="aditional"></slot>
      </main>
      <footer>
        <div
          v-if="validation !== null && !isEmpty(validation.message)"
          class="validation-message"
        >
          <font-awesome-icon :icon="validation.icon_text" />

          {{ validation.message }}
        </div>
        <div v-if="!isEmpty(helpText) && showHelpText" class="g-message">
          <font-awesome-icon icon="fa-regular fa-circle-question" />
          {{ helpText }}
        </div>
      </footer>
    </div>
  </div>
</template>
<style>
.g-input:focus,
.g-select:focus {
  box-shadow: 0px -3px 0px 0px rgba(68, 68, 68, 0.25) inset;
  border-color: var(--g-wb500);
}

.valid > div > main > div > .g-input,
.valid > div > main > div > div > .g-select,
.valid > div > main > div > .g-image-container,
.valid > div > main > div > .g-file-input {
  border-color: var(--color-s) !important;
}
.valid > div > main > div > .g-input:focus,
.valid > div > main > div > div > .g-select:focus {
  box-shadow: 0px -3px 0px 0px rgba(var(--color-s-rgb), 0.25) inset;
}
.no-valid > div > main > div > .g-input,
.no-valid > div > main > div > div > .g-select,
.no-valid > div > main > div > .g-image-container,
.no-valid > div > main > div > .g-file-input {
  border-color: var(--color-d) !important;
}
.no-valid > div > main > div > .g-input:focus,
.no-valid > div > main > div > div > .g-select:focus {
  box-shadow: 0px -3px 0px 0px rgba(var(--color-d-rgb), 0.25) inset;
}
</style>
<style scoped>
.g-label {
  width: 100%;
  font-weight: 500;
  color: var(--color-1-v3);
}
.label-login {
  color: var(--color-1-v2);
}
.g-message,
.validation-message {
  font-size: 13px !important;
  color: var(--color-b-v3);
  text-align: start;
}
.g-form-wrapper {
  position: relative;
}
.form-loading {
  color: var(--color-b-v2);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}
.form-close {
  color: var(--g-wb050);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}
.validation-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  border-radius: 999rem;
  height: 20px;
  width: 20px;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-w);
  font-size: 12px;
}
.g-form-element.input-button-left > div > main > div > .form-loading,
.g-form-element.input-button-left > div > main > div > .form-close {
  right: 1rem;
}
.g-form-element.image > div > main > div > .form-loading,
.g-form-element.image > div > main > div > .form-close,
.g-form-element.image > div > main > div > .validation-icon {
  right: 0.4rem;
}
.g-form-element.image > div > main > div > .form-loading,
.g-form-element.image > div > main > div > .form-close,
.g-form-element.image > div > main > div > .validation-icon {
  right: 0.4rem;
}
.g-form-element.file > div > main > div > .form-loading,
.g-form-element.file > div > main > div > .form-close,
.g-form-element.file > div > main > div > .validation-icon {
  right: 0.65rem;
}
.g-form-element.textarea
  .g-form-element.textarea
  > div
  > main
  > div
  > .form-loading,
.g-form-element.image > div > main > div > .form-loading {
  top: 0.4rem;
  transform: translateY(0);
}
.g-form-element.textarea > div > main > div > .validation-icon,
.g-form-element.textarea > div > main > div > .form-close,
.g-form-element.image > div > main > div > .validation-icon,
.g-form-element.image > div > main > div > .form-close {
  top: 0.35rem;
  transform: translateY(0);
}
.g-form-element.image > div > main > .g-form-wrapper {
  width: fit-content;
}
/*NO VALID */
.no-valid > div > footer > .validation-message {
  color: var(--color-d);
}
.no-valid > .g-label {
  color: var(--color-d);
}
.no-valid > div > main > div > .validation-icon {
  background-color: var(--color-d);
}
/*VALID */
.valid > div > footer > .validation-message {
  color: var(--color-s);
}
.valid > .g-label {
  color: var(--color-s);
}
.valid > div > main > div > .validation-icon {
  background-color: var(--color-s);
}
</style>
