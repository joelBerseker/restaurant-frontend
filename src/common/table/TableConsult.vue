<script setup>
import Table from "@/common/table/Table.vue";
import Filter from "@/common/filter/Filter.vue";
import { copyObject, status } from "@/helpers";
import { ref, inject, onMounted } from "vue";
import { useSystemStore } from "@/stores/systemStore";

const useSystem = useSystemStore();

const props = defineProps({
  columns: { default: [] },
  defaultFilter: { default: {} },
  deleteConsult: { default: null },
  getListConsult: { default: null },
  filterCacheName: { default: null },
  showDelete: { default: true },
  showStatus: { default: true },
  border: { default: false },

  iconDetail: { default: "fa-solid fa-arrow-up-right-from-square" },
});
const emit = defineEmits([
  "onViewItem",
  "onDeleteItem",
  "onUpdate",
  "onFirstLoad",
  "onFilterCache",
]);
const confirmDialogue = inject("confirmDialogue");

const localColumns = ref([]);
const startOpenCollapse = ref(false);

const filterRef = ref(null);
const filter = ref(null);

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
  console.log(filter.value);
  console.log(props.defaultFilter);

  let resp = await props.getListConsult(filter.value);
  if (resp) {
    rows.value = resp.map((element) => element.getData());
    emit("onUpdate", rows.value);
  }
  isLoading.value = false;
}
function verifyFilterCache() {
  if (props.filterCacheName) {
    let _filter = useSystem.filterCache[props.filterCacheName];
    if (_filter) {
      startOpenCollapse.value = true;
      emit("onFilterCache");
      filter.value = copyObject(_filter);

      return;
    }
  }
  filter.value = copyObject(props.defaultFilter);
}
async function deleteItem(_data) {
  let confirm = await confirmDialogue("delete", _data.elementTextModel);
  if (confirm) {
    isLoading.value = true;

    await props.deleteConsult(_data.id);
    isLoading.value = false;
    await getList();
  }
}
async function init() {
  verifyFilterCache();
  if (props.showStatus) {
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
  } else {
    localColumns.value = [
      ...props.columns,

      {
        label: "",
        field: "quick",
        width: "1%",
        rowClass: "th-buttons",
      },
    ];
  }

  await getList(false);
  emit("onFirstLoad");
}
function refresh(filter = null) {
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
  <g-collapse ref="collapseRef" :startOpen="startOpenCollapse">
    <div class="pb-4">
      <Filter
        ref="filterRef"
        :columns="localColumns"
        v-model="filter"
        :defaultFilter="defaultFilter"
        :filterCacheName="filterCacheName"
        @filterSearch="refresh"
        :border="border"
        :status="showStatus"
      />
    </div>
  </g-collapse>

  <Table
    ref="tableRef"
    :rows="rows"
    :columns="localColumns"
    :isLoading="isLoading"
    :border="border"
    @sort="sort"
    @rowClicked="viewItem"
  >
    <template v-slot:quick="{ row, index }">
      <div class="btns-container">
        <g-button
          v-if="showDelete"
          icon="fa-solid fa-trash-can"
          @click.stop="deleteItem(row)"
          type="transparent-1"
          title="Eliminar"
        />
        <g-button
          :icon="iconDetail"
          @click.stop="viewItem(row)"
          type="transparent-1"
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
