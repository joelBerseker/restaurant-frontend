<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import TicketElementComponent from "@/components/ticket/TicketElementComponent.vue";
import { ref, inject } from "vue";
const setTopbar = inject("setTopbar");

const topbar = ref({
  breadcrumb: [{ name: "home" }, { name: "ticketList" }],
});
async function init() {
  setTopbar(topbar.value);
}
init();
</script>
<template>
  <SystemContainer v-slot="{ addPercentage }">
    <TicketElementComponent @onFirstLoad="addPercentage(100)" />
  </SystemContainer>
</template>
