<script setup>
import SystemSidebar from "@/components/system/SystemSidebar.vue";
import SystemTopbar from "@/components/system/SystemTopbar.vue";

import SystemLayout from "@/components/system/SystemLayout.vue";
</script>
<template>
  <SystemLayout>
    <template #sidebar>
      <SystemSidebar ref="sidebar" />
    </template>
    <template #topbar>
      <SystemTopbar ref="topbar" />
    </template>
    <router-view />
  </SystemLayout>
</template>

<style scoped></style>
