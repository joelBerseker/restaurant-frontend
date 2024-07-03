<script setup>
import { ref, reactive, onMounted, inject } from "vue";

const props = defineProps({
  name: { default: null },
});
</script>
<template>
  <RouterLink
    :to="{ name: name }"
    class="section-item"
    active-class="section-item-active"
    exact-active-class="disbled-click"
    v-slot="{ route }"
  >
    <div class="icon-section">
      <font-awesome-icon :icon="route.meta.icon" />
    </div>
    <div>{{ route.meta.title }}</div>
  </RouterLink>
</template>
<style scoped>
.section-item {
  background-color: var(--color-w);
  padding: 1.7rem 1.5rem;
  padding-top: calc(1.5rem + 3px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: var(--color-b-v2);
  border-radius: var(--br);
  font-size: 16px;
  transition: 0.3s;
  border-bottom: 3px solid rgb(75, 75, 75);
}

.icon-section {
  font-size: 20px;
}
.section-item:hover {
  border-color: var(--color-1-v3);
  color: var(--color-1-v3);
}
.section-item * {
  font-weight: 500;
}
</style>
