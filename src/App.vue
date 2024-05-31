<script setup>
import Toast from "@/common/Toast.vue";
import ConfirmDialogue from "@/common/ConfirmDialogue.vue";
import { provide, ref } from "vue";

const confirmDialogueRef = ref(null);
async function confirmDialogue(type) {
  let confirm = await confirmDialogueRef.value.show(type);
  return confirm;
}
provide("confirmDialogue", confirmDialogue);
</script>
<template>
  <Toast />
  <ConfirmDialogue ref="confirmDialogueRef"></ConfirmDialogue>
  <RouterView />
</template>
