<script setup>
import TableConsult from "@/common/table/TableConsult.vue";
import TableButtons from "@/common/table/TableButtons.vue";
import RolElementModalComponent from "@/components/rol/RolElementModalComponent.vue";
import { ref, reactive, onMounted, inject } from "vue";
import { rolService } from "@/services";
import { subTitleGen } from "@/helpers";
const tableRef = ref(null);
const modalRef = ref(null);

const subTitle = ref(null);
const table = reactive({
  columns: [
    {
      label: "ID",
      field: "id",
      sortable: true,
      width: "1%",
    },
    {
      label: "Nombre",
      field: "name",
      sortable: true,
      searchable: true,
      sort: "asc",
    },
    {
      label: "Descripción",
      field: "description",
      sortable: true,
      searchable: true,
    },
  ],
  filter: {
    order: "asc",
    orderBy: "name",
    status: "1",
  },
});
function refresh() {
  tableRef.value.refresh();
}
function viewItem(_data) {
  console.log(_data);
  modalRef.value.viewMode(_data.id);
}
function addItem() {
  modalRef.value.addMode();
}
function onGotList(_data) {
  subTitle.value = subTitleGen.countElement(_data);
}

const switchSearchValue = ref(false);
function switchSearch() {
  switchSearchValue.value = tableRef.value.switchSearch();
}
</script>
<template>
  <RolElementModalComponent
    ref="modalRef"
    @onAdded="refresh"
    @onDeleted="refresh"
    @onEdited="refresh"
    @onEditedStatus="refresh"
  />
  <g-section-1
    name="rol"
    :subTitle="subTitle"
    :refresh="true"
    @onRefresh="refresh()"
  >
    <template #buttons>
      <TableButtons
        :switchSearchValue="switchSearchValue"
        @onAdd="addItem"
        @onSearch="switchSearch"
      />
    </template>
    <template #content>
      <TableConsult
        ref="tableRef"
        :columns="table.columns"
        :filter="table.filter"
        :deleteConsult="rolService.deleteRol"
        :getListConsult="rolService.getListRol"
        @onViewItem="viewItem"
        @onGotList="onGotList"
      ></TableConsult>
    </template>
  </g-section-1>
</template>
