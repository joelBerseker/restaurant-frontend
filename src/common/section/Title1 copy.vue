<script setup>
import { ref, inject, onMounted, onUnmounted } from "vue";
import { navigationInfo, sleep } from "@/helpers";
import { faL } from "@fortawesome/free-solid-svg-icons";
const buttonBack = inject("buttonBack");
const emit = defineEmits(["buttonRefresh"]);
const props = defineProps({
  icon: {
    default: "bi bi-card-list",
  },
  title: {
    default: null,
  },
  name: {
    default: null,
  },
  refresh: {
    default: false,
  },
});
const sticking = ref(false);
const collapseRef = ref(null);
const collapseOpen = ref(false);
const statusBefStick = ref(false);

const titleRef = ref(null);

const observer = new IntersectionObserver(
  async ([entry]) => {
    let resp = !entry.isIntersecting;
    if (resp) {
      statusBefStick.value = collapseOpen.value;
      //await sleep(400);
      if (collapseOpen.value) {
        collapseOpen.value = false;
        collapseRef.value.closeCollapse();
      }
    } else {
      if (statusBefStick.value) {
        collapseOpen.value = statusBefStick.value;
        collapseRef.value.openCollapse();
      }
    }
    sticking.value = resp;
  },
  { threshold: 1 }
);

onMounted(() => {
  observer.observe(titleRef.value);
});
onUnmounted(() => {
  observer.disconnect();
});
function buttonRefresh() {
  emit("buttonRefresh");
}
function buttonCollapse() {
  collapseOpen.value = collapseRef.value.swichCollapse();
}
</script>
<template>
  <div class="title-main" ref="titleRef" :class="{ sticking, collapseOpen }">
    <div class="title-container">
      <div class="title-wrap">
        <span class="title-back">
          <g-button
            type="transparent-1"
            icon="fa-solid fa-arrow-left"
            @click="buttonBack()"
            title="Atras"
          />
        </span>
        <span class="title-text">
          {{ navigationInfo[name].title }}
          <div class="aditiona-text">25 Elementos</div>
        </span>
        <span v-if="refresh" class="title-refresh">
          <g-button
            type="transparent-1"
            icon="fa-solid fa-rotate-right"
            @click="buttonRefresh()"
            title="Recargar"
          />
        </span>
        <span class="title-collpase">
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
  </div>
  <div class="collapse-container">
    <g-collapse ref="collapseRef">
      <div class="pt-4">
        <slot name="collapse"></slot>
      </div>
    </g-collapse>
  </div>
</template>
<style scoped>
.aditiona-text {
  font-size: 13px;
  color: var(--color-b-v3);
}
.title-refresh {
  margin-left: 0.25rem;
}
.title-collapse {
  margin-left: 0.25rem;
}
.title-back {
  margin-left: -0.4rem;
}
.title-text {
  font-size: 20px;
  font-weight: 500;
  margin-left: 0.25rem;
  height: 100%;
  line-height: 1.3;
}
.title-wrap {
  display: flex;
}

.title-container {
  display: flex;
  justify-content: space-between;
}

.title-main {
  top: -1px;
  position: sticky;
  z-index: 11;
}
/*.title-main.sticking .collapse-container {
  position: absolute;
  width: 100%;
  left: 0;
  padding: 0 1rem;
  background-color: var(--color-w);
}*/
.title-main.sticking {
  /*padding: 1rem 1.25rem;*/

  background-color: var(--color-w);
  padding: 1rem var(--py-1);
  margin-left: calc(var(--py-1) * -1);
  margin-right: calc(var(--py-1) * -1);

  /*margin: 0 -1.25rem;*/
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
}
</style>
