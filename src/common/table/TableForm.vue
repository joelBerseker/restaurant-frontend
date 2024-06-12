<script setup>
import { useSlots, ref, computed } from "vue";

import TableContainer from "@/common/container/TableContainer.vue";

const props = defineProps({
  columns: { default: [] },
  tableClass: { default: "g-table" },
  tableContainerClass: { default: "g-table-container" },
  noHeader: { default: false },
  isLoading: { default: false },
  elementModel: { default: null },
  viewMode: { default: false },
});
const emit = defineEmits(["rowClicked", "sort", "deleteItem", "addItem"]);

const list = ref([]);
const slots = useSlots();

const activeColumns = computed(() => {
  let resp = [];
  props.columns.forEach((element) => {
    if (element.disabled !== true) {
      resp.push(element);
    }
  });
  return resp;
});

function rowClicked(row, index) {
  emit("rowClicked", row, index);
}
function sortColumn(column) {
  if (column.sortable !== true) return;

  let auxSort = column.sort;
  props.columns.forEach((element) => {
    element.sort = undefined;
  });
  if (auxSort === "asc") {
    column.sort = "desc";
  } else {
    column.sort = "asc";
  }
  const resp = {
    orderBy: column.field,
    order: column.sort,
  };
  emit("sort", resp);
}
function iconCurrentSort(sort) {
  let resp = "";
  if (sort === "asc") {
    resp = "fa-solid fa-arrow-up-a-z";
  } else if (sort === "desc") {
    resp = "fa-solid fa-arrow-down-z-a";
  } else {
    resp = "fa-solid fa-arrow-down-up-across-line";
  }
  return resp;
}

function additem() {
  list.value.push(new props.elementModel());

  emit("addItem");
}
async function deleteItem(index) {
  let confirm = await confirmDialogue("delete");
  if (!confirm) return;
  let itemDeleted = list.values[index];
  list.value.splice(index, 1);
  console.log(itemDeleted);
  emit("deleteItem", index, itemDeleted);
}
function validateLabel(_data) {
  console.log("validate");
}
defineExpose({
  additem,
});
</script>
<template>
  <table-container
    :isLoading="isLoading"
    :tableContainerClass="tableContainerClass"
    :rowsLength="list.length"
  >
    <table :class="['w-100', tableClass, noHeader ? 'table-no-header' : '']">
      <thead v-if="!noHeader">
        <tr>
          <th
            v-for="(col, index) in activeColumns"
            :style="'width: ' + col.width + ';'"
            :class="[
              col.headerClass,
              col.columnClass,
              col.sortable ? 'sortable-column' : '',
              col.sort ? 'sort-column' : '',
            ]"
            @click="sortColumn(col)"
          >
            <span> {{ col.label }}</span>
            <span v-if="col.sortable" class="ms-1">
              <font-awesome-icon :icon="iconCurrentSort(col.sort)" />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in list" @click="rowClicked(row, index)">
          <td
            v-for="(col, index2) in activeColumns"
            :class="[col.rowClass, col.columnClass]"
            :style="'width: ' + col.width + ';'"
          >
            <slot
              :name="col.field"
              :row="row"
              :index="index"
              :validateLabel="validateLabel"
            ></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </table-container>
</template>
<style>
.g-table td.number,
.g-table th.number {
  text-align: end;
}
.g-table th span {
  font-weight: 500;
}
.g-table th {
  background-color: var(--color-2);
  color: var(--color-w);
  font-size: 12px;
  text-transform: uppercase;
}

.g-table td,
.g-table th {
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
.th-buttons {
  padding-top: calc(0.6rem - 0.25rem - 1px) !important;
  padding-bottom: calc(0.6rem - 0.25rem - 1px) !important;
}
.g-table tbody tr {
  background-color: rgb(255, 255, 255);
}
.g-table tbody tr:nth-last-child(odd) {
  background-color: var(--color-w-v3);
}
.g-table tr td {
  transition: 0.3s;
}
.g-table tr:hover td {
  color: var(--color-1-v3);
}
.table-min td,
.table-min th {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.table-min .bt-buttons {
  padding-top: calc(0.5rem - 0.25rem - 1px);
  padding-bottom: calc(0.5rem - 0.25rem - 1px);
}
</style>
<style scoped>
.sortable-column {
  cursor: pointer;
  width: fit-content;
  transition: 0.3s;
  text-wrap: nowrap;
}
.sort-column {
  color: var(--color-1-v2);
}
</style>
