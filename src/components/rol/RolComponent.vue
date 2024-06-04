<script setup>
import TableConsult from "@/common/table/TableConsult.vue";
import TableButtons from "@/common/table/TableButtons.vue";
import RolItemModalComponent from "@/components/rol/RolItemModalComponent.vue";
import { ref, reactive, onMounted, inject } from "vue";
import { rolService } from "@/services";
const tableRef = ref(null);
const modalRef = ref(null);

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
      sort: "desc",
    },
    {
      label: "Descripción",
      field: "description",
      sortable: true,
      searchable: true,
    },
  ],
  filter: {
    order: "desc",
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
</script>
<template>
  <RolItemModalComponent
    ref="modalRef"
    @onAdded="refresh"
    @onDeleted="refresh"
    @onEdited="refresh"
    @onEditedStatus="refresh"
  />
  <g-section-1 name="rol" :refresh="true" @onRefresh="refresh()">
    <template #buttons> <TableButtons @onAdd="addItem" /> </template>
    <template #content>
      <TableConsult
        ref="tableRef"
        :columns="table.columns"
        :filter="table.filter"
        :deleteConsult="rolService.deleteRol"
        :getListConsult="rolService.getListRol"
        @onViewItem="viewItem"
      ></TableConsult>
    </template>
  </g-section-1>
</template>
