<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import { ref, inject } from "vue";
import TestComponent from "@/components/test/TestComponent.vue";
const setTopbar = inject("setTopbar");

const topbar = ref({
  current: { name: "test" },
  breadcrumb: [{ name: "home" }],
});
async function init() {
  setTopbar(topbar.value);
}
init();
</script>
<template>
  <SystemContainer :loaded="true">
    <TestComponent />
  </SystemContainer>
</template>
