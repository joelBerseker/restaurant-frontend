<script setup>
import TableConsult from "@/common/table/TableConsult.vue";
import TableButtons from "@/common/table/TableButtons.vue";
import ProductElementModalComponent from "@/components/product/ProductElementModalComponent.vue";
import { ref, reactive, onMounted, inject } from "vue";
import { productService, ticketDetailService, ticketService } from "@/services";
import { formatSubTitle } from "@/helpers";
import { useRouter } from "vue-router";

const emit = defineEmits(["onFirstLoad"]);
const router = useRouter();
const idElement = inject("idElement", null);

const tableRef = ref(null);
const modalRef = ref(null);

const subTitle = ref(null);
const table = reactive({
  columns: [
    {
      label: "Boleta",
      field: "ticket_id__code",
      columnClass: "no-wrap",

      sortable: true,
      searchable: true,
    },
    {
      label: "Precio",
      field: "price",
      columnClass: "number",

      sortable: true,
    },
    {
      label: "Cantidad",
      field: "quantity",
      columnClass: "number",

      sortable: true,
    },
    {
      label: "Precio total",
      field: "price_total",
      columnClass: "number",

      sortable: true,
    },
  ],
  defaultFilter: {
    order: "asc",
    orderBy: "ticket_id__code",
    status: "1",
    product_id: idElement,
    is_menu: 0,
  },
});
function refresh() {
  tableRef.value.refresh();
}
function viewItem(_data) {
  router.push({ name: "ticketDetail", params: { id: _data.ticket_id } });
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
  <g-section-4
    title="Movimientos"
    :subTitle="subTitle"
    :refresh="true"
    @onRefresh="refresh()"
  >
    <template #buttons>
      <TableButtons
        :switchSearchValue="switchSearchValue"
        @onSearch="switchSearch"
        :showAdd="false"
      />
    </template>

    <TableConsult
      ref="tableRef"
      :columns="table.columns"
      :defaultFilter="table.defaultFilter"
      :deleteConsult="productService.deleteProduct"
      :getListConsult="ticketDetailService.getListTicketDetail"
      :border="true"
      @onViewItem="viewItem"
      @onUpdate="onUpdate"
      @onFirstLoad="onFirstLoad"
      @onFilterCache="switchSearchValue = true"
      :showStatus="false"
      :showDelete="false"
      iconDetail="fa-solid fa-arrow-right"
    ></TableConsult>
  </g-section-4>
</template>
