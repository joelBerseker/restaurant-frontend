<script setup>
import { inject } from "vue";

const props = defineProps({
  mode: { default: null },
});
const confirmDialogue = inject("confirmDialogue");

const emit = defineEmits([
  "onAdd",
  "onStatus",
  "onDelete",
  "onEdit",
  "onSave",
  "onCancel",
]);

function onAdd() {
  emit("onAdd");
}
function onStatus() {
  emit("onStatus");
}
async function onDelete() {
  let confirm = await confirmDialogue("delete");
  if (confirm) emit("onDelete");
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
    <span v-if="mode === 'add'">
      <g-button icon="fa-solid fa-check" text="Guardar" @click="onAdd()" />
    </span>
    <span v-else-if="mode === 'view'">
      <g-button
        type="transparent-1"
        icon="fa-solid fa-print"
        text="Estado"
        @click="onStatus()"
      />
      <g-button
        type="transparent-1"
        icon="fa-solid fa-trash-can"
        text="Eliminar"
        @click="onDelete()"
      />
      <g-button
        icon="fa-solid fa-pen-to-square"
        text="Editar"
        @click="onEdit()"
      />
    </span>
    <span v-else>
      <g-button
        type="transparent-1"
        icon="fa-solid fa-xmark"
        text="Cancelar"
        @click="onCancel()"
      />
      <g-button icon="fa-solid fa-check" text="Guardar" @click="onSave()" />
    </span>
  </div>
</template>
<style scoped>
.buttons-container {
  display: flex;
}
</style>
