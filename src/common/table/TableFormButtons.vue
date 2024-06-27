<script setup>
import { status } from "@/helpers";
import { inject, computed } from "vue";

const props = defineProps({
  mode: { default: null },
  disabledAdd: { default: false },
});

const emit = defineEmits(["onAdd", "onEdit", "onSave", "onCancel"]);

function onAdd() {
  emit("onAdd");
}

function onEdit() {
  emit("onEdit");
}
function onCancel() {
  emit("onCancel");
}
function onSave() {
  emit("onSave");
}
</script>
<template>
  <div class="buttons-container">
    <g-button
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
