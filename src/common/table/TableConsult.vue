<script setup>
import Table from "@/common/table/Table.vue";
import Filter from "@/common/filter/Filter.vue";
import { status } from "@/helpers";
import { ref, inject } from "vue";

const props = defineProps({
  columns: { default: [] },
  filter: { default: {} },
  deleteConsult: { default: null },
  getListConsult: { default: null },
});
const emit = defineEmits([
  "onViewItem",
  "onDeleteItem",
  "onGotList",
  "onFirstLoad",
]);
const confirmDialogue = inject("confirmDialogue");

const localColumns = ref([]);
const filterRef = ref(null);
const collapseRef = ref(null);
const rows = ref([]);

const isLoading = ref(false);
function sort(_data) {
  filterRef.value.sort(_data);
}
function viewItem(_data) {
  emit("onViewItem", _data);
}
async function getList(loading = true) {
  isLoading.value = loading;
  let resp = await props.getListConsult(props.filter);
  if (resp) {
    rows.value = resp.map((element) => element.getData());
    emit("onGotList", rows.value);
  }
  isLoading.value = false;
}

async function deleteItem(_data) {
  console.log(_data);
  let confirm = await confirmDialogue("delete", _data.elementTextModel);
  if (confirm) {
    isLoading.value = true;

    console.log(_data);
    await props.deleteConsult(_data.id);
    isLoading.value = false;
    await getList();
  }
}
async function init() {
  localColumns.value = [
    ...props.columns,
    {
      label: "Estado",
      field: "status",
      width: "1%",
    },
    {
      label: "",
      field: "quick",
      width: "1%",
      rowClass: "th-buttons",
    },
  ];

  await getList(false);
  emit("onFirstLoad");
}
function refresh() {
  getList(true);
}
function switchSearch() {
  return collapseRef.value.swichCollapse();
}
init();
defineExpose({
  refresh,
  switchSearch,
});
</script>
<template>
  <g-collapse ref="collapseRef">
    <div class="pb-4">
      <Filter
        ref="filterRef"
        :columns="localColumns"
        :filter="filter"
        @filterSearch="refresh"
      />
    </div>
  </g-collapse>

  <Table
    ref="tableRef"
    :rows="rows"
    :columns="localColumns"
    :isLoading="isLoading"
    @sort="sort"
    @rowClicked="viewItem"
  >
    <template v-slot:quick="{ row, index }">
      <div class="btns-container">
        <g-button
          icon="fa-solid fa-trash-can"
          @click.stop="deleteItem(row)"
          type="transparent-1"
          class="btn-row-table"
          title="Eliminar"
        />
        <g-button
          icon="fa-solid fa-arrow-up-right-from-square"
          @click.stop="viewItem(row)"
          type="transparent-1"
          class="btn-row-table"
          title="Detalles"
        />
      </div>
    </template>
    <template v-slot:status="{ row, index }">
      <span
        v-if="row.status"
        :class="['status-container', status.options[row.status].color]"
      >
        <span>
          <font-awesome-icon :icon="status.options[row.status].icon" />
        </span>
        <span class="status-text">
          {{ status.options[row.status].text }}
        </span>
      </span>
    </template>
  </Table>
</template>
<style scoped>
.g-table tr:hover td .btn-row-table {
  color: var(--color-1-v3);
}
.btns-container {
  display: flex;
}
.status-container {
  text-wrap: nowrap;
  font-size: 13px;
}
.status-text {
  margin-left: 0.25rem;
}
.status-container.active {
  color: var(--color-1-v3);
}
.status-container.inactive {
  color: var(--color-d);
}
</style>
