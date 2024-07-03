<script setup>
import { isEmpty } from "@/helpers";
import { TicketModel } from "@/models";
import { ticketService, userService, tableService } from "@/services";
import { ref, onMounted, inject, computed } from "vue";
import FormButtons from "@/common/form/FormButtons.vue";

const emit = defineEmits(["onFirstLoad", "onSave", "onCancel", "onEdit"]);

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
async function addElement(_list) {
  let resp = await ticketService.addTicket(formRef.value.getElement(), _list);
  return resp;
}
async function editElement() {
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
function validateElement() {
  return formRef.value.validate();
}
function changeTotal(_value) {
  formRef.value.getElement().priceTotal.value = _value;

  changeDiscount();
}
function changeDiscount() {
  let priceTotal = formRef.value.getLabelValue("priceTotal");

  let discount = formRef.value.getLabelValue("discount");

  let numDisc = Number(discount);

  if (!isNaN(numDisc) && numDisc > 0) {
    let priceDisc = priceTotal * (numDisc / 100);
    let calc = Number(priceTotal) - priceDisc;
    formRef.value.getElement().priceFinal.default = calc.toFixed(2);
  } else {
    formRef.value.getElement().priceFinal.default = priceTotal;
  }
}
const totalCorrect = computed(() => {
  if (formRef.value) {
    let priceTotal = formRef.value.getLabelValue("priceTotal");
    let priceFinal = formRef.value.getLabelValue("priceFinal");
    if (priceTotal !== priceFinal) {
      return "El precio final ha sido cambiado";
    }
  }
  return null;
});
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
  validateElement,
  changeTotal,
});
</script>
<template>
  <g-form
    ref="formRef"
    :elementModel="TicketModel"
    v-slot="{ element, validateLabel }"
  >
    <g-section-4 title="Información General" contentClass="row gutter-form">
      <g-input-val
        v-show="mode === 'view'"
        v-model="element.code"
        :label="element.code.name"
        @validate="validateLabel"
        :disabled="true"
        :viewMode="disabled"
      />
      <g-select-consult-val
        v-show="mode === 'view'"
        v-model="element.user_id"
        :label="element.user_id.name"
        :disabled="disabled"
        @validate="validateLabel"
        :consult="userService.getListUser"
      />
      <g-input-val
        v-show="mode !== 'view' || !isEmpty(element.ruc.value)"
        v-model="element.ruc"
        :label="element.ruc.name"
        @validate="validateLabel"
        :disabled="disabled"
      />

      <g-select-consult-val
        v-show="mode !== 'view' || !isEmpty(element.table_id.value)"
        v-model="element.table_id"
        :label="element.table_id.name"
        :disabled="disabled"
        @validate="validateLabel"
        :consult="tableService.getListTable"
        :filter="{ order: 'asc', orderBy: 'name', searchBy: ['name'] }"
      />
      <g-input-val
        v-model="element.discount"
        :label="element.discount.name"
        @validate="validateLabel"
        :disabled="disabled"
        @change="changeDiscount"
      >
        <template #next>&nbsp;%</template>
      </g-input-val>
      <div>
        <g-input-val
          v-model="element.priceFinal"
          :label="element.priceFinal.name"
          @validate="validateLabel"
          :disabled="disabled"
        >
          <template #prev>S/.&nbsp;</template>
        </g-input-val>
        <div v-show="totalCorrect" class="help-text">
          <font-awesome-icon icon="fa-regular fa-circle-question" />
          <span>&nbsp;{{ totalCorrect }}</span>
        </div>
      </div>

      <template v-if="mode !== 'add'" #bottomButtons>
        <FormButtons
          class="start-left"
          :mode="mode"
          @onEdit="emit('onEdit')"
          @onCancel="emit('onCancel')"
          @onSave="emit('onSave')"
          :showDelete="false"
        />
      </template>
    </g-section-4>
  </g-form>
</template>
