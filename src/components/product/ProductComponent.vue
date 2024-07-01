<script setup>
import TableConsult from "@/common/table/TableConsult.vue";
import TableButtons from "@/common/table/TableButtons.vue";
import ProductElementModalComponent from "@/components/product/ProductElementModalComponent.vue";
import { ref, reactive, onMounted, inject } from "vue";
import { productService } from "@/services";
import { formatSubTitle } from "@/helpers";
import { useRouter } from "vue-router";
import { ProductModel } from "@/models";

const emit = defineEmits(["onFirstLoad"]);
const router = useRouter();

const tableRef = ref(null);
const modalRef = ref(null);

const subTitle = ref(null);
const elementModel = ref(new ProductModel());

const table = reactive({
  columns: elementModel.value.getDataTable(),

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
        @onUpdate="onUpdate"
        @onFirstLoad="onFirstLoad"
        @onFilterCache="switchSearchValue = true"
        iconDetail="fa-solid fa-arrow-right"
      ></TableConsult>
    </template>
  </g-section-1>
</template>
