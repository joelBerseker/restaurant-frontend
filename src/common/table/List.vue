<script setup>
import { useSlots, ref, computed } from "vue";
import TableContainer from "@/common/container/TableContainer.vue";

const props = defineProps({
  rows: { default: [] },
  tableContainerClass: { default: "g-table-container" },
  isLoading: { default: false },
  listClass: { default: null },
  elementClass: { default: null },
});
const emit = defineEmits(["rowClicked"]);

function rowClicked(row, index) {
  emit("rowClicked", row, index);
}
</script>
<template>
  <table-container
    :isLoading="isLoading"
    :tableContainerClass="tableContainerClass"
    :rowsLength="rows.length"
  >
    <div :class="['w-100', listClass]">
      <div v-for="(row, index) in rows" :key="index" :class="[elementClass]">
        <slot name="element" :row="row" :index="index"></slot>
      </div>
    </div>
  </table-container>
</template>
