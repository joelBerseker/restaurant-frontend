<script setup>
import { ref } from "vue";

const emit = defineEmits(["click"]);
function click() {
  emit("click");
}
</script>
<template>
  <div class="close-button" @click="click()">
    <font-awesome-icon icon="fa-solid fa-xmark" />
  </div>
</template>
<style scoped>
.close-button {
  background-color: rgba(138, 138, 138, 0.411);
  border-radius: 999rem;
  position: relative;
  height: 1.2rem;
  width: 1.2rem;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-w-v2);
  font-size: 10px;
}
.close-button:hover {
  background-color: var(--color-b-v3);
}
</style>
