<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import UserElementComponent from "@/components/user/UserElementComponent.vue";
import { ref, inject, provide } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const setTopbar = inject("setTopbar");

const idElement = ref(null);

const topbar = ref({
  name: "userDetail",
  breadcrumb: [{ name: "home" }, { name: "user" }],
});
async function init() {
  idElement.value = route.params.id;
  setTopbar(topbar.value);
}
init();
provide("idElement", idElement.value);
</script>
<template>
  <SystemContainer> <UserElementComponent /> </SystemContainer>
</template>
