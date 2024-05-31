<script setup>
import Toast from "@/common/Toast.vue";
import ConfirmDialogue from "@/common/ConfirmDialogue.vue";
import { provide, ref } from "vue";

const confirmDialogueRef = ref(null);
async function confirmDialogue(type) {
  var resp = false;
  await confirmDialogueRef.value.show(type).then((result) => {
    resp = result;
  });
  return resp;
}
provide("confirmDialogue", confirmDialogue);
</script>
<template>
  <Toast />
  <ConfirmDialogue ref="confirmDialogueRef"></ConfirmDialogue>
  <RouterView />
</template>
