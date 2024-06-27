<script setup>
import { TicketDetailModel, TicketModel } from "@/models";
import {
  ticketDetailService,
  userService,
  tableService,
  productService,
} from "@/services";
import { ref, onMounted, inject, reactive } from "vue";
import TableForm from "@/common/table/TableForm.vue";
import TableFormButtons from "@/common/table/TableFormButtons.vue";
import { formatSubTitle } from "@/helpers";

const emit = defineEmits(["onFirstLoad"]);

const props = defineProps({
  mode: { default: null },
});
const localMode = ref("add");
const disabled = ref(false);

const idElement = inject("idElement", null);
const tableFormRef = ref(null);
const subTitle = ref(null);

const tableForm = reactive({
  columns: [
    {
      label: "Producto",
      field: "product_id",
    },
    {
      label: "Cantidad",
      field: "quantity",
    },
    {
      label: "Descripción",
      field: "description",
    },
  ],
  defaultFilter: {
    order: "asc",
    orderBy: "id",
    status: "1",
    ticket_id: null,
  },
});
/*CONSULTS*/
async function getList(_id) {
  tableForm.defaultFilter.ticket_id = _id;
  let resp = await ticketDetailService.getListTicketDetail(
    tableForm.defaultFilter
  );
  if (resp) tableFormRef.value.copy(resp);
  return resp;
}
async function editList() {
  if (!tableFormRef.value.validate()) return;
  let resp = await ticketDetailService.updateTicket(
    tableFormRef.value.getElement()
  );
  if (resp) tableFormRef.value.copy(resp);
  return resp;
}
async function deleteElement() {
  let resp = await ticketDetailService.deleteTicket(
    tableFormRef.value.getElement().id.value
  );
  return resp;
}

function restoreList() {
  tableFormRef.value.restore();
}
function resetList() {
  tableFormRef.value.reset();
}
function validateList() {
  return tableFormRef.value.validate();
}
const products = reactive({
  list: [],
  obtained: false,
  loading: false,
  filter: {
    order: "asc",
    orderBy: "name",
    searchBy: ["name"],
  },
});
function onEdit() {
  disabled.value = false;
  localMode.value = "edit";
}
function onCancel() {
  disabled.value = true;

  localMode.value = "view";
}
function onAdd() {
  tableFormRef.value.additem();
}
function onUpdated(_data) {
  subTitle.value = formatSubTitle.countElement(_data);
}
function getListValue() {
  return tableFormRef.value.getListValue();
}
onMounted(async () => {
  console.log(idElement);
  if (idElement) {
    localMode.value = "view";
    disabled.value = true;
    await getList(idElement);
  }
  emit("onFirstLoad");
});
defineExpose({
  restoreList,
  resetList,
  getListValue,

  validateList,
});
</script>
<template>
  <g-section-4 title="Lista de productos" :subTitle="subTitle">
    <template #buttons>
      <TableFormButtons
        :mode="localMode"
        @onEdit="onEdit"
        @onCancel="onCancel"
        @onAdd="onAdd"
      />
    </template>
    <TableForm
      ref="tableFormRef"
      :elementModel="TicketDetailModel"
      :columns="tableForm.columns"
      @onUpdated="onUpdated"
      :viewMode="disabled"
    >
      <template v-slot:product_id="{ row, index, validateLabel }">
        <g-select-consult-val
          v-model="row.product_id"
          :disabled="disabled"
          @validate="validateLabel($event, index)"
          :consult="productService.getListProduct"
          :filter="products.filter"
          :ousideData="products"
        />
      </template>
      <template v-slot:quantity="{ row, index, validateLabel }">
        <g-input-val
          v-model="row.quantity"
          @validate="validateLabel($event, index)"
          :disabled="disabled"
        />
      </template>
      <template v-slot:description="{ row, index }">
        <g-input-val
          v-model="row.description"
          @validate="validateLabel($event, index)"
          :disabled="disabled"
        />
      </template>
    </TableForm>
  </g-section-4>
</template>
