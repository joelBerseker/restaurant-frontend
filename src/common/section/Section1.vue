<script setup>
import { ref, inject, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const buttonBack = inject("buttonBack");
const emit = defineEmits(["onRefresh"]);
const props = defineProps({
  icon: {
    default: "bi bi-card-list",
  },
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
});
const sticking = ref(false);
const collapseRef = ref(null);
const collapseOpen = ref(false);
const statusBefStick = ref(false);

const titleRef = ref(null);

const currentRoute = router.currentRoute.value.meta;

/*
const observer = new IntersectionObserver(
  async ([entry]) => {
    sticking.value = !entry.isIntersecting;
  },
  { threshold: 1 }
);

onMounted(() => {
  observer.observe(titleRef.value);
});
onUnmounted(() => {
  observer.disconnect();
});*/
function onRefresh() {
  emit("onRefresh");
}
function buttonCollapse() {
  collapseOpen.value = collapseRef.value.swichCollapse();
}
</script>
<template>
  <div class="title-container" ref="titleRef" :class="{ sticking }">
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
        <div>
          {{ currentRoute.title }}
          <div class="subTitle">{{ props.subTitle }}</div>
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
    <slot name="content"></slot>
  </div>
</template>
<style scoped>
.content-container {
  margin-top: 1.5rem;
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
.title-back {
  margin-left: -0.4rem;
}
.title-text div {
  font-weight: 500;
}
.title-text {
  font-size: 20px;
  margin-left: 0.25rem;
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
  top: -1px;
  /*position: sticky;*/
  z-index: 11;
}
.title-container.sticking {
  background-color: var(--color-w);
  padding: 1rem var(--py-1);
  margin-left: calc(var(--py-1) * -1);
  margin-right: calc(var(--py-1) * -1);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
}
</style>
