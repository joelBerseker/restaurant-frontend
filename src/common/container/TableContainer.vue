<template>
  <div
    :class="[
      'table-container',
      tableContainerClass,
      isLoading ? 'loading' : '',
    ]"
  >
    <transition name="t-content" mode="out-in">
      <div v-show="isLoading" class="table-loading">
        <span
          class="spinner-border spinner-border-sm spinner-content"
          role="status"
          aria-hidden="true"
        >
        </span>
      </div>
    </transition>
    <div v-show="rowsLength > 0" class="table-wrapper">
      <slot></slot>
    </div>
    <div v-show="border" class="border-container"></div>
    <div class="empty-container" v-show="rowsLength <= 0">
      <div class="empty-text">
        No se encontraron registros.
        <div class="icon-empty">
          <font-awesome-icon icon="fa-regular fa-face-frown-open" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  isLoading: { default: false },
  tableContainerClass: { default: "" },
  rowsLength: { default: 0 },
  border: { default: false },
});
</script>

<style scoped>
.border-container {
  border-radius: inherit;
  border: 1px solid var(--color-border2);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.loading .empty-text {
  opacity: 0;
}
.icon-empty {
  font-size: 20px;
}
.empty-container {
  background-color: var(--color-c1);
  padding: 1rem 0;
  text-align: center;
  width: 100%;
}
.empty-text {
  text-align: center;
  transition: 0.3s;
}
.loading {
  overflow-x: hidden !important;
}
.spinner-content {
  --bs-spinner-width: 1.2rem;
  --bs-spinner-height: 1.2rem;
  --bs-spinner-border-width: 0.2em;
  color: var(--color-2);
}
.table-loading {
  position: absolute;
  z-index: 2000;
  top: 0;
  left: auto;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);

  display: flex;
  padding: 1rem;
  justify-content: center;
}
.table-wrapper {
  width: 100%;
  position: relative;
  overflow-x: auto;
  overflow-y: auto;
  border-radius: var(--g-br1);
}
.table-container {
  position: relative;
  overflow-x: hidden;
  background-color: transparent !important;
  border-radius: var(--br);
}

.t-content-enter-active,
.t-content-enter {
  transition: all 0.1s ease;
}
.t-content-leave-active {
  transition: all 0.1s ease;
}
.t-content-leave-to {
  opacity: 0;
}
.t-content-enter-from {
  opacity: 0;
}
</style>
