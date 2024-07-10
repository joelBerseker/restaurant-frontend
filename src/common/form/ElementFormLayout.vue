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
  validationIcon: { default: true },

  helpText: { default: "" },
  contentClass: { default: "" },
  labelClass: { default: "" },
  wrapperClass: { default: "" },
});
const emit = defineEmits(["clear", "blur"]);
const isHover = ref(null);
const isFocus = ref(false);

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
    props.validationIcon &&
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
function onFocus(params) {
  isFocus.value = true;
}
function onBlur(params) {
  emit("blur");
  isFocus.value = false;
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
          :class="['g-form-wrapper', wrapperClass, disabled ? 'disabled' : '']"
        >
          <div :class="['focus-container', isFocus ? 'focus' : '']"></div>
          <slot name="form" :onFocus="onFocus" :onBlur="onBlur"></slot>
          <div v-show="loading" class="form-loading addtional-element">
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            >
            </span>
          </div>
          <div v-show="showClearButton" class="form-close addtional-element">
            <g-button-x-min @click="clear()" title="Limpiar" />
          </div>
          <div v-show="showValidationIcon" class="addtional-element">
            <div class="validation-icon">
              <font-awesome-icon
                v-if="validation !== null && !isEmpty(validation.icon)"
                :icon="validation.icon"
              />
            </div>
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
  box-shadow: none;
}
.valid > div > main > .g-select,
.valid > div > main > .g-select-multiple,
.valid > div > main > .g-input,
.valid > div > main > .g-input-file,
.valid > div > main > .g-input-image > .g-image-container {
  border-color: var(--color-s) !important;
}
.no-valid > div > main > .g-select,
.no-valid > div > main > .g-select-multiple,
.no-valid > div > main > .g-input,
.no-valid > div > main > .g-input-file,
.no-valid > div > main > .g-input-image > .g-image-container {
  border-color: var(--color-d) !important;
}
</style>
<style scoped>
.spinner-border {
  color: var(--color-b-v3);
}
.focus-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
  transition: 0.2s ease;
  z-index: 1;
}
.g-form-wrapper.g-select,
.g-form-wrapper.g-input {
  border-bottom: 1px solid var(--color-border);
  transition: 0.2s ease;
}
.g-form-wrapper.g-select.disabled,
.g-form-wrapper.g-input.disabled {
  border-color: rgba(0, 0, 0, 0);
}
.g-form-wrapper.g-select > .focus-container.focus,
.g-form-wrapper.g-input > .focus-container.focus {
  box-shadow: 0px -3px 0px 0px rgba(129, 129, 129, 0.25) inset;
}
.input-white .g-form-wrapper.g-input > .focus-container.focus {
  box-shadow: 0px -3px 0px 0px rgb(255, 255, 255, 0.25) inset;
}
.g-form-wrapper.g-input-image {
  width: fit-content;
}
.g-form-wrapper.g-input-file {
  border: 1px solid var(--color-border);
  transition: 0.2s ease;
  border-radius: var(--br-v3);
  padding: 0rem 0.75rem;
}
.g-form-wrapper.g-select-multiple {
  border: 1px solid var(--color-border);
  transition: 0.2s ease;
  border-radius: var(--br-v3);
  padding: 0.4rem 1rem;
  padding-bottom: 0.8rem;
}
.g-form-wrapper.g-input-file > .focus-container.focus {
  box-shadow: 0px 0px 0px 3px rgba(68, 68, 68, 0.25) inset;
  border-radius: calc(var(--br-v3) - 1px);
}

.g-form-wrapper.g-input-image > .focus-container.focus {
  box-shadow: 0px 0px 0px 3px rgba(68, 68, 68, 0.25) inset;
  border-radius: var(--br);
}

.valid > div > main > .g-select > .focus-container.focus,
.valid > div > main > .g-input > .focus-container.focus {
  box-shadow: 0px -3px 0px 0px rgba(var(--color-s-rgb), 0.25) inset;
}
.valid > div > main > .g-input-file > .focus-container.focus,
.valid > div > main > .g-input-image > .focus-container.focus {
  box-shadow: 0px 0px 0px 3px rgba(var(--color-s-rgb), 0.25) inset;
}

.no-valid > div > main > .g-select > .focus-container.focus,
.no-valid > div > main > .g-input > .focus-container.focus {
  box-shadow: 0px -3px 0px 0px rgba(var(--color-d-rgb), 0.25) inset;
}
.no-valid > div > main > .g-input-file > .focus-container.focus,
.no-valid > div > main > .g-input-image > .focus-container.focus {
  box-shadow: 0px 0px 0px 3px rgba(var(--color-d-rgb), 0.25) inset;
}

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
  display: flex;
}
.addtional-element {
  margin-left: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.addtional-element-adasdadad {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}
.form-loading {
  color: var(--color-b-v2);
}
.validation-icon {
  border-radius: 999rem;
  height: 1.2rem;
  width: 1.2rem;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-w);
  font-size: 10px;
}
.g-form-element.input-button-left > div > main > .g-form-wrapper {
  padding-right: 1.1rem;
}
.g-form-element.image > div > main > div > .addtional-element {
  top: 0.4rem;
  right: 0.4rem;
  position: absolute;
}
.g-form-element.textarea > div > main > div > .addtional-element {
  top: 0.45rem;
  right: 0;
  position: absolute;
}

.g-form-element.select-multiple > div > main > div > .addtional-element {
  align-items: start;
  margin-top: 0.31rem;
  margin-left: 0.5rem;
}

/*NO VALID */
.no-valid > div > footer > .validation-message {
  color: var(--color-d);
}
.no-valid > .g-label {
  color: var(--color-d);
}
.no-valid > div > main > div > div > .validation-icon {
  background-color: var(--color-d);
}
/*VALID */
.valid > div > footer > .validation-message {
  color: var(--color-s);
}
.valid > .g-label {
  color: var(--color-s);
}
.valid > div > main > div > div > .validation-icon {
  background-color: var(--color-s);
}
</style>
