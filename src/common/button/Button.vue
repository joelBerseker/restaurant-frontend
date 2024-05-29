<script setup>
import { ref } from "vue";

const props = defineProps({
  text: {
    default: "",
  },
  icon: {
    default: "",
  },
  type: {
    default: "primary",
  },
  textColor: {
    default: "",
  },
  loading: {
    default: false,
  },
  disabled: {
    default: false,
  },
  min: {
    default: false,
  },
  buttonClass: {
    default: "",
  },
  iconPosition: {
    default: null,
  },
  title: {
    default: null,
  },
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
      'btn-text-' + props.textColor,
      buttonClass,
      paddingClass,
      min ? 'btn-min' : '',
    ]"
    :disabled="props.disabled || props.loading"
    :title="props.title"
  >
    <div class="d-flex">
      <div :class="[iconClass, 'd-flex']">
        <div v-if="loading" class="d-flex align-items-center">
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          >
          </span>
        </div>
        <div v-else class="icon-button-container">
          <i :class="[icon, ' icon-button']"></i>
        </div>
      </div>
      <div v-if="text !== ''" :class="spaceClass">&nbsp</div>
      <div>{{ text }}</div>
    </div>
  </button>
</template>
<style>
.icon-button-container {
  height: 21px !important;
}
.icon-button {
  height: 21px !important;
  display: inline-block;
  vertical-align: middle;
}
.order-3 {
  order: 3;
}
.order-2 {
  order: 2;
}

.btn {
  font-size: 14px;
  border-radius: var(--g-br1);
  border: none;
  padding-top: calc(0.25rem + 1px);
  padding-bottom: calc(0.25rem + 1px);
  padding-left: calc(0.5rem + 1px);
  padding-right: calc(0.5rem + 1px);
  transition: 0.3s;
}
.padding-button-text {
  padding-left: calc(0.7rem);
  padding-right: calc(0.7rem);
}
.btn-min {
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: calc(0.5rem + 1px);
  padding-right: calc(0.5rem + 1px);
  font-size: 13px;
}
.btn:hover,
.btn:active,
.btn:focus-visible,
.btn.show {
  box-shadow: inset 0px 0px 0px 200px rgba(0, 0, 0, 0.1);
}

.btn:disabled {
  background-color: var(--g-wb600);
}

.btn-primary {
  background-color: var(--g-pc500);
  color: var(--g-wb300) !important;
}
.btn-primary:hover,
.btn-primary:active,
.btn-primary:focus-visible {
  background-color: var(--g-pc600) !important;
  color: var(--g-wb100) !important;
}
/*--------------------------------------*/
.btn-primary-light,
.btn-primary-light:hover,
.btn-primary-light:active,
.btn-primary-light:focus-visible {
  background-color: #e3e5e5;
  color: var(--g-wb900);
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
/*--------------------------------------*/
.btn-opaque-light,
.btn-opaque-light:hover,
.btn-opaque-light:active,
.btn-opaque-light:focus-visible {
  background-color: rgba(255, 255, 255, 0.644);
  color: var(--g-wb900);
}
/*--------------------------------------*/
.btn-transparent,
.btn-transparent:hover,
.btn-transparent:active,
.btn-transparent:focus-visible {
  background-color: transparent;
  color: var(--g-wb100);
}
/*--------------------------------------*/
.btn-danger,
.btn-danger:hover,
.btn-danger:active,
.btn-danger:focus-visible {
  background-color: var(--g-sc500);
  color: var(--g-wb100);
}
.btn-danger:hover,
.btn-danger:active,
.btn-danger:focus-visible {
  box-shadow: inset 0px 0px 0px 200px rgba(0, 0, 0, 0.15);
}
.btn-text-light {
  color: var(--g-wb100) !important;
}
.btn-text-dark {
  color: var(--g-wb900) !important;
}
.btn-text-blue {
  color: var(--g-important-text) !important;
}
</style>
