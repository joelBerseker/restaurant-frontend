<script setup>
import Modal from "@/common/Modal.vue";
import ProductFormModalComponent from "@/components/product/ProductFormModalComponent.vue";
import FormButtons from "@/common/form/FormButtons.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const emit = defineEmits(["onRefreshList"]);

const modalRef = ref(null);
const formRef = ref(null);

const statusValue = ref(null);

/*INITIAL SETTINGS*/
const title = ref("Producto");
const titleBefore = ref(null);
const subTitle = ref(null);
const isLoading = ref(false);
const isFirstLoading = ref(false);

const idElement = ref(null);
const mode = ref(null);
const disabled = ref(false);
const elementText = ref(null);

function addMode() {
  idElement.value = null;
  mode.value = "add";
  titleBefore.value = "Agregar";
  subTitle.value = null;
  disabled.value = false;
  openModal();
  formRef.value.resetElement();
}
async function viewMode(_id = null) {
  mode.value = "view";
  titleBefore.value = "Visualizar";
  disabled.value = true;
  openModal();
  if (_id !== null) {
    isFirstLoading.value = true;
    idElement.value = _id;
    isLoading.value = true;
    subTitle.value = null;
    await formRef.value.getElement(_id);
    isFirstLoading.value = false;
    isLoading.value = false;
  }
}
function editMode() {
  mode.value = "edit";
  titleBefore.value = "Editar";
  disabled.value = false;
}
function closeModal() {
  modalRef.value.closeModal();
}
function openModal() {
  modalRef.value.openModal();
}
function haveId() {
  if (route.params.id) viewMode(route.params.id);
}
/*BUTTONS*/
async function onAdd() {
  if (!formRef.value.validateElement()) return;
  isLoading.value = true;
  let resp = await formRef.value.addElement();
  if (resp) {
    closeModal();
    emit("onRefreshList");
  }
  isLoading.value = false;
}
function onEdit() {
  editMode();
}
async function onSave() {
  if (!formRef.value.validateElement()) return;
  isLoading.value = true;
  let resp = await formRef.value.editElement();
  if (resp) {
    viewMode();
    emit("onRefreshList");
  }
  isLoading.value = false;
}
function onCancel() {
  viewMode();
  formRef.value.restoreElement();
}
async function onDelete() {
  isLoading.value = true;
  let resp = await formRef.value.deleteElement();
  if (resp) {
    closeModal();
    emit("onRefreshList");
  }
  isLoading.value = false;
}
async function onStatus() {
  isLoading.value = true;
  let resp = await formRef.value.editStatusElement();
  if (resp) {
    statusValue.value = resp;
    emit("onRefreshList");
  }
  isLoading.value = false;
}
function onUpdated(_data) {
  statusValue.value = _data.status.value;
  subTitle.value = _data.getText();
  elementText.value = _data.getTextModel();
}

defineExpose({
  addMode,
  viewMode,
});
</script>
<template>
  <Modal
    ref="modalRef"
    :titleModal="title"
    :titleBeforeModal="titleBefore"
    :subTitleModal="subTitle"
    :isLoading="isLoading"
    @onMountedModal="haveId"
  >
    <ProductFormModalComponent
      ref="formRef"
      :disabled="disabled"
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
