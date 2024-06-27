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
import { formatSubTitle, isEmpty } from "@/helpers";

const emit = defineEmits(["onFirstLoad"]);

const props = defineProps({
  mode: { default: null },
});
const localMode = ref("add");
const disabled = ref(false);

const idElement = inject("idElement", null);
const tableFormRef = ref(null);
const subTitle = ref(null);

const elementModel = ref(new TicketDetailModel());

const tableForm = reactive({
  columns: elementModel.value.getDataTable(),
  defaultFilter: {
    order: "asc",
    orderBy: "id",
    status: "1",
    ticket_id: idElement,
  },
});
/*CONSULTS*/
async function getList() {
  tableFormRef.value.changeDisabled(false);

  let resp = await ticketDetailService.getListTicketDetail(
    tableForm.defaultFilter
  );
  if (resp) tableFormRef.value.copy(resp);
  return resp;
}
async function addElement(_data) {
  _data.ticket_id.value = idElement;
  let resp = await ticketDetailService.addTicketDetail(_data);
  if (resp) {
    getList();
  }
  return resp;
}
async function editElement(_data) {
  let resp = await ticketDetailService.updateTicketDetail(_data);
  if (resp) {
    getList();
  }
  return resp;
}
async function deleteElement(_id) {
  let resp = await ticketDetailService.deleteTicketDetail(_id);
  if (resp) {
    getList();
  }
  return resp;
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

const disabledAdd = ref(false);
const showRefresh = ref(true);
function onAdd() {
  tableFormRef.value.additem();
}

function onUpdated(_data) {
  subTitle.value = formatSubTitle.countElement(_data);
}
function getListValue() {
  return tableFormRef.value.getListValue();
}
function onChangeDisabled(_value) {
  disabledAdd.value = _value;
  showRefresh.value = !_value;
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
  resetList,
  getListValue,

  validateList,
});
</script>
<template>
  <g-section-4
    title="Lista de productos"
    :subTitle="subTitle"
    :refresh="showRefresh && mode !== 'add'"
    @onRefresh="getList()"
  >
    <template #buttons>
      <TableFormButtons
        :mode="mode"
        @onAdd="onAdd"
        :disabledAdd="disabledAdd"
      />
    </template>
    <TableForm
      ref="tableFormRef"
      :mode="mode"
      :elementModel="TicketDetailModel"
      :columns="tableForm.columns"
      @onUpdated="onUpdated"
      @onChangeDisabled="onChangeDisabled"
      @onDeleteItem="deleteElement"
      @onSaveElement="editElement"
      @onNewElement="addElement"
      :viewMode="disabled"
      :border="true"
      :rowAdditionalSpace="true"
    >
      <template v-slot:product_id="{ row, index, disabledRow, validateLabel }">
        <g-select-consult-val
          v-model="row.product_id"
          :disabled="disabledRow"
          @validate="validateLabel($event, index)"
          :consult="productService.getListProduct"
          :filter="products.filter"
          :ousideData="products"
        />
      </template>
      <template v-slot:quantity="{ row, index, disabledRow, validateLabel }">
        <g-input-val
          v-model="row.quantity"
          @validate="validateLabel($event, index)"
          :disabled="disabledRow"
        />
      </template>
      <template v-slot:price="{ row, disabledRow, index, validateLabel }">
        <g-input-val
          v-model="row.price"
          @validate="validateLabel($event, index)"
          :disabled="disabledRow"
        />
      </template>
      <template
        v-slot:additionalSpace="{ row, disabledRow, index, validateLabel }"
      >
        <div v-show="!disabledRow || !isEmpty(row.description.value)">
          <label>{{ row.description.name }}:</label>
          <g-input-val
            v-model="row.description"
            @validate="validateLabel($event, index)"
            :disabled="disabledRow"
          />
        </div>
      </template>
    </TableForm>
  </g-section-4>
</template>
