<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import HomeComponent from "@/components/home/HomeComponent.vue";
import { ref, inject } from "vue";
const setTopbar = inject("setTopbar");

const topbar = ref({
  breadcrumb: [],
});
async function init() {
  setTopbar(topbar.value);
}
init();
</script>
<template>
  <SystemContainer :loaded="true">
    <HomeComponent />
  </SystemContainer>
</template>
