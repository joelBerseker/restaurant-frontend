<script setup>
import { ProductModel } from "@/models";
import { productService, typeProductService } from "@/services";
import { ref } from "vue";

const props = defineProps({
  disabled: { default: false },
});

const formRef = ref(null);

/*CONSULTS*/
async function getElement(_id) {
  let resp = await productService.getProduct(_id);
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function addElement() {
  let resp = await productService.addProduct(formRef.value.getElement());
  return resp;
}
async function editElement() {
  let resp = await productService.updateProduct(formRef.value.getElement());
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function deleteElement() {
  let resp = await productService.deleteProduct(
    formRef.value.getElement().id.value
  );
  return resp;
}
async function editStatusElement() {
  let resp = await productService.changeStatusProduct(
    formRef.value.getElement()
  );
  if (resp) return formRef.value.getElement().status.value;
  return;
}
function restoreElement() {
  formRef.value.restore();
}
function resetElement() {
  formRef.value.reset();
}
function validateElement() {
  return formRef.value.validate();
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
    :elementModel="ProductModel"
    v-slot="{ element, validateLabel }"
    class="row gutter-form"
  >
    <div class="img-data">
      <g-input-image-val
        imageClass="type-product-img"
        v-model="element.product_type_image"
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
    <g-select-consult-val
      v-model="element.id_typeproduct"
      :label="element.id_typeproduct.name"
      :disabled="disabled"
      @validate="validateLabel"
      :consult="typeProductService.getListTypeProduct"
      :filter="{ order: 'asc', orderBy: 'name', searchBy: ['name'] }"
    />
    <g-input-val
      v-model="element.price"
      :label="element.price.name"
      @validate="validateLabel"
      :disabled="disabled"
      class="col-6"
    >
      <template #prev>S/.&nbsp;</template>
    </g-input-val>
    <g-input-val
      v-model="element.discount"
      :label="element.discount.name"
      @validate="validateLabel"
      :disabled="disabled"
      class="col-6"
    >
      <template #next>&nbsp;%</template>
    </g-input-val>

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
