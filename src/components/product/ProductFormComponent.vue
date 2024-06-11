<script setup>
import { ProductModel } from "@/models";
import { productService, typeProductService } from "@/services";
import { ref, onMounted, inject } from "vue";
const emit = defineEmits(["onFirstLoad"]);

const props = defineProps({
  disabled: { default: false },
  mode: { default: null },
});
const idElement = inject("idElement", null);
const formRef = ref(null);

/*CONSULTS*/
async function getElement(_id) {
  let resp = await productService.getProduct(_id);
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function addElement() {
  if (!formRef.value.validate()) return;
  let resp = await productService.addProduct(formRef.value.getElement());
  return resp;
}
async function editElement() {
  if (!formRef.value.validate()) return;
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
onMounted(async () => {
  if (idElement) await getElement(idElement);
  emit("onFirstLoad");
});
defineExpose({
  getElement,
  addElement,
  editElement,
  deleteElement,
  restoreElement,
  resetElement,
  editStatusElement,
});
</script>
<template>
  <g-form
    ref="formRef"
    :elementModel="ProductModel"
    v-slot="{ element, validateLabel }"
  >
    <hr class="section-2-line" />
    <div class="row gutter-form">
      <div class="col-8">
        <g-section-2
          title="Información del Producto"
          contentClass="row gutter-form"
          :topLine="false"
        >
          <g-input-val
            v-model="element.name"
            :label="element.name.name"
            @validate="validateLabel"
            :disabled="disabled"
            class="col-6"
          />
          <g-select-consult-val
            v-model="element.id_typeproduct"
            :label="element.id_typeproduct.name"
            :disabled="disabled"
            @validate="validateLabel"
            :consult="typeProductService.getListTypeProduct"
            :filter="{ order: 'asc', orderBy: 'name', searchBy: ['name'] }"
            class="col-4"
          />
          <g-input-val
            v-model="element.price"
            :label="element.price.name"
            @validate="validateLabel"
            :disabled="disabled"
            class="col-6"
          />
          <g-input-val
            v-model="element.discount"
            :label="element.discount.name"
            @validate="validateLabel"
            :disabled="disabled"
            class="col-6"
          />
          <g-input-val
            v-model="element.description"
            :label="element.description.name"
            @validate="validateLabel"
            :disabled="disabled"
          />
        </g-section-2>
      </div>
      <div class="col-4">
        <div class="img-data">
          <g-input-image-val
            imageClass="type-product-img"
            v-model="element.product_type_image"
            :disabled="disabled"
            @validate="validateLabel"
          />
        </div>
      </div>
    </div>
    <g-section-2 title="Entradas y Salidas" contentClass="row gutter-form">
    </g-section-2>
  </g-form>
</template>
<style scoped>
.data-img-container {
  display: flex;
  position: relative;
}
.img-data {
  margin-left: 1.5rem;
}
</style>
