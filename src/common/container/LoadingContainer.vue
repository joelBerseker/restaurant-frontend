<template>
  <div :class="['basic-table-container', containerClass]">
    <transition name="t-content" mode="out-in">
      <div v-show="loading" :class="['basic-loading', loadingClass]">
        <div class="loading-item">
          <span
            class="spinner-border spinner-border-sm spinner-content"
            role="status"
            aria-hidden="true"
          ></span>
        </div>
      </div>
    </transition>
    <slot></slot>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListContent",
  data() {
    return {
      loadingLocal: true,
    };
  },

  props: {
    loading: {},
    containerClass: {},
    loadingClass: {},
    onlyIcon: { default: false },
  },
  watch: {
    loading: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (!(oldValue == undefined && newValue == false)) {
          if (this.loading) {
            this.loadingLocal = this.loading;
          } else {
            setTimeout(() => {
              this.loadingLocal = this.loading;
            }, 0);
          }
        } else {
          this.loadingLocal = this.loading;
        }
      },
    },
  },
});
</script>
<style scoped>
.spinner-content {
  --bs-spinner-width: 1.2rem;
  --bs-spinner-height: 1.2rem;
  --bs-spinner-border-width: 0.2em;
  color: var(--g-wb700);
}
.loading-item {
  display: flex;
}
.basic-loading {
  position: absolute;
  z-index: 2000;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);

  display: flex;
  align-items: center;
  justify-content: center;
}
.basic-table-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: transparent !important;
  border-radius: var(--g-br1);
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
