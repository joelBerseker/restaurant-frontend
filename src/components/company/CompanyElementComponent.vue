<script setup>
import CompanyFormComponent from "@/components/company/CompanyFormComponent.vue";
import FormButtons from "@/common/form/FormButtons.vue";
import LoadingContainer from "@/common/container/LoadingContainer.vue";
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
const emit = defineEmits(["onFirstLoad"]);

const props = defineProps({
  isProfile: { default: false },
});

const router = useRouter();

const formRef = ref(null);

const statusValue = ref(null);

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
  router.push({ name: "company" });
}

/*BUTTONS*/
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

function onUpdated(_data) {
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
  <LoadingContainer :loading="isLoading" loadingClass="loading-transparent">
    <g-section-1 :subTitle="subTitle">
      <template #buttons>
        <FormButtons
          :mode="mode"
          :statusValue="statusValue"
          :elementText="elementText"
          @onEdit="onEdit"
          @onCancel="onCancel"
          @onSave="onSave"
          :showDelete="false"
          :showStatus="false"
        />
      </template>
      <template #content>
        <CompanyFormComponent
          ref="formRef"
          :disabled="disabled"
          :mode="mode"
          @onUpdated="onUpdated"
          @onFirstLoad="onFirstLoad"
        />
      </template>
    </g-section-1>
  </LoadingContainer>
</template>
