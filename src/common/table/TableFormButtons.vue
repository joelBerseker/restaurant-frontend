<script setup>
import { status } from "@/helpers";
import { inject, computed } from "vue";

const props = defineProps({
  mode: { default: null },
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
    <span v-if="mode === 'add'">
      <g-button
        icon="fa-solid fa-diagram-next"
        text="Agregar"
        @click="onAdd()"
      />
    </span>
    <span v-else-if="mode === 'view'">
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
      <g-button
        type="transparent-1"
        icon="fa-solid fa-diagram-next"
        text="Agregar"
        @click="onAdd()"
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
