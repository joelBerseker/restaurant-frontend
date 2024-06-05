<script setup>
import { status } from "@/helpers";
import { inject, computed } from "vue";

const props = defineProps({
  mode: { default: null },
  statusValue: { default: null },
  elementText: { default: null },
});

const statusData = computed(() => {
  console.log(status.getAll(props.statusValue));
  return status.getAll(props.statusValue);
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
async function onStatus() {
  let statusConfirm = props.statusValue === 1 ? "deactivate" : "activate";
  let confirm = await confirmDialogue(statusConfirm, props.elementText);
  if (confirm) emit("onStatus");
}
async function onDelete() {
  let confirm = await confirmDialogue("delete", props.elementText);
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
        icon="fa-solid fa-trash-can"
        text="Eliminar"
        @click="onDelete()"
      />
      <g-button
        v-if="statusData !== null"
        type="transparent-1"
        :class="['status-button', statusData.color]"
        :icon="statusData.icon"
        :text="statusData.text"
        @click="onStatus()"
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
