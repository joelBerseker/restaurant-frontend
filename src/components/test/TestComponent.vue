<script setup>
import { ref, reactive, onMounted, inject, computed } from "vue";
import Tab from "@/common/tab/Tab.vue";
const tabs = reactive([{ name: "testReview" }, { name: "testGenerate" }]);
</script>
<template>
  <g-section-1 title="test" subTitle="v1.10">
    <template #content>
      <Tab :tabs="tabs"></Tab>
    </template>
  </g-section-1>
</template>
