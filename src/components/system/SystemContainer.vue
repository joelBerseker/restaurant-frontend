<script setup></script>
<template>
  <div class="sys-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.sys-container {
  background-color: var(--color-w);
  height: 100%;
  box-shadow: -1px -5px 27px -7px rgba(0, 0, 0, 0.2);
  border-top-left-radius: var(--br-v2);
  border-top-right-radius: var(--br-v2);

  padding: var(--py-1);
}
</style>
