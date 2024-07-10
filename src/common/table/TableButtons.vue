<script setup>
import { useUserStore } from "@/stores/userStore";
import { computed } from "vue";
import { useToastStore } from "@/stores";
const useToast = useToastStore();
const userStore = useUserStore();

const props = defineProps({
  switchSearchValue: { default: false },
  showAdd: { default: true },
  showDownload: { default: true },
});

const emit = defineEmits(["onSearch", "onPrint", "onAdd"]);

function search() {
  emit("onSearch");
}
function print() {
  if (!userStore.getModulePermise.export) {
    useToast.show("permission_button_error");
    return;
  }
  emit("onPrint");
}
function add() {
  if (!userStore.getModulePermise.create) {
    useToast.show("permission_button_error");
    return;
  }
  emit("onAdd");
}
const showAddLocal = computed(() => {
  if (!props.showAdd) return false;
  return userStore.getModulePermise.create;
});
const showDownloadLocal = computed(() => {
  if (!props.showDownload) return false;
  return userStore.getModulePermise.export;
});
</script>
<template>
  <div class="buttons-container">
    <g-button
      type="transparent-1"
      icon="fa-solid fa-magnifying-glass"
      text="Buscar"
      @click="search()"
      :collapse="switchSearchValue"
      :separationLine="true"
    />
    <g-button
      v-if="showDownloadLocal"
      type="transparent-1"
      icon="fa-solid fa-download"
      text="Descargar"
      @click="print()"
    />
    <g-button
      v-if="showAddLocal"
      icon="fa-solid fa-plus"
      text="Agregar"
      @click="add()"
    />
  </div>
</template>
<style scoped>
.buttons-container {
  display: flex;
}
</style>
