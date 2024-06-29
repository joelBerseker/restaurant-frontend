<script setup>
import TableConsult from "@/common/table/TableConsult.vue";
import TableButtons from "@/common/table/TableButtons.vue";

import { ref, reactive, onMounted, inject } from "vue";
import { menuService } from "@/services";
import { formatSubTitle } from "@/helpers";
import { useRouter } from "vue-router";
import { MenuModel } from "@/models";
const emit = defineEmits(["onFirstLoad"]);

const router = useRouter();

const tableRef = ref(null);

const subTitle = ref(null);
const elementModel = ref(new MenuModel());

const table = reactive({
  columns: elementModel.value.getDataTable(),
  defaultFilter: {
    order: "asc",
    orderBy: "id",
    status: "1",
  },
});
function refresh() {
  tableRef.value.refresh();
}
function viewItem(_data) {
  console.log(_data);
  router.push({ name: "menuDetail", params: { id: _data.id } });
}
function addItem() {
  router.push({ name: "menuAdd" });
}
function onUpdate(_data) {
  subTitle.value = formatSubTitle.countElement(_data);
}

const switchSearchValue = ref(false);
function switchSearch() {
  switchSearchValue.value = tableRef.value.switchSearch();
}
function onFirstLoad() {
  emit("onFirstLoad");
}
</script>
<template>
  <g-section-1 :subTitle="subTitle" :refresh="true" @onRefresh="refresh()">
    <template #buttons>
      <TableButtons
        :switchSearchValue="switchSearchValue"
        @onAdd="addItem"
        @onSearch="switchSearch"
      />
    </template>
    <template #content>
      <TableConsult
        ref="tableRef"
        :columns="table.columns"
        filterCacheName="menu"
        :defaultFilter="table.defaultFilter"
        :deleteConsult="menuService.deleteMenu"
        :getListConsult="menuService.getListMenu"
        @onViewItem="viewItem"
        @onUpdate="onUpdate"
        @onFirstLoad="onFirstLoad"
        @onFilterCache="switchSearchValue = true"
        iconDetail="fa-solid fa-arrow-right"
      ></TableConsult>
    </template>
  </g-section-1>
</template>
