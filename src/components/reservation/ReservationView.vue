<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import ReservationComponent from "@/components/reservation/ReservationComponent.vue";
import { ref, inject, reactive } from "vue";
const setTopbar = inject("setTopbar");

const topbar = ref({
  breadcrumb: [{ name: "home" }, { name: "tableManagementList" }],
});
async function init() {
  setTopbar(topbar.value);
}
init();
</script>
<template>
  <SystemContainer v-slot="{ addPercentage }">
    <ReservationComponent @onFirstLoad="addPercentage(100)" />
  </SystemContainer>
</template>
