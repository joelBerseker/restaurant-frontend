<script setup>
import { isEmpty } from "@/helpers";
import { TicketModel } from "@/models";
import {
  ticketService,
  userService,
  tableService,
  productService,
  typeProductService,
} from "@/services";
import { ref, onMounted, inject, computed } from "vue";
import FormButtons from "@/common/form/FormButtons.vue";
import PrintContent from "@/common/PrintContent.vue";

const url = import.meta.env.VITE_APP_RUTA_MEDIA;
const emit = defineEmits(["onFirstLoad", "onSave", "onCancel", "onEdit"]);

const props = defineProps({
  data: { default: null },
});
const documentName = ref("Boleta de Venta Electronica");
const documentId = ref(null);

const lisProduct = ref([]);

async function getList() {
  let resp = await typeProductService.getCart();
  console.log(resp.data);
  lisProduct.value = resp.data.filter((type) => type.products.length > 0);
}

const printRef = ref(null);
async function print() {
  await getList();
  console.log(lisProduct.value);

  await printRef.value.print();
}
defineExpose({
  print,
});
</script>
<template>
  <PrintContent
    ref="printRef"
    printName="CARTA"
    :header="false"
    printClass="print-menu"
  >
    <template #background>
      <div class="menu-container">
        <div class="border-menu">
          <div class="border-dot"></div>
        </div>
      </div>
    </template>
    <template v-slot:default="{ company }"
      ><div class="menu-content">
        <div class="company-img-container">
          <img
            :src="company.company_image"
            alt="Logo Empresa"
            class="company-img"
          />
        </div>
        <div class="company-name">{{ company.name }}</div>
        <div class="company-desc">{{ company.description }}</div>
        <div class="types-container">
          <div
            v-for="(type, index) in lisProduct"
            :key="index"
            class="type-container"
          >
            <div class="type-title-container">
              <fieldset class="title-type-fielset">
                <legend class="title-type">
                  {{ type.product_type }}
                </legend>
              </fieldset>
            </div>
            <div class="products-wrapper">
              <div class="products">
                <div
                  class="product"
                  v-for="(product, index) in type.products"
                  :key="index"
                >
                  <div class="product-wrapper">
                    <div class="dot-product"></div>
                    <div>
                      <div class="product-title">{{ product.name }}</div>
                      <div class="product-desc">{{ product.description }}</div>
                    </div>
                  </div>
                  <div class="product-price-wrapper">
                    <span class="product-price-simbol"> S/. </span>
                    <span class="product-price">{{ product.price }}</span>
                  </div>
                </div>
              </div>
              <div class="type-img-container">
                <img
                  :src="url + type.product_image"
                  alt="Imagen tipo"
                  class="type-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </PrintContent>
</template>
