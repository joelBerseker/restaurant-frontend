<script setup>
import TableConsult from "@/common/table/TableConsult.vue";
import TableButtons from "@/common/table/TableButtons.vue";
import TypeProductElementModalComponent from "@/components/typeProduct/TypeProductElementModalComponent.vue";
import { ref, reactive, onMounted, inject } from "vue";
import { typeProductService } from "@/services";
import { subTitleGen } from "@/helpers";
const emit = defineEmits(["onFirstLoad"]);

const tableRef = ref(null);
const modalRef = ref(null);

const subTitle = ref(null);
const table = reactive({
  columns: [
    {
      label: "ID",
      field: "id",
      sortable: true,
      width: "1%",
    },
    {
      label: "Nombre",
      field: "name",
      sortable: true,
      searchable: true,
      sort: "asc",
    },
    {
      label: "Descripción",
      field: "description",
      sortable: true,
      searchable: true,
    },
  ],
  filter: {
    order: "asc",
    orderBy: "name",
    status: "1",
  },
});
function refresh() {
  tableRef.value.refresh();
}
function viewItem(_data) {
  console.log(_data);
  modalRef.value.viewMode(_data.id);
}
function addItem() {
  modalRef.value.addMode();
}
function onGotList(_data) {
  subTitle.value = subTitleGen.countElement(_data);
}
function onFirstLoad() {
  emit("onFirstLoad");
}

const switchSearchValue = ref(false);
function switchSearch() {
  switchSearchValue.value = tableRef.value.switchSearch();
}
</script>
<template>
  <TypeProductElementModalComponent ref="modalRef" @onRefreshList="refresh" />
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
        :filter="table.filter"
        :deleteConsult="typeProductService.deleteTypeProduct"
        :getListConsult="typeProductService.getListTypeProduct"
        @onViewItem="viewItem"
        @onGotList="onGotList"
        @onFirstLoad="onFirstLoad"
      ></TableConsult>
    </template>
  </g-section-1>
</template>
