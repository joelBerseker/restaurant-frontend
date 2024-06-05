<script setup>
import TableConsult from "@/common/table/TableConsult.vue";
import TableButtons from "@/common/table/TableButtons.vue";

import { ref, reactive, onMounted, inject } from "vue";
import { userService } from "@/services";
import { subTitleGen } from "@/helpers";
import { useRouter } from "vue-router";

const router = useRouter();

const tableRef = ref(null);

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
      label: "Nombres",
      field: "first_name",
      sortable: true,
      searchable: true,
      sort: "asc",
    },
    {
      label: "Apellidos",
      field: "last_name",
      sortable: true,
      searchable: true,
    },
    {
      label: "Correo Electronico",
      field: "email",
      sortable: true,
      searchable: true,
    },
  ],
  filter: {
    order: "asc",
    orderBy: "first_name",
    status: "1",
  },
});
function refresh() {
  tableRef.value.refresh();
}
function viewItem(_data) {
  console.log(_data);
  router.push({ name: "userDetail", params: { id: _data.id } });
}
function addItem() {
  router.push({ name: "userAdd" });
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
  <g-section-1
    name="user"
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
        :deleteConsult="userService.deleteUser"
        :getListConsult="userService.getListUser"
        @onViewItem="viewItem"
        @onGotList="onGotList"
      ></TableConsult>
    </template>
  </g-section-1>
</template>
