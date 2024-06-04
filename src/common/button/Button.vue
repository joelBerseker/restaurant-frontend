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
  collapse: { default: false },
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
      collapse ? 'collapse-open' : 'collapse-close',
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
  transition: 0.3s;
}

.btn-icon-mode {
  padding-left: 0;
  padding-right: 0;
  width: 31px;
  aspect-ratio: 1;
}

.btn.collapse-open {
  box-shadow: inset 0px 0px 0px 200px rgba(51, 51, 51, 0.2);
}

.btn:hover,
.btn:active,
.btn:focus-visible,
.btn.show {
  box-shadow: inset 0px 0px 0px 200px rgba(51, 51, 51, 0.2);
}

.btn:disabled {
  background-color: var(--color-w-v3) !important;
}

.g-btn-primary {
  background-color: var(--color-1) !important;
  color: var(--color-w) !important;
}
.g-btn-danger {
  background-color: var(--color-d) !important;
  color: var(--color-w) !important;
}

.g-btn-search {
  padding-top: calc(0.25rem);
  padding-bottom: calc(0.25rem);
  padding-left: calc(0.75rem);
  padding-right: calc(0.75rem);
  border: 1px solid var(--color-b-v4);
}
.g-btn-search:hover,
.g-btn-search:active,
.g-btn-search:focus-visible,
.g-btn-search.show {
  border: 1px solid var(--color-b-v4);
}

.g-btn-secondary {
  background-color: transparent !important;
}

.g-btn-transparent-1 {
  background-color: transparent !important;
}
.status-button.active {
  color: var(--color-1-v3);
}
.status-button.inactive {
  color: var(--color-d);
}
.g-btn-link-min {
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 12px;
}
</style>
