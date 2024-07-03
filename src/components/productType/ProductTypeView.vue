<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import ProductTypeComponent from "@/components/productType/ProductTypeComponent.vue";
import { ref, inject, reactive } from "vue";
const setTopbar = inject("setTopbar");

const topbar = ref({
  name: "productType",
  breadcrumb: [{ name: "home" }, { name: "productManagementList" }],
});
async function init() {
  setTopbar(topbar.value);
}
init();
</script>
<template>
  <SystemContainer v-slot="{ addPercentage }">
    <ProductTypeComponent @onFirstLoad="addPercentage(100)" />
  </SystemContainer>
</template>
