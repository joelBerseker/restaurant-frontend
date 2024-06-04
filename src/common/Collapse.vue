<script setup>
import { ref, onMounted } from "vue";
import { Collapse } from "bootstrap";

const collapseRef = ref(null);
const collapse = ref(null);
const status = ref(false);
const switching = ref(false);

function closeCollapse() {
  status.value = false;
  collapse.value.hide();
}
function openCollapse() {
  status.value = true;
  collapse.value.show();
}
function swichCollapse() {
  if (switching.value) return status.value;

  if (status.value) {
    closeCollapse();
  } else {
    openCollapse();
  }
  return status.value;
}
onMounted(() => {
  collapse.value = new Collapse(collapseRef.value, {
    toggle: false,
  });
});
defineExpose({
  closeCollapse,
  openCollapse,
  swichCollapse,
});
</script>
<template>
  <div class="collapse" ref="collapseRef">
    <slot></slot>
  </div>
</template>
