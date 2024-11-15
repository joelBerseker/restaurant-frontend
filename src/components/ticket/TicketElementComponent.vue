<script setup>
import TicketFormComponent from "@/components/ticket/TicketFormComponent.vue";
import TicketDetailFormComponent from "@/components/ticket/TicketFormDetailComponent.vue";
import TicketPrintComponent from "@/components/ticket/TicketPrintComponent.vue";

import FormButtons from "@/common/form/FormButtons.vue";
import LoadingContainer from "@/common/container/LoadingContainer.vue";
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import { sleep, printDocument } from "@/helpers";

const emit = defineEmits(["onFirstLoad"]);

const router = useRouter();

const formRef = ref(null);
const listFormRef = ref(null);

const statusValue = ref(null);

const elementData = ref(null);

/*INITIAL SETTINGS*/

const subTitle = ref(null);
const isLoading = ref(false);

const idElement = inject("idElement", null);
const mode = ref(null);
const disabled = ref(false);
const elementText = ref(null);

function addMode() {
  mode.value = "add";
  disabled.value = false;
}
async function viewMode(_id = null) {
  mode.value = "view";
  disabled.value = true;
}
function editMode() {
  mode.value = "edit";
  disabled.value = false;
}
function toList() {
  router.push({ name: "ticket" });
}

/*BUTTONS*/
async function onAdd() {
  let _valElement = formRef.value.validateElement();
  await sleep(0);
  let _valList = listFormRef.value.validateList();

  if (!_valElement || !_valList) return;
  isLoading.value = true;

  let resp = await formRef.value.addElement(listFormRef.value.getListValue());
  if (resp) {
    toList();
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
    toList();
  }
  isLoading.value = false;
}
async function onStatus() {
  isLoading.value = true;
  let resp = await formRef.value.editStatusElement();
  if (resp) {
    statusValue.value = resp;
  }
  isLoading.value = false;
}
const printData = ref({});
const printRef = ref(null);
function onPrint() {
  printRef.value.print();
}
function onUpdated(_data) {
  console.log(_data);
  printData.value.header = _data;
  elementData.value = _data;

  statusValue.value = _data.status.value;
  subTitle.value = _data.getText();
  elementText.value = _data.getTextModel();
}
function onUpdatedDetail(_data) {
  printData.value.detail = _data;
}
function onChangeTotal(_value) {
  formRef.value.changeTotal(_value);
}
function onFirstLoad() {
  emit("onFirstLoad");
}
function init() {
  if (idElement) viewMode();
  else addMode();
}
init();
defineExpose({
  addMode,
  viewMode,
});
</script>
<template>
  <LoadingContainer :loading="isLoading" loadingClass="loading-transparent">
    <g-section-1 :subTitle="subTitle">
      <template #buttons>
        <FormButtons
          :mode="mode"
          :statusValue="statusValue"
          :elementText="elementText"
          @onAdd="onAdd"
          @onCancel="onCancel"
          @onSave="onSave"
          @onDelete="onDelete"
          @onStatus="onStatus"
          :showEdit="false"
          @onPrint="onPrint"
          :showPrint="true"
        />
      </template>
      <template #content>
        <div class="row gutter-sec">
          <div class="col-4">
            <TicketFormComponent
              ref="formRef"
              :disabled="disabled"
              :mode="mode"
              @onUpdated="onUpdated"
              @onFirstLoad="onFirstLoad"
              @onEdit="onEdit"
              @onCancel="onCancel"
              @onSave="onSave"
            />
          </div>
          <div class="col-8">
            <TicketDetailFormComponent
              ref="listFormRef"
              @onUpdated="onUpdatedDetail"
              :mode="mode"
              :elementData="elementData"
              @onChangeTotal="onChangeTotal"
            />
          </div>
        </div>
      </template>
    </g-section-1>

    <TicketPrintComponent ref="printRef" :data="printData" />
  </LoadingContainer>
</template>
