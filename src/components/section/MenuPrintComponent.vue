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

const emit = defineEmits(["onFirstLoad", "onSave", "onCancel", "onEdit"]);

const props = defineProps({
  data: { default: null },
});
const documentName = ref("Boleta de Venta Electronica");
const documentId = ref(null);

const list = ref([]);

async function getList() {
  list.value = await typeProductService.getCart();
}

const printRef = ref(null);
async function print() {
  await getList();
  console.log(list.value);
  await printRef.value.print();
}
defineExpose({
  print,
});
</script>
<template>
  <PrintContent
    ref="printRef"
    printName="Imprimir Menu"
    :header="false"
    printClass="print-menu"
  >
    <template #background>
      <div class="menu-container">
        <div class="menu-wrapper">
          <div class="border-menu">
            <div class="border-dot"></div>
          </div>
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
            v-for="(type, index) in list"
            :key="index"
            class="type-container"
          >
            <div class="title-type">{{ type.product_type }}</div>
            <div class="desc-type">{{ type.description }}</div>
            <div clas="products-wrapper">
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
                  <div class="product-price">
                    {{ product.price }}
                  </div>
                </div>
              </div>
              <div>
                <img
                  :src="type.product_image"
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
