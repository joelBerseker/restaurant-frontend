<script setup>
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
      title="Recargar"
    />
    <g-button
      type="transparent-1"
      icon="fa-solid fa-print"
      text="Imprimir"
      @click="print()"
      title="Recargar"
    />
    <g-button
      icon="fa-solid fa-plus"
      text="Agregar"
      @click="add()"
      title="Recargar"
    />
  </div>
</template>
<style scoped>
.buttons-container {
  display: flex;
}
</style>
