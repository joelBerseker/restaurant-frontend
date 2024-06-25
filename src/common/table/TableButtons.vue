<script setup>
const props = defineProps({
  switchSearchValue: { default: false },
});
const emit = defineEmits(["onSearch", "onPrint", "onAdd"]);

function search() {
  emit("onSearch");
}
function print() {
  emit("onPrint");
}
function add() {
  emit("onAdd");
}
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
      type="transparent-1"
      icon="fa-solid fa-print"
      text="Imprimir"
      @click="print()"
    />
    <g-button icon="fa-solid fa-plus" text="Agregar" @click="add()" />
  </div>
</template>
<style scoped>
.buttons-container {
  display: flex;
}
</style>
