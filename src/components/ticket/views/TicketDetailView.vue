<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import TicketElementComponent from "@/components/ticket/TicketElementComponent.vue";
import { ref, inject, provide } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const setTopbar = inject("setTopbar");

const idElement = ref(null);

const topbar = ref({
  breadcrumb: [{ name: "home" }, { name: "ticketList" }],
});
async function init() {
  idElement.value = route.params.id;
  setTopbar(topbar.value);
}
init();
provide("idElement", idElement.value);
</script>
<template>
  <SystemContainer v-slot="{ addPercentage }">
    <TicketElementComponent @onFirstLoad="addPercentage(100)" />
  </SystemContainer>
</template>
