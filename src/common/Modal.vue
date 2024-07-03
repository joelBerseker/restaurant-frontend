<script setup>
import { ref, onMounted, useSlots } from "vue";
import { Modal } from "bootstrap";

const props = defineProps({
  zIndex: { default: "5000" },
  scrollable: { default: true },
  titleModal: { default: "" },
  titleBeforeModal: { default: "" },
  subTitleModal: { default: "" },
  closeButton: { default: true },
  size: { default: "" },
  isLoading: { default: false },
  isFirstLoading: { default: false },
});
const slots = useSlots();
const emit = defineEmits(["modal:close", "onMountedModal"]);
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
  emit("onMountedModal");
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
            <div class="title-text">
              <div class="title-principal">
                {{ titleBeforeModal }}

                {{ titleModal }}
              </div>
              <div class="subTitle">{{ subTitleModal }}</div>
            </div>

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

        <main class="modal-body custom-scrollbar">
          <div class="first-loading" v-show="isFirstLoading && isLoading"></div>
          <slot></slot>
        </main>
        <div v-show="slots.footer === undefined" class="mt-2"></div>

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
<style scoped>
.first-loading {
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--color-w);
  height: 100%;
  width: 100%;
  z-index: 1;
}

.title-principal {
  font-size: 20px;
  font-weight: 500;
}
.title-text {
  line-height: 1.3;
}
.subTitle {
  font-size: 13px;
  color: var(--color-b-v3);
}
</style>
<style>
@media (min-width: 576px) {
  .modal-sm {
    --bs-modal-width: 400px;
  }
}
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
  z-index: 2;
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
  padding: 1rem 1.2rem;
}
.modal-header p,
.modal-header p span {
  font-weight: 500;
  font-size: 17px;
}
.modal-body {
  padding: 0.5rem 1.2rem;
  position: relative;
}
.modal-footer {
  border-top: none;
  padding: 1rem 1.2rem;
  margin: 0 !important;
}
.modal-backdrop {
  display: none !important;
}
.modal-footer > * {
  margin: 0rem;
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
