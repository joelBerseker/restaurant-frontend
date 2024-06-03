<script setup>
import Table from "@/common/table/Table.vue";
import Filter from "@/common/filter/Filter.vue";

import { ref } from "vue";

const props = defineProps({
  columns: { default: [] },
  filter: { default: {} },
});
const localColumns = ref([]);
const filterRef = ref(null);
const rows = ref([
  { id: "adasdasd" },
  { id: "adasdasd" },
  { id: "adasdasd" },
  { id: "adasdasd" },
  { id: "adasdasd" },
  { id: "adasdasd" },
  { id: "adasdasd" },
  { id: "adasdasd" },
  { id: "adasdasd" },
  { id: "adasdasd" },
  { id: "adasdasd" },
  { id: "adasdasd" },
  { id: "adasdasd" },
  { id: "adasdasd" },
  { id: "adasdasd" },
  { id: "adasdasd" },
  { id: "adasdasd" },
  { id: "adasdasd" },
  { id: "adasdasd" },
]);
function fillRows() {
  rows.value = [];
  for (let i = 0; i < 30; i++) {
    rows.value.push({ id: i, name: "asdadasda" });
  }
}
const isLoading = ref(false);
function sort(_data) {
  filterRef.value.sort(_data);
}
function viewItem(_data) {}
function deleteItem(_data) {}
function init() {
  if (props.filter.order !== undefined && props.filter.orderBy !== undefined) {
    console.log("no undefidend");
    let search = props.columns.find((x) => x.field === props.filter.orderBy);
    if (search !== undefined) search.sort = props.filter.order;
  }
  localColumns.value = [
    ...props.columns,
    {
      label: "",
      field: "quick",
      width: "1%",
      rowClass: "th-buttons",
    },
  ];
  console.log("fix columns");
  fillRows();
}
init();
</script>
<template>
  <Filter ref="filterRef" :columns="localColumns" :filter="filter" />
  <Table
    :rows="rows"
    :columns="localColumns"
    :isLoading="isLoading"
    class="mt-4"
    @sort="sort"
  >
    <template v-slot:quick="{ row, index }">
      <div class="btns-container">
        <g-button
          icon="fa-solid fa-arrow-up-right-from-square"
          @click.stop="viewItem(row)"
          type="transparent-1"
          class="btn-row-table"
          title="Detalles"
        />
        <g-button
          icon="fa-solid fa-trash"
          @click.stop="deleteItem(row)"
          type="transparent-1"
          class="btn-row-table"
          title="Eliminar"
        />
      </div>
    </template>
  </Table>
</template>
<style scoped>
.g-table tr:hover td .btn-row-table {
  color: var(--color-w-v2);
}
.btns-container {
  display: flex;
}
</style>
