<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import StatisticComponent from "@/components/home/StatisticComponent.vue";
</script>
<template>
  <SystemContainer :loaded="true">
    <StatisticComponent></StatisticComponent>
  </SystemContainer>
</template>
