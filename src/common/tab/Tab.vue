<script setup>
import { computed } from "vue";

const props = defineProps({
  tabs: { default: [] },
});
const activeTabs = computed(() => {
  let resp = [];
  props.tabs.forEach((element) => {
    if (element.disabled !== true) {
      resp.push(element);
    }
  });
  return resp;
});
</script>
<template>
  <div class="container-tabs">
    <RouterLink
      v-for="(element, index) in activeTabs"
      :key="index"
      :to="{ name: element.name }"
      class="tab-item"
      active-class="tab-item-active"
      exact-active-class="disbled-click"
      v-slot="{ route }"
    >
      <span class="text-tab-item">
        {{ route.meta.title_short ? route.meta.title_short : route.meta.title }}
      </span>
    </RouterLink>
  </div>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<style scoped>
.container-tabs {
  display: flex;
  border-bottom: 1px solid var(--color-border2);
  margin-bottom: 1.5rem;
  padding: 0 calc(31px + 0.25rem - 0.4rem);
  gap: 1.5rem;
}
.tab-item {
  text-decoration: none;

  padding-bottom: 0.5rem;

  color: var(--color-b-v2);
  position: relative;
  transition: 0.3s;
}
.tab-item > * {
  font-weight: 500;
}
.tab-item-active,
.tab-item:hover {
  color: var(--color-1-v3);
}
.tab-item::after {
  content: "";
  width: calc(100% + 4px);
  position: absolute;
  height: 3px;
  bottom: 0;
  left: -2px;
  border-radius: 999rem;
  transition: 0.3s;
}
.tab-item-active::after {
  background-color: var(--color-1-v3);
}
</style>
