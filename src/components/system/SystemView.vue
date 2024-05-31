<script setup>
import SystemComponent from "@/components/system/SystemComponent.vue";
import { useSystemUtilStore } from "@/stores";

const useSystemUtil = useSystemUtilStore();
function init() {
  useSystemUtil.isLoadingApp(false);
}
init();
</script>
<template>
  <SystemComponent />
</template>

<style scoped></style>
