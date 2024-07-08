<script setup>
import { status } from "@/helpers";
import { inject, computed } from "vue";

const props = defineProps({
  mode: { default: null },
  statusValue: { default: null },
  elementText: { default: null },
  showDelete: { default: true },
  showEdit: { default: true },
  showPrint: { default: false },
  showStatus: { default: true },
});

const statusData = computed(() => {
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
  "onPrint",
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
function onPrint() {
  emit("onPrint");
}
</script>
<template>
  <div class="buttons-container">
    <span v-if="mode === 'add'" class="buttons-container">
      <g-button icon="fa-solid fa-check" text="Guardar" @click="onAdd()" />
    </span>
    <span v-else-if="mode === 'view' || !showEdit" class="buttons-container">
      <g-button
        type="transparent-1"
        icon="fa-solid fa-print"
        text="Imprimir"
        @click="onPrint()"
        :separationLine="true"
        v-if="showPrint"
      />
      <g-button
        class="delete-button"
        type="transparent-1"
        icon="fa-solid fa-trash-can"
        text="Eliminar"
        @click="onDelete()"
        :separationLine="true"
        v-if="showDelete"
      />
      <g-button
        class="status-button"
        v-if="statusData !== null && showStatus"
        type="transparent-1"
        :class="['status-button', statusData.color]"
        :icon="statusData.icon"
        :text="statusData.text"
        @click="onStatus()"
      />
      <g-button
        class="edit-button"
        icon="fa-solid fa-pen-to-square"
        text="Editar"
        @click="onEdit()"
        v-if="showEdit"
      />
    </span>
    <span v-else class="buttons-container">
      <g-button
        class="cancel-button"
        type="transparent-1"
        icon="fa-solid fa-xmark"
        text="Cancelar"
        @click="onCancel()"
      />
      <g-button
        class="save-button"
        icon="fa-solid fa-check"
        text="Guardar"
        @click="onSave()"
      />
    </span>
  </div>
</template>
<style scoped>
.buttons-container {
  display: flex;
}

.start-left .cancel-button {
  order: 2;
}
.start-left .save-button {
  order: 1;
}
</style>
