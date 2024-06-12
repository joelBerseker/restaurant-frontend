<script setup>
import TableConsult from "@/common/table/TableConsult.vue";
import TableButtons from "@/common/table/TableButtons.vue";
import ProductElementModalComponent from "@/components/product/ProductElementModalComponent.vue";
import { ref, reactive, onMounted, inject } from "vue";
import { productService } from "@/services";
import { subTitleGen } from "@/helpers";
import { useRouter } from "vue-router";

const emit = defineEmits(["onFirstLoad"]);
const router = useRouter();

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
  router.push({ name: "productDetail", params: { id: _data.id } });
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
  <ProductElementModalComponent ref="modalRef" @onRefreshList="refresh" />
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
        filterCacheName="product"
        :defaultFilter="table.defaultFilter"
        :deleteConsult="productService.deleteProduct"
        :getListConsult="productService.getListProduct"
        @onViewItem="viewItem"
        @onGotList="onGotList"
        @onFirstLoad="onFirstLoad"
        @onFilterCache="switchSearchValue = true"
      ></TableConsult>
    </template>
  </g-section-1>
</template>
