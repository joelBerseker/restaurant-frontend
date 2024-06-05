<script setup>
import Toast from "@/common/Toast.vue";
import ConfirmDialogue from "@/common/ConfirmDialogue.vue";
import AppContainer from "@/common/container/AppContainer.vue";

import { provide, ref } from "vue";

const confirmDialogueRef = ref(null);
async function confirmDialogue(type, _importantText = null) {
  let confirm = await confirmDialogueRef.value.show(type, _importantText);
  return confirm;
}
provide("confirmDialogue", confirmDialogue);
</script>
<template>
  <Toast />
  <ConfirmDialogue ref="confirmDialogueRef"></ConfirmDialogue>
  <AppContainer>
    <RouterView />
  </AppContainer>
</template>
