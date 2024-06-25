<script setup>
import { useSlots, ref, computed, inject } from "vue";
import { useToastStore } from "@/stores";
import TableContainer from "@/common/container/TableContainer.vue";
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
const emit = defineEmits([
  "rowClicked",
  "sort",
  "deleteItem",
  "addItem",
  "onUpdated",
]);

const list = ref([]);
const listBackup = ref([]);

const slots = useSlots();

const activeColumns = computed(() => {
  let resp = [];
  props.columns.forEach((element) => {
    if (element.disabled !== true) {
      resp.push(element);
    }
  });
  return resp;
});

function rowClicked(row, index) {
  emit("rowClicked", row, index);
}
function sortColumn(column) {
  if (column.sortable !== true) return;

  let auxSort = column.sort;
  props.columns.forEach((element) => {
    element.sort = undefined;
  });
  if (auxSort === "asc") {
    column.sort = "desc";
  } else {
    column.sort = "asc";
  }
  const resp = {
    orderBy: column.field,
    order: column.sort,
  };
  emit("sort", resp);
}
function iconCurrentSort(sort) {
  let resp = "";
  if (sort === "asc") {
    resp = "fa-solid fa-arrow-up-a-z";
  } else if (sort === "desc") {
    resp = "fa-solid fa-arrow-down-z-a";
  } else {
    resp = "fa-solid fa-arrow-down-up-across-line";
  }
  return resp;
}

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
defineExpose({
  additem,
  validate,
  getListValue,
  copy,
  restore,
});
</script>
<template>
  <table-container
    :isLoading="isLoading"
    :tableContainerClass="tableContainerClass"
    :rowsLength="list.length"
  >
    <table :class="['w-100', tableClass, noHeader ? 'table-no-header' : '']">
      <thead v-if="!noHeader">
        <tr>
          <th
            v-for="(col, index) in activeColumns"
            :style="'width: ' + col.width + ';'"
            :class="[
              col.headerClass,
              col.columnClass,
              col.sortable ? 'sortable-column' : '',
              col.sort ? 'sort-column' : '',
            ]"
            @click="sortColumn(col)"
          >
            <span> {{ col.label }}</span>
            <span v-if="col.sortable" class="ms-1">
              <font-awesome-icon :icon="iconCurrentSort(col.sort)" />
            </span>
          </th>
          <th v-if="!viewMode" style="width: 1%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in list" @click="rowClicked(row, index)">
          <td
            v-for="(col, index2) in activeColumns"
            :class="[col.rowClass, col.columnClass]"
            :style="'width: ' + col.width + ';'"
          >
            <slot
              :name="col.field"
              :row="row"
              :index="index"
              :validateLabel="validateLabel"
            ></slot>
          </td>
          <td v-if="!viewMode">
            <g-button
              icon="fa-solid fa-trash-can"
              @click.stop="deleteItem(index)"
              type="transparent-1"
              class="btn-row-table"
              title="Eliminar"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </table-container>
</template>
<style></style>
<style scoped></style>
