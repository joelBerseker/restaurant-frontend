<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import TableManagementListComponent from "@/components/section/TableManagementListComponent.vue";
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
    <TableManagementListComponent />
  </SystemContainer>
</template>
