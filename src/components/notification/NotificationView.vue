<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import NotificationComponent from "@/components/notification/NotificationComponent.vue";

import { ref, inject } from "vue";
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
  <SystemContainer :loaded="true">
    <NotificationComponent />
  </SystemContainer>
</template>
