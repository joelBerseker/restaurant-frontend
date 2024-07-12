<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import CardMenuComponent from "@/components/cardMenu/CardMenuComponent.vue";
import { inject, ref } from "vue";
const setTopbar = inject("setTopbar");

const topbar = ref({
  breadcrumb: [{ name: "home" }, { name: "productManagementList" }],
});
async function init() {
  setTopbar(topbar.value);
}
init();
</script>
<template>
  <SystemContainer :loaded="true">
    <CardMenuComponent></CardMenuComponent>
  </SystemContainer>
</template>
