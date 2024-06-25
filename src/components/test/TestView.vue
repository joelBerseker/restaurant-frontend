<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import { ref } from "vue";
import TestComponent from "@/components/test/TestComponent.vue";
</script>
<template>
  <SystemContainer :loaded="true">
    <TestComponent />
  </SystemContainer>
</template>
