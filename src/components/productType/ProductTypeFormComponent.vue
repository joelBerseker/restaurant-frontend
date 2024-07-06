<script setup>
import { TypeProductModel } from "@/models";
import { typeProductService } from "@/services";
import { ref } from "vue";

const props = defineProps({
  disabled: { default: false },
});

const formRef = ref(null);

/*CONSULTS*/
async function getElement(_id) {
  let resp = await typeProductService.getTypeProduct(_id);
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function addElement() {
  let resp = await typeProductService.addTypeProduct(
    formRef.value.getElement()
  );
  return resp;
}
async function editElement() {
  let resp = await typeProductService.updateTypeProduct(
    formRef.value.getElement()
  );
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function deleteElement() {
  let resp = await typeProductService.deleteTypeProduct(
    formRef.value.getElement().id.value
  );
  return resp;
}
async function editStatusElement() {
  let resp = await typeProductService.changeStatusTypeProduct(
    formRef.value.getElement()
  );
  if (resp) return formRef.value.getElement().status.value;
  return;
}
function validateElement() {
  return formRef.value.validate();
}
function restoreElement() {
  formRef.value.restore();
}
function resetElement() {
  formRef.value.reset();
}
defineExpose({
  getElement,
  addElement,
  editElement,
  deleteElement,
  restoreElement,
  resetElement,
  editStatusElement,
  validateElement,
});
</script>
<template>
  <g-form
    ref="formRef"
    :elementModel="TypeProductModel"
    v-slot="{ element, validateLabel }"
    class="row gutter-form"
  >
    <div class="img-data">
      <g-input-image-val
        imageClass="type-product-img"
        v-model="element.product_image"
        :disabled="disabled"
        @validate="validateLabel"
      />
    </div>
    <g-input-val
      v-model="element.name"
      :label="element.name.name"
      @validate="validateLabel"
      :disabled="disabled"
    />

    <g-input-val
      v-model="element.description"
      :label="element.description.name"
      @validate="validateLabel"
      :disabled="disabled"
    />
    <g-input-check
      :label="element.is_publish.name"
      v-model="element.is_publish.value"
      :switchMode="true"
      labelClass="imp-label"
      :disabled="disabled"
      @validate="validateLabel"
    />
  </g-form>
</template>
<style scoped>
.img-data {
  display: flex;
  justify-content: center;
}
</style>
