<script setup>
import { ref, onMounted, useSlots } from "vue";
import { Modal } from "bootstrap";

const props = defineProps({
  zIndex: { default: "5000" },
  scrollable: { default: true },
  titleModal: { default: "" },
  titleAditionalModal: { default: "" },
  subTitleModal: { default: "" },
  closeButton: { default: true },
  size: { default: "" },
  isLoading: { default: false },
});
const slots = useSlots();
const emit = defineEmits(["modal:close"]);
const modalRef = ref(null);
const modal = ref(null);

function closeModal() {
  modal.value.hide();
}
function openModal() {
  modal.value.show();
}

onMounted(() => {
  modal.value = new Modal(modalRef.value);
});

defineExpose({
  closeModal,
  openModal,
});
</script>
<template>
  <div
    class="modal fade"
    ref="modalRef"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-hidden="true"
    tabindex="-1"
    :style="'z-index:' + zIndex"
  >
    <div
      :class="[
        'modal-dialog',
        'modal-' + size,
        scrollable ? 'modal-dialog-scrollable' : '',
      ]"
    >
      <div class="modal-content">
        <header class="modal-header">
          <slot name="header"></slot>
          <div class="modal-title">
            <p>
              <span v-if="titleAditionalModal != ''">
                {{ titleAditionalModal }}
              </span>
              {{ titleModal }}
            </p>
            <span>
              <g-button
                v-if="closeButton"
                type="transparent-1"
                textColor="dark"
                icon="fa-solid fa-xmark"
                tabindex="-1"
                @click="closeModal()"
                class="text-end"
              />
            </span>
          </div>
        </header>
        <hr class="mx-3 my-0" />

        <main class="modal-body">
          <slot></slot>
        </main>
        <div v-show="slots.footer === undefined" class="mt-2"></div>
        <hr v-show="slots.footer !== undefined" class="mx-3 my-0" />
        <footer v-show="slots.footer !== undefined" class="modal-footer">
          <slot name="footer"></slot>
        </footer>
        <transition name="t-loading" mode="out-in">
          <div v-show="isLoading" class="modal-loading">
            <div class="loading-item">
              <span
                class="spinner-border spinner-border-sm me-1"
                role="status"
                aria-hidden="true"
              ></span>
            </div>
            Cargando...
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<style>
.modal-title {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}
.modal-loading {
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
  top: 0;
  align-items: center;
  justify-content: center;
  display: flex;
}
.modal {
  background: rgba(0, 0, 0, 0.7);
}
.modal.modal-static .modal-dialog {
  -webkit-transform: none;
  transform: none;
}
.modal-content {
  border-radius: var(--br-v2);
  border: none;
  background-color: var(--color-w);
  position: relative;
}
.modal-header {
  border-bottom: none;
  padding: 1rem;
}
.modal-header p,
.modal-header p span {
  font-weight: 500;
  font-size: 17px;
}
.modal-body {
  padding: 1rem;
}
.modal-footer {
  border-top: none;
  padding: 1rem;
  margin: calc(-0.25rem / 2);
}
.modal-backdrop {
  display: none !important;
}
.modal-footer > * {
  margin: 0rem;
}
.modal-footer .btn {
  margin: calc(0.25rem / 2);
}

.t-loading-enter-active,
.t-loading-enter {
  transition: all 0.1s ease;
}

.t-loading-leave-active {
  transition: all 0.1s ease;
}

.t-loading-leave-to {
  opacity: 0;
}

.t-loading-enter-from {
  opacity: 0;
}
</style>
