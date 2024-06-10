<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import TypeProductComponent from "@/components/typeProduct/TypeProductComponent.vue";
import { ref, inject, reactive } from "vue";
const setTopbar = inject("setTopbar");

const topbar = ref({
  name: "typeProduct",
  breadcrumb: [{ name: "home" }],
});
async function init() {
  setTopbar(topbar.value);
}
init();
</script>
<template>
  <SystemContainer v-slot="{ addPercentage }">
    <TypeProductComponent @onFirstLoad="addPercentage(100)" />
  </SystemContainer>
</template>
