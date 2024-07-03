<script setup>
import TableConsult from "@/common/table/TableConsult.vue";
import TableButtons from "@/common/table/TableButtons.vue";
import ReservationElementModalComponent from "@/components/reservation/ReservationElementModalComponent.vue";
import { ref, reactive, onMounted, inject } from "vue";
import { reservationService } from "@/services";
import { formatSubTitle } from "@/helpers";
import { ReservationModel } from "@/models";
const emit = defineEmits(["onFirstLoad"]);

const tableRef = ref(null);
const modalRef = ref(null);

const subTitle = ref(null);

const elementModel = ref(new ReservationModel());
const table = reactive({
  columns: elementModel.value.getDataTable(),

  defaultFilter: {
    order: "asc",
    orderBy: "date",
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
function onUpdate(_data) {
  subTitle.value = formatSubTitle.countElement(_data);
}
function onFirstLoad() {
  emit("onFirstLoad");
}

const switchSearchValue = ref(false);
function switchSearch() {
  switchSearchValue.value = tableRef.value.switchSearch();
}
</script>
<template>
  <ReservationElementModalComponent ref="modalRef" @onRefreshList="refresh" />
  <g-section-1 :subTitle="subTitle" :refresh="true" @onRefresh="refresh()">
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
        filterCacheName="reservation"
        :defaultFilter="table.defaultFilter"
        :deleteConsult="reservationService.deleteReservation"
        :getListConsult="reservationService.getListReservation"
        @onViewItem="viewItem"
        @onUpdate="onUpdate"
        @onFirstLoad="onFirstLoad"
        @onFilterCache="switchSearchValue = true"
      ></TableConsult>
    </template>
  </g-section-1>
</template>
