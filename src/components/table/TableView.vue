<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import TableComponent from "@/components/table/TableComponent.vue";
import { ref, inject, reactive } from "vue";
const setTopbar = inject("setTopbar");

const topbar = ref({
  breadcrumb: [{ name: "home" }, { name: "tableManagementList" }],
});
async function init() {
  setTopbar(topbar.value);
}
init();
</script>
<template>
  <SystemContainer v-slot="{ addPercentage }">
    <TableComponent @onFirstLoad="addPercentage(100)" />
  </SystemContainer>
</template>
