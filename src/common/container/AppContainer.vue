<script setup>
import { computed } from "vue";
import { useSystemUtilStore } from "@/stores";
const useSystemUtil = useSystemUtilStore();
const showLoadingScreen = computed(() => {
  return useSystemUtil.loadingApp;
});
const messageLoadingScreen = computed(() => {
  return useSystemUtil.loadingAppMessage;
});
</script>
<template>
  <div :class="[showLoadingScreen ? 'loading-height' : '']">
    <transition name="t-content" mode="out-in">
      <div v-show="showLoadingScreen" class="loading-container">
        <div class="loading-background-color center flex-column">
          <img
            src="@/assets/imgs/logo-app.jpg"
            alt="app logo"
            class="auth-icon"
          />
          <div class="text-container">
            <div class="spinner-border spinner-border-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            &nbsp;{{ messageLoadingScreen }}
          </div>
        </div>
      </div>
    </transition>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.loading-height {
  max-height: 100vh;
}
.auth-icon {
  width: 100%;
  max-width: 90px;

  margin-bottom: 1.5rem;
  border-radius: 2rem;
}
.text-container {
  display: flex;
  align-items: center;
}
.loading-container {
  position: absolute;

  width: 100%;
  z-index: 20000;
  height: 100%;
  background-image: url("@/assets/imgs/login2.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  color: var(--color-w);
  font-size: 16px;
}
.loading-background-color {
  background: rgba(0, 0, 0, 0.6);
}
.center {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.t-content-enter-active,
.t-content-enter {
  transition: all 0.5s ease;
}

.t-content-leave-active {
  transition: all 0.5s ease;
}

.t-content-leave-to {
  opacity: 0;
}

.t-content-enter-from {
  opacity: 0;
}
</style>
