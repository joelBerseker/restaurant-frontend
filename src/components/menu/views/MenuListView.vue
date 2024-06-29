<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import MenuComponent from "@/components/menu/MenuComponent.vue";
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
    <MenuComponent @onFirstLoad="addPercentage(100)" />
  </SystemContainer>
</template>
