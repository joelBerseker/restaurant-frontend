<script setup>
import { ref } from "vue";
import { isEmpty } from "@/helpers/utilities";

const props = defineProps({
  text: { default: "" },
  icon: { default: null },
  type: { default: "primary" },
  loading: { default: false },
  disabled: { default: false },
  iconPosition: { default: "left" },
  title: { default: null },
});

const iconClass = ref("");
const spaceClass = ref("");
const paddingClass = ref("");

function init() {
  if (props.iconPosition === "right") {
    iconClass.value = "order-3";
    spaceClass.value = "order-2";
  }
  if (props.text === "") {
    paddingClass.value = "";
  } else {
    paddingClass.value = "padding-button-text";
  }
}
init();
</script>
<template>
  <button
    :class="[
      'btn btn-sm',
      'g-btn-' + props.type,
      paddingClass,
      isEmpty(text) ? 'btn-icon-mode' : '',
    ]"
    :disabled="props.disabled || props.loading"
    :title="props.title"
  >
    <div :class="['button-container', loading ? 'opacity-0' : '']">
      <div
        v-if="icon !== null"
        :class="'btn-icon icon-position-' + iconPosition"
      >
        <font-awesome-icon class="icon" :icon="icon" />
      </div>
      <div class="btn-text">{{ text }}</div>
    </div>
    <div v-if="loading" class="loading">
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      >
      </span>
    </div>
  </button>
</template>
<style>
.button-container {
  transition: 0.3s;
  display: flex;
}
.btn-icon-mode .button-container {
  justify-content: center;
}
.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-position-left {
  order: 1;
  margin-right: 0.25rem;
}
.icon-position-right {
  order: 3;
  margin-left: 0.25rem;
}
.btn-icon-mode .btn-icon {
  margin-left: 0;
  margin-right: 0;
}
.btn-text {
  order: 2;
}
.btn {
  font-size: 14px;
  border-radius: 999rem;
  border: none;
  padding-top: calc(0.25rem + 1px);
  padding-bottom: calc(0.25rem + 1px);
  padding-left: calc(0.75rem + 1px);
  padding-right: calc(0.75rem + 1px);

  position: relative;
  color: var(--color-b-v2);
}
.btn-icon-mode {
  padding-left: 0;
  padding-right: 0;
  width: 31px;
  aspect-ratio: 1;
}

.btn:hover,
.btn:active,
.btn:focus-visible,
.btn.show {
  box-shadow: inset 0px 0px 0px 200px rgba(51, 51, 51, 0.2);
}

.btn:disabled {
  background-color: var(--color-b);
}

.g-btn-primary {
  background-color: var(--color-1) !important;
  color: var(--color-w) !important;
}

.g-btn-secondary {
  background-color: transparent !important;
}

.g-btn-transparent-1 {
  background-color: transparent !important;
}
</style>
