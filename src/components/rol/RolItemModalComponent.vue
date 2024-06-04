<script setup>
import Modal from "@/common/Modal.vue";
import RolFormComponent from "@/components/rol/RolFormComponent.vue";
import FormButtons from "@/common/form/FormButtons.vue";

import { reactive, ref } from "vue";

const emit = defineEmits(["onAdded", "onDeleted", "onEdited"]);

const modalRef = ref(null);
const formRef = ref(null);

const modal = reactive({
  title: "Rol",
  titleBefore: "",
  isLoading: false,
});
const mode = ref(null);
const disabled = ref(false);

function addMode() {
  mode.value = "add";
  modal.titleBefore = "Agregar";
  disabled.value = false;
  openModal();
  formRef.value.resetElement();
}
async function viewMode(_id = null) {
  modal.isLoading = true;
  mode.value = "view";
  modal.titleBefore = "Visualizar";
  disabled.value = true;
  openModal();
  if (_id !== null) await formRef.value.getElement(_id);
  modal.isLoading = false;
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

function onAdd() {
  formRef.value.addElement();
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
function onDelete() {
  formRef.value.deleteElement();
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
  >
    <RolFormComponent
      ref="formRef"
      :disabled="disabled"
      @onAdded="onAdded"
      @onEdited="onEdited"
      @onDeleted="onDeleted"
    />
    <template #footer>
      <FormButtons
        :mode="mode"
        @onAdd="onAdd"
        @onEdit="onEdit"
        @onCancel="onCancel"
        @onSave="onSave"
        @onDelete="onDelete"
      />
    </template>
  </Modal>
</template>
