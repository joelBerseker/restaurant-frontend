<script setup>
import { ref, reactive, onMounted, inject } from "vue";
import StatisticComponent from "@/components/home/StatisticComponent.vue";
import { getTodayDayFormated } from "@/helpers";
const today = ref(new Date());
</script>
<template>
  <g-section-1 :subTitle="getTodayDayFormated()" :backButton="false">
    <template #content>
      <StatisticComponent />
    </template>
  </g-section-1>
</template>
