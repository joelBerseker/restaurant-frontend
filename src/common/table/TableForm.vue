<script setup>
import { useSlots, ref, computed, inject } from "vue";
import { useToastStore } from "@/stores";
import TableContainer from "@/common/container/TableContainer.vue";
import Table from "@/common/table/Table.vue";

const useToast = useToastStore();
const confirmDialogue = inject("confirmDialogue");

const props = defineProps({
  columns: { default: [] },
  tableClass: { default: "g-table" },
  tableContainerClass: { default: "g-table-container" },
  noHeader: { default: false },
  isLoading: { default: false },
  elementModel: { default: null },
  viewMode: { default: false },
});
const emit = defineEmits(["deleteItem", "addItem", "onUpdated"]);

const list = ref([]);
const listBackup = ref([]);

const localColumns = ref([]);

function additem() {
  list.value.push(new props.elementModel());

  emit("addItem");
  emit("onUpdated", list.value);
}
async function deleteItem(index) {
  let confirm = await confirmDialogue("delete");
  if (!confirm) return;
  let itemDeleted = list.value[index];
  list.value.splice(index, 1);
  console.log(itemDeleted);
  emit("deleteItem", index, itemDeleted);
  emit("onUpdated", list.value);
}
function validateLabel(_data, index) {
  console.log({ _data });
  console.log({ index });
  list.value[index].validateLabel(_data);
}
function validate() {
  let list_error = [];
  let resp = true;

  for (let i = 0; i < list.value.length; i++) {
    const element = list.value[i];
    let respEl = element.validate();
    if (!respEl.value) {
      list_error.push("Fila " + (i + 1));
    }
    resp = resp && respEl.value;
  }
  console.log(resp);
  if (!resp) {
    useToast.show("validation_list_error", {
      list_error: list_error,
    });
  }

  return resp;
}
function getListValue() {
  return list.value;
}

function copy(_data) {
  list.value = [];
  listBackup.value = [];

  console.log(_data);
  for (let i = 0; i < _data.length; i++) {
    const element = _data[i];
    let _item = new props.elementModel();
    let _itemBackup = new props.elementModel();
    console.log(element);
    _item.copy(element);
    _item.init();

    _itemBackup.copy(_item);

    list.value.push(_item);
    listBackup.value.push(_itemBackup);
  }

  emit("onUpdated", list.value);
}
function restore() {
  element.value.copy(elementBackup.value);
  emit("onUpdated", element.value);
}

async function init() {
  localColumns.value = [
    ...props.columns,
    {
      label: "",
      field: "quick",
      width: "1%",
      rowClass: "th-buttons",
    },
  ];
}
init();
defineExpose({
  additem,
  validate,
  getListValue,
  copy,
  restore,
});
</script>
<template>
  <Table
    ref="tableRef"
    :rows="list"
    :columns="localColumns"
    :isLoading="isLoading"
  >
    <template
      v-for="(element, indexCol) in columns"
      :key="indexCol"
      #[element.field]="{ row, index }"
    >
      <slot
        :name="element.field"
        :row="row"
        :index="index"
        :validateLabel="validateLabel"
      ></slot>
    </template>

    <template v-slot:quick="{ row, index }">
      <div class="btns-container">
        <g-button
          icon="fa-solid fa-trash-can"
          @click.stop="deleteItem(index)"
          type="transparent-1"
          class="btn-row-table"
          title="Eliminar"
        />
      </div>
    </template>
  </Table>
</template>
<style></style>
<style scoped></style>
