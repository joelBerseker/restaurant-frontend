<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import UserComponent from "@/components/user/UserComponent.vue";
import { ref, inject, reactive } from "vue";
const setTopbar = inject("setTopbar");

const topbar = ref({
  breadcrumb: [{ name: "home" }, { name: "userManagementList" }],
});
async function init() {
  setTopbar(topbar.value);
}
init();
</script>
<template>
  <SystemContainer v-slot="{ addPercentage }">
    <UserComponent @onFirstLoad="addPercentage(100)" />
  </SystemContainer>
</template>
