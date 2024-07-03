<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import ProductManagementListComponent from "@/components/section/ProductManagementListComponent.vue";
import { inject, ref } from "vue";

const setTopbar = inject("setTopbar");

const topbar = ref({
  breadcrumb: [{ name: "home" }],
});
async function init() {
  setTopbar(topbar.value);
}
init();
</script>
<template>
  <SystemContainer :loaded="true">
    <ProductManagementListComponent />
  </SystemContainer>
</template>
