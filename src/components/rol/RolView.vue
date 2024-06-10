<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import RolComponent from "@/components/rol/RolComponent.vue";
import { ref, inject, reactive } from "vue";
import router from "@/router";
const setTopbar = inject("setTopbar");

const topbar = ref({
  breadcrumb: [{ name: "home" }],
});
async function init() {
  setTopbar(topbar.value);
  console.log(router);
}
init();
</script>
<template>
  <SystemContainer v-slot="{ addPercentage }">
    <RolComponent @onFirstLoad="addPercentage(100)" />
  </SystemContainer>
</template>
