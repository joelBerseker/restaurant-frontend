<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import UserElementComponent from "@/components/user/UserElementComponent.vue";
import { ref, inject } from "vue";
const setTopbar = inject("setTopbar");

const topbar = ref({
  name: "userAdd",
  breadcrumb: [{ name: "home" }, { name: "user" }],
});
async function init() {
  setTopbar(topbar.value);
}
init();
</script>
<template>
  <SystemContainer v-slot="{ addPercentage }">
    <UserElementComponent @onFirstLoad="addPercentage(100)" />
  </SystemContainer>
</template>
