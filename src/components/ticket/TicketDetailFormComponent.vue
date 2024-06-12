<script setup>
import { TicketDetailModel, TicketModel } from "@/models";
import {
  ticketService,
  userService,
  tableService,
  productService,
} from "@/services";
import { ref, onMounted, inject, reactive } from "vue";
import TableForm from "@/common/table/TableForm.vue";
const emit = defineEmits(["onFirstLoad"]);

const props = defineProps({
  disabled: { default: false },
  mode: { default: null },
});
const idElement = inject("idElement", null);
const formRef = ref(null);
const tableFormRef = ref(null);

const tableForm = reactive({
  columns: [
    {
      label: "Producto",
      field: "product_id",
      sortable: true,
      searchable: true,
    },
    {
      label: "Cantidad",
      field: "quantity",
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
    orderBy: "id",
    status: "1",
  },
});
/*CONSULTS*/
async function getElement(_id) {
  let resp = await ticketService.getTicket(_id);
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function addElement() {
  if (!formRef.value.validate()) return;
  let resp = await ticketService.addTicket(formRef.value.getElement());
  return resp;
}
async function editElement() {
  if (!formRef.value.validate()) return;
  let resp = await ticketService.updateTicket(formRef.value.getElement());
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function deleteElement() {
  let resp = await ticketService.deleteTicket(
    formRef.value.getElement().id.value
  );
  return resp;
}
async function editStatusElement() {
  let resp = await ticketService.changeStatusTicket(formRef.value.getElement());
  if (resp) return formRef.value.getElement().status.value;
  return;
}
function restoreElement() {
  formRef.value.restore();
}
function resetElement() {
  formRef.value.reset();
}
function aaaaaaa(params) {
  tableFormRef.value.additem();
  console.log(products.list.value);
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
onMounted(async () => {
  if (idElement) await getElement(idElement);
  emit("onFirstLoad");
});
defineExpose({
  getElement,
  addElement,
  editElement,
  deleteElement,
  restoreElement,
  resetElement,
  editStatusElement,
});
</script>
<template>
  <g-form
    ref="formRef"
    :elementModel="TicketModel"
    v-slot="{ element, validateLabel }"
  >
    <g-section-2 title="Detalle">
      <g-button text="ssss" @click="aaaaaaa()"></g-button>
      <TableForm
        ref="tableFormRef"
        :elementModel="TicketDetailModel"
        :columns="tableForm.columns"
      >
        <template v-slot:product_id="{ row, index, validateLabel }">
          <g-select-consult-val
            v-model="row.product_id"
            :disabled="disabled"
            @validate="validateLabel"
            :consult="productService.getListProduct"
            :filter="products.filter"
            :ousideData="products"
          />
        </template>
        <template v-slot:quantity="{ row, index, validateLabel }">
          <g-input-val
            v-model="row.quantity"
            @validate="validateLabel"
            :disabled="disabled"
          />
        </template>
        <template v-slot:description="{ row, index }">
          <g-input-val
            v-model="row.description"
            @validate="validateLabel"
            :disabled="disabled"
          />
        </template>
      </TableForm>
    </g-section-2>
  </g-form>
</template>
