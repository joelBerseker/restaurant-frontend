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
      'btn-' + props.type,
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
        <font-awesome-icon :icon="icon" />
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
<style scoped>
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
  border-radius: var(--br);
  border: none;
  padding-top: calc(0.25rem + 1px);
  padding-bottom: calc(0.25rem + 1px);
  padding-left: calc(0.5rem + 1px);
  padding-right: calc(0.5rem + 1px);
  transition: 0.3s;
  position: relative;
}
.btn-icon-mode {
  padding-left: 0;
  padding-right: 0;
  width: 31px;
  aspect-ratio: 1;
}
.padding-button-text {
  padding-left: calc(0.7rem);
  padding-right: calc(0.7rem);
}

.btn:hover,
.btn:active,
.btn:focus-visible,
.btn.show {
  box-shadow: inset 0px 0px 0px 200px rgba(0, 0, 0, 0.1);
}

.btn:disabled {
  background-color: var(--color-b);
}

.btn-primary {
  background-color: var(--color-1);
  color: var(--g-wb300) !important;
}
.btn-primary:hover,
.btn-primary:active,
.btn-primary:focus-visible {
  background-color: var(--g-pc600) !important;
  color: var(--g-wb100) !important;
}

/*--------------------------------------*/
.btn-secondary,
.btn-secondary.show,
.btn-secondary:hover,
.btn-secondary:active,
.btn-secondary:focus-visible {
  background-color: rgba(0, 0, 0, 0.08) !important;
  color: var(--g-wb900) !important;
}
/*--------------------------------------*/
.btn-secondary-light,
.btn-secondary-light:hover,
.btn-secondary-light:active,
.btn-secondary-light:focus-visible {
  background-color: #d4d4d4c7;
  color: var(--g-wb900);
}
</style>
