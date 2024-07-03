<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import MenuElementComponent from "@/components/menu/MenuElementComponent.vue";
import { ref, inject } from "vue";
const setTopbar = inject("setTopbar");

const topbar = ref({
  breadcrumb: [
    { name: "home" },
    { name: "productManagementList" },
    { name: "menuList" },
  ],
});
async function init() {
  setTopbar(topbar.value);
}
init();
</script>
<template>
  <SystemContainer v-slot="{ addPercentage }">
    <MenuElementComponent @onFirstLoad="addPercentage(100)" />
  </SystemContainer>
</template>
