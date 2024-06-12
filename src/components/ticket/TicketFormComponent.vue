<script setup>
import { TicketModel } from "@/models";
import { ticketService, userService, tableService } from "@/services";
import { ref, onMounted, inject } from "vue";
const emit = defineEmits(["onFirstLoad"]);

const props = defineProps({
  disabled: { default: false },
  mode: { default: null },
});
const idElement = inject("idElement", null);
const formRef = ref(null);

/*CONSULTS*/
async function getElement(_id) {
  let resp = await ticketService.getTicket(_id);
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function addElement() {
  if (!formRef.value.validate()) return;
  let resp = await ticketService.addTicket(formRef.value.getElement());
  return resp;
}
async function editElement() {
  if (!formRef.value.validate()) return;
  let resp = await ticketService.updateTicket(formRef.value.getElement());
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function deleteElement() {
  let resp = await ticketService.deleteTicket(
    formRef.value.getElement().id.value
  );
  return resp;
}
async function editStatusElement() {
  let resp = await ticketService.changeStatusTicket(formRef.value.getElement());
  if (resp) return formRef.value.getElement().status.value;
  return;
}
function restoreElement() {
  formRef.value.restore();
}
function resetElement() {
  formRef.value.reset();
}
onMounted(async () => {
  if (idElement) await getElement(idElement);
  emit("onFirstLoad");
});
defineExpose({
  getElement,
  addElement,
  editElement,
  deleteElement,
  restoreElement,
  resetElement,
  editStatusElement,
});
</script>
<template>
  <g-form
    ref="formRef"
    :elementModel="TicketModel"
    v-slot="{ element, validateLabel }"
  >
    <g-section-2 title="Información General" contentClass="row gutter-form">
      <g-input-val
        v-model="element.code"
        :label="element.code.name"
        @validate="validateLabel"
        :disabled="true"
        :viewMode="disabled"
        class="col-4"
      />
      <g-input-val
        v-model="element.ruc"
        :label="element.ruc.name"
        @validate="validateLabel"
        :disabled="disabled"
        class="col-4"
      />
      <g-input-val
        v-model="element.discount"
        :label="element.discount.name"
        @validate="validateLabel"
        :disabled="disabled"
        class="col-4"
      />
      <g-input-val
        v-model="element.priceTotal"
        :label="element.priceTotal.name"
        @validate="validateLabel"
        :disabled="disabled"
        class="col-4"
      />
      <g-select-consult-val
        v-model="element.user_id"
        :label="element.user_id.name"
        :disabled="disabled"
        @validate="validateLabel"
        :consult="userService.getListUser"
        :filter="{
          order: 'asc',
          orderBy: 'first_name',
          searchBy: ['first_name'],
        }"
        class="col-4"
      />
      <g-select-consult-val
        v-model="element.table_id"
        :label="element.table_id.name"
        :disabled="disabled"
        @validate="validateLabel"
        :consult="tableService.getListTable"
        :filter="{ order: 'asc', orderBy: 'name', searchBy: ['name'] }"
        class="col-4"
      />
    </g-section-2>
  </g-form>
</template>
