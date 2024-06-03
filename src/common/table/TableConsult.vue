<script setup>
import Table from "@/common/table/Table.vue";
import Filter from "@/common/filter/Filter.vue";

import { ref, inject } from "vue";

const props = defineProps({
  columns: { default: [] },
  filter: { default: {} },
  deleteConsult: { default: null },
  getListConsult: { default: null },
});
const emit = defineEmits(["onViewItem", "onDeleteItem"]);
const confirmDialogue = inject("confirmDialogue");

const localColumns = ref([]);
const filterRef = ref(null);
const rows = ref([]);
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
function viewItem(_data) {
  emit("onViewItem", _data);
}
async function getList(loading = true) {
  isLoading.value = loading;
  let resp = await props.getListConsult();
  if (resp !== null) {
    rows.value = resp.map((element) => element.getData());
  }
  isLoading.value = false;
}

async function deleteItem(_data) {
  let confirm = await confirmDialogue("delete");
  if (confirm) {
    isLoading.value = true;

    console.log(_data);
    await props.deleteConsult(_data.id);
    isLoading.value = false;
    await getList();
  }
}
function init() {
  if (props.filter.order !== undefined && props.filter.orderBy !== undefined) {
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

  fillRows();
  getList(false);
}
function refresh() {
  getList(true);
}
init();
defineExpose({
  refresh,
});
</script>
<template>
  <Filter ref="filterRef" :columns="localColumns" :filter="filter" />
  <Table
    ref="tableRef"
    :rows="rows"
    :columns="localColumns"
    :isLoading="isLoading"
    class="mt-4"
    @sort="sort"
    @rowClicked="viewItem"
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
