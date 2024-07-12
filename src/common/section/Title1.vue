<script setup>
import { ref, inject, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["onRefresh"]);
const props = defineProps({
  title: {
    default: null,
  },
  subTitle: {
    default: null,
  },
  name: {
    default: null,
  },
  refresh: {
    default: false,
  },
  collapse: {
    default: false,
  },
  contentClass: {
    default: "",
  },
  mbTitle: {
    default: true,
  },
  topLine: {
    default: true,
  },
});
const sticking = ref(false);
const collapseRef = ref(null);
const collapseOpen = ref(false);

const titleRef = ref(null);

function onRefresh() {
  emit("onRefresh");
}
function buttonCollapse() {
  collapseOpen.value = collapseRef.value.swichCollapse();
}
</script>
<template>
  <div :class="{ mbTitle }" class="container-section">
    <div class="title-container" ref="titleRef" :class="{ sticking }">
      <div class="title-wrap">
        <span class="title-text">
          <div>
            {{ title }}
            <div class="subTitle">{{ subTitle }}</div>
          </div>
        </span>
      </div>
      <div class="line-right-container">
        <div class="line-right"></div>
      </div>
    </div>

    <div class="content-container">
      <div :class="[contentClass]">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-right-container {
  width: 100%;
  display: flex;
  align-items: center;
}
.line-right {
  height: 1px;
  width: 100%;

  background-color: var(--color-border);
  margin-left: 0.5rem;
}
.mbTitle {
  margin-bottom: 1.5rem;
}
.container-section {
}
.content-container {
  margin-top: 1rem;
}
.subTitle {
  font-size: 13px;
  color: var(--color-b-v3);
}
.title-refresh {
  margin-left: 0.25rem;
}
.title-collapse {
  margin-left: 0.25rem;
}
.title-icon {
  width: calc(31px + 0.25rem - 0.4rem);
  color: var(--color-1-v3);
}
.title-text div {
  font-weight: 500;
}
.title-text {
  font-size: 14px;
  color: var(--color-b-v3);
  height: 100%;
  line-height: 1.3;
  display: flex;
  align-items: center;
}
.title-wrap {
  display: flex;
}
.title-container {
  display: flex;
  justify-content: space-between;
}
</style>
