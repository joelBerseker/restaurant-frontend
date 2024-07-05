<script setup>
import { formatData } from "@/helpers";
import { ReservationModel } from "@/models";
import { reservationService, userService } from "@/services";
import { ref } from "vue";

const props = defineProps({
  disabled: { default: false },
  mode: { default: null },
});

const formRef = ref(null);

/*CONSULTS*/
async function getElement(_id) {
  let resp = await reservationService.getReservation(_id);
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function addElement() {
  let resp = await reservationService.addReservation(
    formRef.value.getElement()
  );
  return resp;
}
async function editElement() {
  let resp = await reservationService.updateReservation(
    formRef.value.getElement()
  );
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function deleteElement() {
  let resp = await reservationService.deleteReservation(
    formRef.value.getElement().id.value
  );
  return resp;
}
async function editStatusElement() {
  let resp = await reservationService.changeStatusReservation(
    formRef.value.getElement()
  );
  if (resp) return formRef.value.getElement().status.value;
  return;
}
function restoreElement() {
  formRef.value.restore();
}
function resetElement() {
  formRef.value.reset();
}
function validateElement() {
  return formRef.value.validate();
}
function setLabelValueAll(key, value) {
  formRef.value.setLabelValueAll(key, value);
}
defineExpose({
  getElement,
  addElement,
  editElement,
  deleteElement,
  restoreElement,
  resetElement,
  editStatusElement,
  validateElement,
  setLabelValueAll,
});
</script>
<template>
  <g-form
    ref="formRef"
    :elementModel="ReservationModel"
    v-slot="{ element, validateLabel }"
    class="row gutter-form"
  >
    <g-select-consult-val
      v-show="mode !== 'edit'"
      v-model="element.user_id"
      :label="element.user_id.name"
      :disabled="true"
      :viewMode="disabled"
      :consult="userService.getListUser"
    />
    <g-input-val
      :label="element.name.name"
      v-model="element.name"
      :disabled="disabled"
      @validate="validateLabel"
    />

    <g-input-val
      :label="element.date.name"
      v-model="element.date"
      :disabled="disabled"
      @validate="validateLabel"
      :display="formatData.dates"
      class="col-6"
    />
    <g-input-val
      :label="element.hour.name"
      v-model="element.hour"
      :disabled="disabled"
      @validate="validateLabel"
      :display="formatData.times"
      class="col-6"
    />
    <g-input-val
      :label="element.number_person.name"
      v-model="element.number_person"
      :disabled="disabled"
      @validate="validateLabel"
    />
    <g-input-val
      :label="element.description.name"
      v-model="element.description"
      :disabled="disabled"
      @validate="validateLabel"
    />
  </g-form>
</template>
