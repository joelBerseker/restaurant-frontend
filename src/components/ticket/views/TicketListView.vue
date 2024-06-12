<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import TicketComponent from "@/components/ticket/TicketComponent.vue";
import { ref, inject, reactive } from "vue";
const setTopbar = inject("setTopbar");

const topbar = ref({
  breadcrumb: [{ name: "home" }],
});
async function init() {
  setTopbar(topbar.value);
}
init();
</script>
<template>
  <SystemContainer v-slot="{ addPercentage }">
    <TicketComponent @onFirstLoad="addPercentage(100)" />
  </SystemContainer>
</template>
