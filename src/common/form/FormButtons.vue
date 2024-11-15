<script setup>
import { status } from "@/helpers";
import { inject, computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useToastStore } from "@/stores";
const useToast = useToastStore();
const userStore = useUserStore();

const props = defineProps({
  mode: { default: null },
  statusValue: { default: null },
  elementText: { default: null },
  showDelete: { default: true },
  showEdit: { default: true },
  showPrint: { default: false },
  showStatus: { default: true },
  showAdd: { default: true },
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
  if (!userStore.getModulePermise.create) {
    useToast.show("permission_button_error");
    return;
  }
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
  if (!userStore.getModulePermise.update) {
    useToast.show("permission_button_error");
    return;
  }
  emit("onEdit");
}
function onCancel() {
  if (!userStore.getModulePermise.update) {
    useToast.show("permission_button_error");
    return;
  }
  emit("onCancel");
}
function onSave() {
  if (!userStore.getModulePermise.update) {
    useToast.show("permission_button_error");
    return;
  }
  emit("onSave");
}
function onPrint() {
  if (!userStore.getModulePermise.print) {
    useToast.show("permission_button_error");
    return;
  }
  emit("onPrint");
}
const showAddLocal = computed(() => {
  if (!props.showAdd) return false;
  return userStore.getModulePermise.create;
});
const showEditLocal = computed(() => {
  if (!props.showEdit) return false;
  return userStore.getModulePermise.update;
});
const showDeleteLocal = computed(() => {
  if (!props.showDelete) return false;
  return userStore.getModulePermise.delete;
});
const showStatusLocal = computed(() => {
  if (!props.showStatus) return false;

  return userStore.getModulePermise.active;
});
const showPrintLocal = computed(() => {
  if (!props.showPrint) return false;
  return userStore.getModulePermise.print;
});
</script>
<template>
  <div class="buttons-container">
    <span v-if="mode === 'add'" class="buttons-container">
      <g-button
        icon="fa-solid fa-check"
        text="Guardar"
        @click="onAdd()"
        v-if="showAddLocal"
      />
    </span>
    <span v-else-if="mode === 'view' || !showEdit" class="buttons-container">
      <g-button
        type="transparent-1"
        icon="fa-solid fa-print"
        text="Imprimir"
        @click="onPrint()"
        :separationLine="true"
        v-if="showPrintLocal"
      />
      <g-button
        class="delete-button"
        type="transparent-1"
        icon="fa-solid fa-trash-can"
        text="Eliminar"
        @click="onDelete()"
        :separationLine="true"
        v-if="showDeleteLocal"
      />
      <g-button
        class="status-button"
        v-if="statusData !== null && showStatusLocal"
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
        v-if="showEditLocal"
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
