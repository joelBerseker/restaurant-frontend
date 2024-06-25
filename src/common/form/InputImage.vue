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
  () => props.disabled,
  (_new, _old) => {
    if (_new) {
      keyInput.value++;
      srcLocal.value = null;
      value.value = null;
    }
  }
);
function focus() {
  inputRef.value.focus();
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
    type="image"
  >
    <template v-slot:view>
      <g-image
        :src="src"
        :imageClass="imageClass"
        :imageEmptyClass="imageEmptyClass"
        :iconEmpty="iconEmpty"
    /></template>
    <template v-slot:form>
      <g-image
        :src="srcFinal"
        :imageClass="imageClass"
        :imageEmptyClass="imageEmptyClass"
        :iconEmpty="iconEmpty"
      >
        <div class="cover-input">
          <div class="break-word text-cover">
            {{ value === null ? "Seleccionar imagen" : value.name }}
          </div>
        </div>
        <input
          ref="inputRef"
          :key="keyInput"
          @change="changeFile"
          :id="id"
          :class="[
            'g-input form-control form-control-sm form-image',
            inputClass,
          ]"
          :disabled="disabled"
          type="file"
          :multiple="props.multiple"
          accept="image/png, image/gif, image/jpeg"
        />
      </g-image>
      <slot name="aditional"></slot>
    </template>
  </ElementFormLayout>
</template>
<style>
.image-content {
  width: fit-content !important;
}
.image-content .loading,
.image-content .close {
  margin-top: 0.5rem !important;
}
</style>
<style scoped>
.cover-input {
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  left: 0;
  color: var(--g-wb900);
  display: flex;
  align-items: end;
  justify-content: center;
  text-align: center;
  padding: 0.5rem;
}
.text-cover {
  display: block;
  width: 100%;
  overflow: hidden !important;
  line-height: 1.3;
  font-size: 13px;
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
