<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import CompanyElementComponent from "@/components/company/CompanyElementComponent.vue";
import { ref, inject, provide } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores";
const userStore = useUserStore();

const route = useRoute();
const setTopbar = inject("setTopbar");

const idElement = ref(null);

const topbar = ref({
  breadcrumb: [{ name: "home" }],
});
async function init() {
  idElement.value = userStore.getCompany().id;

  setTopbar(topbar.value);
}
init();
provide("idElement", idElement.value);
</script>
<template>
  <SystemContainer v-slot="{ addPercentage }">
    <CompanyElementComponent @onFirstLoad="addPercentage(100)" />
  </SystemContainer>
</template>
