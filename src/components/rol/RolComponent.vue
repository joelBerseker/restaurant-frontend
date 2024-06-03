<script setup>
import TableConsult from "@/common/table/TableConsult.vue";
import TableButtons from "@/common/table/TableButtons.vue";
import { ref, reactive, onMounted, inject } from "vue";
const table = reactive({
  columns: [
    {
      label: "ID",
      field: "id",
      sortable: true,
    },
    {
      label: "Nombre",
      field: "name",
      sortable: true,
      searchable: true,
    },
    {
      label: "Nombre2",
      field: "name2",
      sortable: true,
      searchable: true,
    },
    {
      label: "Nombre3",
      field: "name3",
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
</script>
<template>
  <g-section-1 name="rol" :refresh="true">
    <template #buttons> <TableButtons /> </template>
    <template #content>
      <TableConsult
        :columns="table.columns"
        :filter="table.filter"
      ></TableConsult>
    </template>
  </g-section-1>
</template>
