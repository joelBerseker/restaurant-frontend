<script setup>
import TableConsult from "@/common/table/TableConsult.vue";
import TableButtons from "@/common/table/TableButtons.vue";
import ProductTypeElementModalComponent from "@/components/productType/ProductTypeElementModalComponent.vue";
import { ref, reactive, onMounted, inject } from "vue";
import { typeProductService } from "@/services";
import { formatSubTitle } from "@/helpers";
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
    },
    {
      label: "Descripción",
      field: "description",
      sortable: true,
      searchable: true,
    },
  ],
  defaultFilter: {
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
function onUpdate(_data) {
  subTitle.value = formatSubTitle.countElement(_data);
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
  <ProductTypeElementModalComponent ref="modalRef" @onRefreshList="refresh" />
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
        filterCacheName="typeProduct"
        :defaultFilter="table.defaultFilter"
        :deleteConsult="typeProductService.deleteTypeProduct"
        :getListConsult="typeProductService.getListTypeProduct"
        @onViewItem="viewItem"
        @onUpdate="onUpdate"
        @onFirstLoad="onFirstLoad"
        @onFilterCache="switchSearchValue = true"
      ></TableConsult>
    </template>
  </g-section-1>
</template>
