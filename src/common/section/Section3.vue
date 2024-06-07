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
        <span v-if="refresh" class="title-refresh">
          <g-button
            type="transparent-1"
            icon="fa-solid fa-rotate-right"
            @click="onRefresh()"
            title="Recargar"
          />
        </span>
        <span v-if="collapse" class="title-collpase">
          <g-button
            type="transparent-1"
            icon="fa-solid fa-chevron-down"
            @click="buttonCollapse()"
            title="Recargar"
            class="btn-collapse"
            :class="{ collapseOpen }"
          />
        </span>
      </div>
      <div class="btns-title">
        <slot name="buttons"></slot>
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
.mbTitle {
  margin-bottom: 2rem;
}
.container-section {
  background-color: var(--color-w-v3);
  border-radius: var(--br-v2);
  padding: 1rem calc(31px + 0.25rem - 0.4rem);
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
}
.title-text div {
  font-weight: 500;
}
.title-text {
  font-size: 16px;

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
