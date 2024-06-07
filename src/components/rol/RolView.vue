<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import RolComponent from "@/components/rol/RolComponent.vue";
import { ref, inject, reactive } from "vue";
const setTopbar = inject("setTopbar");

const topbar = ref({
  name: "rol",
  breadcrumb: [{ name: "home" }],
});
async function init() {
  setTopbar(topbar.value);
}
init();
</script>
<template>
  <SystemContainer v-slot="{ addPercentage }">
    <RolComponent @onFirstLoad="addPercentage(100)" />
  </SystemContainer>
</template>
