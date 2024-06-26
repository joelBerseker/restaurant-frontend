<script setup>
import { computed, ref, onUpdated, inject } from "vue";

const confirmDialogue = inject("confirmDialogue");

import { isEmpty } from "@/helpers";
const props = defineProps({
  modelValue: { default: null },

  viewMode: { default: true },
  inputClass: { default: "" },
  viewClass: { default: "" },
  labelClass: { default: "" },
  disabled: { default: false },
  multiple: { default: false },
  label: { default: null },
  loading: { default: false },
  showButton: { default: false },
  showHelpText: { default: true },

  helpText: { default: "" },
  editableFile: { default: true },
  imageClass: { default: "g-default-image" },
  imageEmptyClass: { default: null },
  iconEmpty: { default: undefined },

  contentClass: { default: "" },
});
const emit = defineEmits(["change", "changeFile", "validate"]);

const value = computed({
  get() {
    return props.modelValue;
  },
});

function change(_data) {
  emit("validate", value.value);
  emit("change", _data);
}
function clear(_data) {
  emit("validate", value.value);

  emit("change", _data);
}
function deleteFile() {
  confirmDialogue("file_delete").then(async (result) => {
    if (result) {
      value.value.value = null;
      emit("changeFile");
    }
  });
}
function saveFile() {
  value.value.validateChange();
  if (value.value.validation.isValid) {
    confirmDialogue("file_change").then(async (result) => {
      if (result) {
        emit("changeFile");
      }
    });
  }
}
</script>
<template>
  <g-input-file
    v-model="value.file"
    :disabled="disabled"
    :inputClass="['validation', inputClass]"
    :loading="loading"
    :label="label"
    :labelClass="labelClass"
    :helpText="helpText"
    :showHelpText="showHelpText"
    :viewMode="viewMode"
    @change="change()"
    @clear="clear()"
    :aditional="true"
    :src="value.value"
    :imageClass="imageClass"
    :contentClass="contentClass"
    :imageEmptyClass="imageEmptyClass"
    :validation="value.validation"
    :iconEmpty="iconEmpty"
  >
    <template v-if="showButton" v-slot:aditional>
      <div class="float-button">
        <g-button
          icon="bi bi-check-lg"
          @click="saveFile()"
          :loading="loading"
          class="ms-1"
        />
      </div>
    </template>
  </g-input-file>
</template>
<style scoped>
.float-button {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 10;
}
</style>
