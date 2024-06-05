<script setup>
import Modal from "@/common/Modal.vue";
import RolFormComponent from "@/components/rol/RolFormComponent.vue";
import FormButtons from "@/common/form/FormButtons.vue";

import { reactive, ref } from "vue";
import { status, subTitleGen } from "@/helpers";

const emit = defineEmits([
  "onAdded",
  "onDeleted",
  "onEdited",
  "onEditedStatus",
]);

const modalRef = ref(null);
const formRef = ref(null);

const statusValue = ref(null);

const modal = reactive({
  title: "Rol",
  titleBefore: "",
  subTitle: "0014 - ADMINISTRADOR",

  isLoading: false,
});
const mode = ref(null);
const disabled = ref(false);
const elementText = ref(null);

function addMode() {
  mode.value = "add";
  modal.titleBefore = "Agregar";
  modal.subTitle = null;
  disabled.value = false;
  openModal();
  formRef.value.resetElement();
}
async function viewMode(_id = null) {
  mode.value = "view";
  modal.titleBefore = "Visualizar";
  disabled.value = true;
  openModal();
  if (_id !== null) {
    modal.isLoading = true;
    modal.subTitle = null;
    formRef.value.resetElement();
    await formRef.value.getElement(_id);
    modal.isLoading = false;
  }
}
function editMode() {
  mode.value = "edit";
  modal.titleBefore = "Editar";
  disabled.value = false;
}
function closeModal() {
  modalRef.value.closeModal();
}
function openModal() {
  modalRef.value.openModal();
}

async function onAdd() {
  modal.isLoading = true;
  await formRef.value.addElement();
  modal.isLoading = false;
}
function onEdit() {
  editMode();
}
async function onSave() {
  modal.isLoading = true;
  await formRef.value.editElement();
  modal.isLoading = false;
}
function onCancel() {
  viewMode();
  formRef.value.restoreElement();
}
async function onDelete() {
  modal.isLoading = true;
  await formRef.value.deleteElement();
  modal.isLoading = false;
}
async function onStatus() {
  modal.isLoading = true;
  await formRef.value.editStatusElement();
  modal.isLoading = false;
}

function onGot(_data) {
  console.log(_data);
  statusValue.value = _data.status.value;
}
function onAdded() {
  closeModal();
  emit("onAdded");
}
function onEdited() {
  viewMode();
  emit("onEdited");
}
function onDeleted() {
  closeModal();
  emit("onDeleted");
}
function onUpdated(_data) {
  console.log(_data);
  modal.subTitle = _data.getText();
  elementText.value = _data.getTextModel();
}
function onEditedStatus(_value) {
  statusValue.value = _value;
  emit("onEditedStatus");
}
defineExpose({
  addMode,
  viewMode,
});
</script>
<template>
  <Modal
    ref="modalRef"
    :titleModal="modal.title"
    :titleBeforeModal="modal.titleBefore"
    :subTitleModal="modal.subTitle"
    :isLoading="modal.isLoading"
  >
    <RolFormComponent
      ref="formRef"
      :disabled="disabled"
      @onGot="onGot"
      @onAdded="onAdded"
      @onEdited="onEdited"
      @onDeleted="onDeleted"
      @onEditedStatus="onEditedStatus"
      @onUpdated="onUpdated"
    />
    <template #footer>
      <FormButtons
        :mode="mode"
        :statusValue="statusValue"
        :elementText="elementText"
        @onAdd="onAdd"
        @onEdit="onEdit"
        @onCancel="onCancel"
        @onSave="onSave"
        @onDelete="onDelete"
        @onStatus="onStatus"
      />
    </template>
  </Modal>
</template>
