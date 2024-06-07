<script setup>
import { watch, computed, ref } from "vue";
import { useSystemUtilStore } from "@/stores/";

const useSystemUtil = useSystemUtilStore();
const props = defineProps({
  classContent: { default: "" },
  loaded: { default: false },
});

const emit = defineEmits(["loaded", "isLoading"]);

const loadingPercentage = ref(0);
function addPercentage(_percentage) {
  loadingPercentage.value += _percentage;
  console.log(loadingPercentage.value);
}
const loadingLocal = computed(() => {
  if (loadingPercentage.value >= 100) {
    return false;
  } else {
    return true;
  }
});

watch(loadingLocal, async (_new, _old) => {
  if (!_new) {
    // emit("loaded");
    useSystemUtil.isLoadingContentSystem(false);
    console.log("cargo");
  }
});
function init() {
  if (props.loaded) {
    addPercentage(100);
  }
}
init();

const showScreenLoading = computed(() => {
  if (loadingLocal.value || useSystemUtil.loadingContentSystem) return true;
  return false;
});
defineExpose({
  addPercentage,
});
</script>
<template>
  <div
    :class="[
      'sys-container',
      classContent,
      showScreenLoading ? 'loading-size' : '',
    ]"
  >
    <div class="sys-wrapper">
      <transition name="t-content" mode="out-in">
        <div v-show="showScreenLoading" class="loading-container">
          <div class="">
            <div
              class="spinner-border spinner-border-sm spinner-content"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </transition>
      <div class="thss">
        <slot :addPercentage="addPercentage"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-size .thss {
  height: 0;
  overflow: hidden;
}
.spinner-content {
  --bs-spinner-width: 1.2rem;
  --bs-spinner-height: 1.2rem;
  --bs-spinner-border-width: 0.2em;
  color: var(--color-b-v3);
}
.loading-size {
  overflow: hidden;
}
.sys-container {
  background-color: var(--color-w);
  height: 100%;
  box-shadow: -1px -5px 27px -7px rgba(0, 0, 0, 0.2);
  border-top-left-radius: var(--br-v2);
  border-top-right-radius: var(--br-v2);
}
.sys-wrapper {
  padding: var(--py-1);
  position: relative;
}
.loading-container {
  background-color: var(--color-w);
  padding: 2rem;
  position: absolute;
  width: 100%;
  z-index: 4000;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: var(--g-br1);

  height: 100%;
  display: flex;

  justify-content: center;
}
.t-content-enter-active,
.t-content-enter {
  transition: all 0.15s ease;
}
.t-content-leave-active {
  transition: all 0.15s ease;
}

.t-content-leave-to {
  opacity: 0;
}
.t-content-enter-from {
  opacity: 0;
}
</style>
