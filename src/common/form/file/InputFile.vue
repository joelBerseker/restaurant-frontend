<script setup>
import { computed, ref, watch } from "vue";
import { isEmpty } from "@/helpers";
import ElementFormLayout from "@/common/form/ElementFormLayout.vue";

const props = defineProps({
  modelValue: { default: null },
  id: { default: null },
  inputClass: { default: "" },
  labelClass: { default: "" },
  disabled: { default: false },
  multiple: { default: false },
  label: { default: null },
  loading: { default: false },
  helpText: { default: "" },
  showHelpText: { default: true },
  viewMode: { default: true },
  aditional: { default: false },
  src: { default: null },

  imageClass: { default: "g-default-image" },
  contentClass: { default: "" },
  imageEmptyClass: { default: null },
  validation: { default: null },
  iconEmpty: { default: undefined },
});
const emit = defineEmits(["update:modelValue", "change", "clear"]);

const inputRef = ref(null);
const srcLocal = ref(null);
const srcFinal = computed(() => {
  if (srcLocal.value !== null) return srcLocal.value;
  if (props.src !== null) return props.src;
  return null;
});
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
function clear() {
  value.value = null;
  srcLocal.value = null;
  emit("clear");
}
const listFilesAdded = ref([]);

function changeFile(e) {
  if (props.multiple) {
    value.value = [];
    listFilesAdded.value = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const element = e.target.files[i];
      listFilesAdded.value.push(element.name);
      value.value.push(element);
    }
  } else {
    const file = e.target.files[0];
    value.value = file;
    emit("change", value.value);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      srcLocal.value = e.target.result;
    };
  }
}

const keyInput = ref(1);

watch(
  () => value.value,
  (_new, _old) => {
    if (isEmpty(_new)) {
      keyInput.value++;
      srcLocal.value = null;
      value.value = null;
    }
  }
);

function focus() {
  inputRef.value.focus();
}
function sliceText(text) {
  if (isEmpty(text)) {
    return text;
  }
  var link = text;
  var linkSlice = link.substring(link.lastIndexOf("/") + 1, link.length);
  return linkSlice;
}
defineExpose({
  focus,
});
</script>
<template>
  <ElementFormLayout
    :label="label"
    :value="value"
    :labelClass="labelClass"
    :helpText="helpText"
    :showHelpText="showHelpText"
    :disabled="disabled"
    :contentClass="contentClass"
    :loading="loading"
    :viewMode="viewMode"
    @clear="clear"
    :validation="validation"
    type="file"
    wrapperClass="g-input-file"
  >
    <template v-slot:view>
      <span v-if="isEmpty(src)" class="status-element no-defined-status">
        No definido
      </span>

      <span v-else>
        <div class="text-dots">
          <a :href="src" target="_blank">{{ sliceText(src) }}</a>
        </div>
      </span>
    </template>
    <template v-slot:form="{ onFocus, onBlur }">
      <div class="g-file-input">
        <div class="break-word text-cover">
          <span v-if="value === null" class="empty-text">
            <font-awesome-icon icon="fa-solid fa-file" class="me-1" />
            Seleccionar archivo
          </span>
          <span v-else>
            <font-awesome-icon icon="fa-solid fa-file" class="me-1" />
            {{ value.name }}
          </span>
        </div>

        <input
          ref="inputRef"
          :key="keyInput"
          @change="changeFile"
          :id="id"
          :class="[
            'g-input form-control form-control-sm form-image form-file',
            inputClass,
          ]"
          :disabled="disabled"
          type="file"
          :multiple="props.multiple"
          @focus="onFocus"
          @blur="onBlur"
        />
      </div>
      <slot name="aditional"></slot>
    </template>
  </ElementFormLayout>
</template>
<style>
.g-form-wrapper.show-extra .form-file {
  padding-right: 2.5rem;
}
.image-content {
  width: fit-content !important;
}
.image-content .loading,
.image-content .close {
  margin-top: 0.5rem !important;
}
</style>
<style scoped>
.g-file-input {
  background-color: rgba(255, 255, 255, 0.5);

  width: 100%;
  height: 100%;

  padding: 0.5rem 0rem;
}
.empty-text {
  color: var(--color-b-v3);
}
.text-cover {
  display: block;
  width: 100%;
  overflow: hidden !important;

  margin-bottom: 0.05rem;
  color: var(--color-b-v2);
}
.form-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
