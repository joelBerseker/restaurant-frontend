<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import ProductComponent from "@/components/product/ProductComponent.vue";
import { ref, inject, reactive } from "vue";
const setTopbar = inject("setTopbar");

const topbar = ref({
  breadcrumb: [{ name: "home" }, { name: "productManagementList" }],
});
async function init() {
  setTopbar(topbar.value);
}
init();
</script>
<template>
  <SystemContainer v-slot="{ addPercentage }">
    <ProductComponent @onFirstLoad="addPercentage(100)" />
  </SystemContainer>
</template>
