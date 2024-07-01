<script setup>
import { TicketDetailModel, TicketModel } from "@/models";
import {
  ticketDetailService,
  userService,
  tableService,
  productService,
} from "@/services";
import { ref, onMounted, inject, reactive, watch, computed } from "vue";
import TableForm from "@/common/table/TableForm.vue";
import TableFormButtons from "@/common/table/TableFormButtons.vue";
import { formatSubTitle, isEmpty } from "@/helpers";

const emit = defineEmits(["onFirstLoad", "onChangeTotal"]);

const props = defineProps({
  mode: { default: null },
});
const localMode = ref("add");
const disabled = ref(false);
const isLoading = ref(false);

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
  isLoading.value = true;
  tableFormRef.value.changeDisabled(false);

  let resp = await ticketDetailService.getListTicketDetail(
    tableForm.defaultFilter
  );
  if (resp) tableFormRef.value.copy(resp);
  isLoading.value = false;

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
  let resp = await ticketDetailService.updateTicketDetail(
    _data,
    totalCalc.value
  );
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
  if (idElement) {
    localMode.value = "view";
    disabled.value = true;
    await getList(idElement);
  }
  emit("onFirstLoad");
});

const listElements = computed(() => {
  if (tableFormRef.value !== null) {
    return tableFormRef.value.list;
  }

  return [];
});
watch(
  () => listElements.value,
  (_new, _old) => {
    console.log("hola");
    console.log(_new);
    let sum = 0;
    for (let index = 0; index < _new.length; index++) {
      const element = _new[index];
      let num = Number(element.price_total.value);
      if (isNaN(num)) {
        sum = 0;
        break;
      }
      sum += num;
    }
    totalCalc.value = sum.toFixed(2);
    emit("onChangeTotal", totalCalc.value);
  },
  { deep: true }
);
const totalCalc = ref("0.00");

function changeProduct(_data, _row) {
  console.log(_data);
  _row.setLabelValue("is_menu", _data.section === "menu");
  _row.setLabelValue("price", _data.price);
  calcTotalElement(_row);
}
function calcTotalElement(_row) {
  let price = _row.getLabelValue("price");
  let quantity = _row.getLabelValue("quantity");

  let priceNum = Number(price);
  let quantityNum = Number(quantity);

  let total = 0;
  if (!isNaN(priceNum) && !isNaN(quantityNum)) {
    total = priceNum * quantityNum;
  }
  _row.setLabelValue("price_total", total.toFixed(2));
}
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
      :isLoading="isLoading"
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
          :consult="ticketDetailService.getListProdutMenu"
          :filter="products.filter"
          :ousideData="products"
          :showAditionalInSelect="false"
          :multipleOptions="true"
          @select="changeProduct($event, row)"
        />
      </template>
      <template v-slot:quantity="{ row, index, disabledRow, validateLabel }">
        <g-input-val
          v-model="row.quantity"
          @validate="validateLabel($event, index)"
          :disabled="disabledRow"
          @input="calcTotalElement(row)"
        />
      </template>
      <template v-slot:price="{ row, disabledRow, index, validateLabel }">
        <g-input-val
          v-model="row.price"
          @validate="validateLabel($event, index)"
          :disabled="true"
          :viewMode="disabledRow"
        />
      </template>
      <template v-slot:price_total="{ row, disabledRow, index, validateLabel }">
        <g-input-val
          v-model="row.price_total"
          @validate="validateLabel($event, index)"
          :disabled="true"
          :viewMode="disabledRow"
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
      <template #spaceBelow="{ activeColumns }">
        <tbody>
          <tr>
            <td colspan="3" class="text-end">
              <label class="imp-label">Precio Total:</label>
            </td>
            <td class="text-end">{{ totalCalc }}</td>
            <td v-if="(activeColumns.length = 5)"></td>
          </tr>
        </tbody>
      </template>
    </TableForm>
  </g-section-4>
</template>
