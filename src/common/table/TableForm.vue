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
  mode: { default: "add" },
});
const emit = defineEmits([
  "onDeleteElement",
  "onSaveElement",
  "onNewElement",

  "addItem",
  "onUpdated",

  "onChangeDisabled",
]);

const list = ref([]);
const listBackup = ref([]);

const listDisabled = ref([]); /*CONTROLAR LOS INPUT INDIVIDUALMENTE */
const disabled = ref(false); /*CONTROLAR LOS BOTONES INDIVIDUALMENTE */
const listMode = ref([]); /*CONTROLAR LOS BOTONES INDIVIDUALMENTE */

const localColumns = ref([]);

function additem() {
  list.value.push(new props.elementModel());

  console.log(props.mode);
  if (props.mode !== "add") {
    console.log("no add");
    emit("onChangeDisabled", true);
    disabled.value = true;
    listMode.value.push("new");
  } else {
    listMode.value.push("add");
  }
  listDisabled.value.push(false);

  emit("addItem");
  emit("onUpdated", list.value);
}
async function deleteElement(index) {
  let confirm = await confirmDialogue("delete");
  if (!confirm) return;
  let itemDeleted = list.value[index];

  if (itemDeleted.id.value) {
    console.log("delete consult");
    emit("onDeleteElement", itemDeleted.id.value);
  } else {
    disabled.value = false;

    emit("onChangeDisabled", false);
    list.value.splice(index, 1);
    listDisabled.value.splice(index, 1);
    listMode.value.splice(index, 1);
    emit("onUpdated", list.value);
  }
}
function valdiateElement(_data) {
  let resp = _data.validate();
  if (!resp.value) {
    useToast.show("validation_error", {
      list_error: resp.list,
    });
  }

  return resp.value;
}
async function newElement(_data) {
  if (!valdiateElement(_data)) return;

  emit("onNewElement", _data);
}
async function saveElement(_data) {
  if (!valdiateElement(_data)) return;

  emit("onSaveElement", _data);
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
  listDisabled.value = [];
  listMode.value = [];

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
    listDisabled.value.push(true);
    listMode.value.push("view");
  }

  emit("onUpdated", list.value);
}
function edit(index) {
  emit("onChangeDisabled", true);

  disabled.value = true;

  listDisabled.value[index] = false;
  listMode.value[index] = "edit";
}
function cancel(index) {
  emit("onChangeDisabled", false);
  disabled.value = false;

  listDisabled.value[index] = true;
  listMode.value[index] = "view";
  list.value[index].copy(listBackup.value[index]);
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

function changeDisabled(_value) {
  disabled.value = _value;
  emit("onChangeDisabled", _value);
}
init();
defineExpose({
  additem,
  validate,
  getListValue,
  copy,
  changeDisabled,
  list,
});
</script>
<template>
  <Table
    ref="tableRef"
    :rows="list"
    :columns="localColumns"
    :isLoading="isLoading"
  >
    <template #spaceBelow="{ activeColumns }">
      <slot name="spaceBelow" :activeColumns="activeColumns"></slot>
    </template>

    <template #additionalSpace="{ row, index }">
      <slot
        name="additionalSpace"
        :row="row"
        :index="index"
        :validateLabel="validateLabel"
        :disabledRow="listDisabled[index]"
      ></slot>
    </template>
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
        :disabledRow="listDisabled[index]"
      ></slot>
    </template>

    <template v-slot:quick="{ row, index }">
      <div
        :class="[
          'btns-container',
          !listDisabled[index] ? 'fix-padding-disabled' : '',
        ]"
      >
        <div v-if="listMode[index] === 'add'">
          <g-button
            icon="fa-solid fa-trash-can"
            @click.stop="deleteElement(index)"
            type="transparent-1"
            class="btn-row-table"
            title="Eliminar"
          />
        </div>
        <div v-else-if="listMode[index] === 'new'" class="btns-container">
          <g-button
            icon="fa-solid fa-trash-can"
            @click.stop="deleteElement(index)"
            type="transparent-1"
            class="btn-row-table"
            title="Eliminar"
          />
          <g-button
            icon="fa-solid fa-plus"
            @click.stop="newElement(row)"
            class="btn-row-table"
            title="Agregar"
          />
        </div>
        <div v-else-if="listMode[index] === 'view'" class="btns-container">
          <g-button
            icon="fa-solid fa-trash-can"
            @click.stop="deleteElement(index)"
            type="transparent-1"
            class="btn-row-table"
            title="Eliminar"
            :disabled="disabled"
          />
          <g-button
            icon="fa-solid fa-pen-to-square"
            @click.stop="edit(index)"
            type="transparent-1"
            class="btn-row-table"
            title="Editar"
            :disabled="disabled"
          />
        </div>
        <div v-else class="btns-container">
          <g-button
            icon="fa-solid fa-arrow-left"
            @click.stop="cancel(index)"
            type="transparent-1"
            class="btn-row-table"
            title="Cancelar"
          />
          <g-button
            icon="fa-solid fa-check"
            @click.stop="saveElement(row)"
            class="btn-row-table"
            title="Guardar"
          />
        </div>
      </div>
    </template>
  </Table>
</template>
<style></style>
<style scoped>
.btns-container {
  display: flex;
}
.fix-padding-disabled {
  padding-top: calc(0.25rem + 1px);
}
</style>
