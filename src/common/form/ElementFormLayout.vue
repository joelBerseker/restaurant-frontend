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
    props.clearButton &&
    isHover.value
  ) {
    resp = true;
  }
  return resp;
});
const showValidationIcon = computed(() => {
  let resp = false;
  if (
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
    :class="['g-form-element', validation.validationClass, type]"
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
        <div class="g-form-wrapper">
          <slot name="form"></slot>
          <div v-show="loading" class="loading">
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            >
            </span>
          </div>
          <div v-show="!loading && showClearButton" class="close">
            <g-button-x-min @click="clear()" title="Limpiar" />
          </div>
          <div v-show="!loading && showValidationIcon" class="validation-icon">
            <font-awesome-icon
              v-if="!isEmpty(validation.icon)"
              :icon="validation.icon"
            />
          </div>
        </div>
        <slot name="aditional"></slot>
      </main>
      <footer>
        <div v-if="!isEmpty(validation.message)" class="validation-message">
          <font-awesome-icon :icon="validation.icon_text" />

          {{ validation.message }}
        </div>
        <div v-if="!isEmpty(helpText) && showHelpText" class="g-message">
          <font-awesome-icon icon="fa-solid fa-circle-info" />
          {{ helpText }}
        </div>
      </footer>
    </div>
  </div>
</template>
<style>
.g-input:focus,
.g-select:focus {
  box-shadow: 0 0 0 3px rgba(184, 184, 184, 0.25) inset;
  border-color: var(--g-wb500);
}
.valid > div > main > div > :is(.g-input) {
  border-color: var(--color-s);
}
.valid > div > main > div > :is(.g-input:focus) {
  box-shadow: 0 0 0 3px rgba(var(--color-s-rgb), 0.25) inset;
}
.no-valid > div > main > div > :is(.g-input) {
  border-color: var(--color-d);
}
.no-valid > div > main > div > :is(.g-input:focus) {
  box-shadow: 0 0 0 3px rgba(var(--color-d-rgb), 0.25) inset;
}
</style>
<style scoped>
.g-label {
  width: 100%;
}
.g-message,
.validation-message {
  font-size: 13px !important;
  color: var(--g-wb500);
}
.g-form-element {
  width: 100%;
}
.g-form-wrapper {
  position: relative;
}
.loading {
  color: var(--g-wb800);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.6rem;
}
.close {
  color: var(--g-wb050);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.6rem;
}
.validation-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.6rem;
  border-radius: 999rem;
  height: 20px;
  width: 20px;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-w);
}
.textarea > div > main > div > .loading {
  top: 0.4rem;
  transform: translateY(0);
}
.textarea > div > main > div > .validation-icon,
.textarea > div > main > div > .close {
  top: 0.35rem;
  transform: translateY(0);
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
