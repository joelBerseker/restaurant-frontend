<script setup>
import { isEmpty } from "@/helpers/utilities";
import { computed, ref } from "vue";

const props = defineProps({
  id: { default: null },

  label: { default: null },
  value: { default: null },
  helpText: { default: "" },
  showHelpText: { default: true },
  disabled: { default: true },
  loading: { default: false },
  viewMode: { default: true },
  clearButton: { default: true },
  type: { default: null },
  validation: { default: null },

  contentClass: { default: "" },
  labelClass: { default: "" },
});
const emit = defineEmits(["clear"]);
function clear() {
  emit("clear");
}
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

const validationIcon = computed(() => {
  let resp = {
    show: false,
    iconClass: null,
    icon: "fa-solid fa-check",
  };
  if (
    props.validation !== null &&
    props.validation.isValid !== undefined &&
    !showClearButton.value
  ) {
    resp.show = true;
    if (props.validation.isValid) {
      resp.iconClass = "g-valid-icon";
      resp.icon = "fa-solid fa-check";
      if (isEmpty(props.value)) {
        resp.show = false;
      }
    } else {
      resp.iconClass = "g-invalid-icon";
      resp.icon = "fa-solid fa-exclamation";
    }
  }

  return resp;
});

const isHover = ref(null);
</script>
<template>
  <div
    class="g-form-element"
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
      <div class="g-form-container-aditional">
        <div class="g-form-wrapper">
          <slot name="form"></slot>
          <div v-show="loading" :class="['loading ', type]">
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            >
            </span>
          </div>
          <div v-show="!loading && showClearButton" :class="['close', type]">
            <g-button-x-min @click="clear()" title="Limpiar" />
          </div>
          <div
            v-show="!loading && validationIcon.show"
            :class="['validation-icon', validationIcon.iconClass, type]"
          >
            <font-awesome-icon :icon="validationIcon.icon" />
          </div>
        </div>
        <slot name="aditional"></slot>
      </div>
      <div v-if="!isEmpty(helpText) && showHelpText" class="g-message">
        <font-awesome-icon icon="fa-solid fa-circle-info" />
        {{ helpText }}
      </div>
    </div>
  </div>
</template>
<style>
.important-label {
  color: var(--g-important-text-2);
}
.show-extra > .g-form-container > .g-input {
  padding-right: 2.3rem;
}
.show-extra > .g-form-container > .g-select {
  background-position: right 2rem center !important;
  padding-right: 3.2rem;
}
.label-no-color label {
  color: var(--g-wb500) !important;
}
</style>

<style scoped>
.g-label {
  width: 100%;
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
}
.g-valid-icon {
  background-color: var(--color-s);
  color: var(--color-w);
}
.g-invalid-icon {
  background-color: var(--color-d);
  color: var(--color-w);
}
.g-message {
  font-size: 13px !important;
  color: var(--g-wb500);
}
.g-message.no-valid {
  color: var(--g-danger);
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
.loading.textarea {
  top: 0.4rem;
  transform: translateY(0);
}
.close.textarea,
.close.inputimg,
.g-invalid-icon.textarea,
.g-valid-icon.textarea,
.g-invalid-icon.inputimg,
.g-valid-icon.inputimg {
  top: 0.35rem;
  transform: translateY(0);
}
</style>
