<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import ProductManagementListComponent from "@/components/section/ProductManagementListComponent.vue";
</script>
<template>
  <SystemContainer :loaded="true">
    <ProductManagementListComponent />
  </SystemContainer>
</template>
