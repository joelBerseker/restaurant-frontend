<script setup>
import { ref, onMounted } from "vue";
import { Collapse } from "bootstrap";

const props = defineProps({
  startOpen: { default: false },
});

const collapseRef = ref(null);
const collapse = ref(null);
const status = ref(props.startOpen);
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
  <div class="collapse" :class="startOpen ? 'show' : ''" ref="collapseRef">
    <slot></slot>
  </div>
</template>
