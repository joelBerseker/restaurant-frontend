<script setup>
import UserFormComponent from "@/components/user/UserFormComponent.vue";
import FormButtons from "@/common/form/FormButtons.vue";
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
const emit = defineEmits(["onFirstLoad"]);

const router = useRouter();

const formRef = ref(null);

const statusValue = ref(null);

/*INITIAL SETTINGS*/
const title = ref(null);
const subTitle = ref(null);
const isLoading = ref(false);

const idElement = inject("idElement", null);
const mode = ref(null);
const disabled = ref(false);
const elementText = ref(null);

function addMode() {
  mode.value = "add";
  title.value = "userAdd";

  disabled.value = false;
}
async function viewMode(_id = null) {
  mode.value = "view";
  title.value = "userDetail";
  disabled.value = true;
}
function editMode() {
  mode.value = "edit";
  disabled.value = false;
}
function toList() {
  router.push({ name: "user" });
}

/*BUTTONS*/
async function onAdd() {
  isLoading.value = true;
  let resp = await formRef.value.addElement();
  if (resp) {
    toList();
  }
  isLoading.value = false;
}
function onEdit() {
  editMode();
}
async function onSave() {
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
function onUpdated(_data) {
  console.log("onupdated");

  console.log(_data.getText());
  statusValue.value = _data.status.value;
  subTitle.value = _data.getText();
  elementText.value = _data.getTextModel();
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
  <g-section-1 :name="title" :subTitle="subTitle">
    <template #buttons>
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
    <template #content>
      <UserFormComponent
        ref="formRef"
        :disabled="disabled"
        :mode="mode"
        @onUpdated="onUpdated"
        @onFirstLoad="onFirstLoad"
      />
    </template>
  </g-section-1>
</template>
