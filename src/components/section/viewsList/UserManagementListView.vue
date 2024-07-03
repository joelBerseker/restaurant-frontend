<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import UserManagementListComponent from "@/components/section/UserManagementListComponent.vue";
</script>
<template>
  <SystemContainer :loaded="true">
    <UserManagementListComponent />
  </SystemContainer>
</template>
