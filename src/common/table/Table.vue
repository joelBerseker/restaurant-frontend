<script setup>
import { useSlots, ref, computed } from "vue";
import TableContainer from "@/common/container/TableContainer.vue";

const props = defineProps({
  columns: { default: [] },
  rows: { default: [] },
  tableClass: { default: "g-table" },
  tableContainerClass: { default: "g-table-container" },
  noHeader: { default: false },
  isLoading: { default: false },
  rowAdditionalSpace: { default: false },
});
const emit = defineEmits(["rowClicked", "sort"]);

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
</script>
<template>
  <table-container
    :isLoading="isLoading"
    :tableContainerClass="tableContainerClass"
    :rowsLength="rows.length"
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
            <slot name="headerPrev" :col="col"></slot>

            <span> {{ col.label }}</span>
            <span v-if="col.sortable" class="ms-1">
              <font-awesome-icon :icon="iconCurrentSort(col.sort)" />
            </span>
            <slot name="headerNext" :col="col"></slot>
          </th>
        </tr>
      </thead>
      <tbody v-for="(row, index) in rows" @dblclick="rowClicked(row, index)">
        <tr>
          <td
            v-for="(col, index2) in activeColumns"
            :class="[col.rowClass, col.columnClass]"
            :style="'width: ' + col.width + ';'"
          >
            <span v-if="slots[col.field] === undefined">
              <span v-if="col.display !== undefined">
                {{ col.display(row) }}
              </span>
              <span v-else>
                {{ row[col.field] }}
              </span>
            </span>
            <span v-else>
              <slot :name="col.field" :row="row" :index="index"></slot>
            </span>
          </td>
        </tr>
        <tr v-if="rowAdditionalSpace">
          <td :colspan="activeColumns.length" class="additional-space">
            <slot name="additionalSpace" :row="row" :index="index"></slot>
          </td>
        </tr>
      </tbody>
      <slot name="spaceBelow" :activeColumns="activeColumns"></slot>
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
.g-table td {
  vertical-align: top;
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
  background-color: var(--color-c1);
}
.g-table tbody tr:nth-last-child(odd) {
  background-color: var(--color-c1);
}
.g-table tbody tr:first-child {
  border-top: 1px solid var(--color-border2);
}

.g-table tr td {
  transition: 0.3s;
}
.g-table tbody:hover td {
  background-color: var(--color-w-v2);
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
.additional-space {
  padding-top: 0;
  padding-bottom: 0;
}
.additional-space > * {
  padding-bottom: 0.6rem;
}
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
