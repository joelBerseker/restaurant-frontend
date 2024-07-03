<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import UserManagementListComponent from "@/components/section/UserManagementListComponent.vue";
import { inject, ref } from "vue";

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
    <UserManagementListComponent />
  </SystemContainer>
</template>
