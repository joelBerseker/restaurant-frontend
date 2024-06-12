<script setup>
import { useSlots, ref, computed, inject } from "vue";
import { Model } from "@/models";
const confirmDialogue = inject("confirmDialogue");

const props = defineProps({
  table: {},
  tableClass: {
    default: "basic-table basic-table-hover borderless-table ",
  },
  tableContainerClass: {
    default: "basic-table-shadow",
  },

  elementModel: {
    default: Model,
  },
  settings: { default: null },
  viewMode: {
    default: false,
  },
  buttonAdd: {
    default: true,
  },
  buttonDelete: {
    default: true,
  },
});

const list = ref([]);
const slots = useSlots();

const activeColumns = computed(() => {
  let resp = [];
  for (let i = 0; i < props.table.columns.length; i++) {
    const element = props.table.columns[i];
    if (element.label === "buttons") continue;
    if (element.disabled !== true) {
      resp.push(element);
    }
  }
  return resp;
});

function rowClicked(row, index) {
  emit("rowClicked", row, index);
}
function sortColumn(column) {
  let auxSort = column.sort;
  props.table.columns.forEach((element) => {
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
    resp = "bi bi-arrow-up";
  } else if (sort === "desc") {
    resp = "bi bi-arrow-down";
  } else {
    resp = "bi bi-arrow-down-up";
  }
  return resp;
}
function additem() {
  props.table.rows.push(new props.elementModel());
  emit("addItem");
}
async function deleteItem(index) {
  let confirm = await confirmDialogue("delete");
  if (!confirm) return;
  let itemDeleted = props.table.rows[index];
  props.table.rows.splice(index, 1);
  console.log(itemDeleted);
  emit("deleteItem", index, itemDeleted);
}

function focusNext(_data) {
  if (_data.index > props.table.rows.length - 2) return;

  document.getElementById(_data.label + (_data.index + 1)).focus();
}

function focusBefore(_data) {
  if (_data.index < 1) return;

  document.getElementById(_data.label + (_data.index - 1)).focus();
}

const emit = defineEmits(["rowClicked", "sort", "deleteItem", "addItem"]);

function getDinamicClass(_element) {
  if (_element.rowClass !== undefined) {
    return _element.rowClass.value;
  } else if (_element.rowClassDinamic !== undefined) {
    return _element.rowClassDinamic();
  }
  return null;
}
defineExpose({
  additem,
});
</script>
<template>
  <div class="container-table">
    <div v-if="!viewMode && buttonAdd" class="mb-g text-end">
      <g-button
        icon="bi bi-arrow-90deg-down"
        text="Agregar"
        type="secondary"
        @click="additem()"
      ></g-button>
    </div>
    <table-container
      :loading="table.isLoading"
      :tableContainerClass="tableContainerClass"
    >
      <table :class="['w-100', tableClass]">
        <thead v-if="table.rows.length > 0">
          <tr>
            <th
              v-for="(element, index) in activeColumns"
              :style="
                'width: ' +
                element.width +
                '; min-width: ' +
                element.minWidth +
                'px;'
              "
              :class="[element.headerClass, element.columnClass]"
            >
              <div
                v-if="element.sortable"
                class="column-class sortable-column"
                @click="sortColumn(element)"
              >
                {{ element.label }}
                <div class="icon-container">
                  <i :class="[iconCurrentSort(element.sort), 'icon-class']"></i>
                </div>
              </div>
              <div class="column-class" v-else>{{ element.label }}</div>
            </th>
            <th v-if="!viewMode && buttonDelete" style="width: 1%"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(element, index) in table.rows"
            :class="['basic-table-row', getDinamicClass(element)]"
          >
            <td
              v-for="(element2, index2) in activeColumns"
              :class="[element2.rowClass, element2.columnClass]"
            >
              <div>
                <slot
                  :name="element2.field"
                  :label="element2.field"
                  :row="element"
                  :index="index"
                  :focusNext="focusNext"
                  :focusBefore="focusBefore"
                ></slot>
              </div>
            </td>

            <td v-if="!viewMode && buttonDelete">
              <div v-if="table.showDeleteButton !== undefined">
                <g-button
                  v-if="table.showDeleteButton(index)"
                  icon="bi bi-trash"
                  tabindex="-1"
                  @click="deleteItem(index)"
                  type="transparent"
                  textColor="dark"
                  title="Eliminar"
                />
              </div>
              <div v-else>
                <g-button
                  tabindex="-1"
                  icon="bi bi-trash"
                  @click="deleteItem(index)"
                  type="transparent"
                  textColor="dark"
                  title="Eliminar"
                />
              </div>
            </td>
          </tr>

          <tr v-if="table.rows.length <= 0" class="text-center">
            <td :colspan="activeColumns.length + 1" class="empty-text-table">
              No se encontraron registros.
            </td>
          </tr>
        </tbody>
      </table>
    </table-container>
  </div>
</template>
<style scoped>
.buttons-with-title {
  text-align: end;
}
.g-header-table {
  --bs-gutter-y: var(--g-space-default);
  --bs-gutter-x: 0.25rem;
  margin-bottom: 1.25rem;
}
.table-buttons {
  /*padding-right: 0.8rem !important;
  padding-top: calc(1rem - 0.25rem - 1px) !important;
  padding-bottom: calc(1rem - 0.25rem - 1px) !important;*/
}
.table-title-container {
  display: flex;
  justify-content: space-between;
  /*background-color: var(--g-pc500);*/
  /* border-bottom: 1px solid var(--g-color-line);*/
}
.table-title {
  text-transform: uppercase;
  font-size: 16px;

  /* color: var(--g-wb100);*/

  /*padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  padding-left: 0.8rem !important;
  padding-right: 0.8rem !important;*/
}

.container-table {
  /*background-color: white;*/
  /*border: 1px solid var(--g-color-line);
  border-radius: var(--g-br1);*/
  overflow: hidden;
}
.header-table {
}
.alternative-list {
  overflow: hidden;
}
.sortable-column {
  display: flex;
  /*justify-content: space-between;*/
  cursor: pointer;
}
.column-class {
}
.icon-class {
  margin-left: 0.4rem;
}
.icon-container {
  display: flex;
  align-items: end;
}
.title-th {
  border-left: none !important;
  border-bottom: 1px !important;
  border-top: 1px !important;
  border: 1px solid var(--g-color-line) !important;
  background-color: white !important;
  color: black !important;
  font-size: 14px;
}
</style>
