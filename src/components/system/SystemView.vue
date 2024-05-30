<template>
  <main>SYSTEM</main>
</template>
<script setup>
import { userService } from "@/services";
import { useUserStore } from "@/stores/";
let data = userService.getListUser([]);
console.log(data);
</script>
<style scoped></style>
