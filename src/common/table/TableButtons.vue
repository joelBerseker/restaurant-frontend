<script setup></script>
<template>
  <div class="buttons-container">
    <g-button
      type="transparent-1"
      icon="fa-solid fa-magnifying-glass"
      text="Buscar"
      @click="buttonRefresh()"
      title="Recargar"
    />
    <g-button
      type="transparent-1"
      icon="fa-solid fa-print"
      text="Imprimir"
      @click="buttonRefresh()"
      title="Recargar"
    />
    <g-button
      icon="fa-solid fa-plus"
      text="Agregar"
      @click="buttonRefresh()"
      title="Recargar"
    />
  </div>
</template>
<style scoped>
.buttons-container {
  display: flex;
}
</style>
