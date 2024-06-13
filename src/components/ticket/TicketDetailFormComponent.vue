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
import TableFormButtons from "@/common/table/TableFormButtons.vue";
import { subTitleGen } from "@/helpers";

const emit = defineEmits(["onFirstLoad"]);

const props = defineProps({
  disabled: { default: false },
  mode: { default: null },
});
const localMode = ref("add");
const idElement = inject("idElement", null);
const formRef = ref(null);
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
  },
});
/*CONSULTS*/
async function getList(_id) {
  let resp = await ticketService.getTicket(_id);
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function editList() {
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

function restoreList() {
  formRef.value.restore();
}
function resetList() {
  formRef.value.reset();
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
  localMode.value = "edit";
}
function onCancel() {
  localMode.value = "view";
}
function onAdd() {
  tableFormRef.value.additem();
}
function onUpdated(_data) {
  subTitle.value = subTitleGen.countElement(_data);
}
function getListValue() {
  return tableFormRef.value.getListValue();
}
onMounted(async () => {
  if (idElement) {
    localMode.value = "view";
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
  <g-form
    ref="formRef"
    :elementModel="TicketModel"
    v-slot="{ element, validateLabel }"
  >
    <g-section-2 title="Lista de productos" :subTitle="subTitle">
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
    </g-section-2>
  </g-form>
</template>
