<script setup>
import { status } from "@/helpers";
import { inject, computed } from "vue";
import { useToastStore } from "@/stores";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();

const useToast = useToastStore();

const props = defineProps({
  mode: { default: null },
  disabledAdd: { default: false },
});

function confirmPermises() {
  if (props.mode === "add" && !userStore.getModulePermise.create) {
    return false;
  }
  if (props.mode !== "add" && !userStore.getModulePermise.update) {
    return false;
  }
  return true;
}

const emit = defineEmits(["onAdd"]);

function onAdd() {
  if (!confirmPermises()) {
    useToast.show("permission_button_error");
    return;
  }
  emit("onAdd");
}
const showAddLocal = computed(() => {
  return confirmPermises();
});
</script>
<template>
  <div class="buttons-container">
    <g-button
      v-if="showAddLocal"
      icon="fa-solid fa-diagram-next"
      text="Agregar"
      @click="onAdd()"
      type="search"
      :disabled="disabledAdd"
    />
  </div>
</template>
<style scoped>
.buttons-container {
  display: flex;
}
</style>
