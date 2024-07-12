<script setup>
import { typeProductService } from "@/services";
import { ref, reactive, onMounted, inject } from "vue";
import { useUserStore } from "@/stores/";
const userStore = useUserStore();

const lisProduct = ref([]);

async function getList() {
  let resp = await typeProductService.getCart();
  console.log(resp.data);
  lisProduct.value = resp.data.filter((type) => type.products.length > 0);
}
const company = ref(userStore.getCompany());

const settingsCard = reactive({
  color: {
    background: "#ffffff",
    font: "#181818",
    fontCompany: "#23b852",
    fontType: "#5c5c5c",
    fontSecondary: "#5c5c5c",
    fontPrice: "#23b852",
  },
  showCompanyName: true,
  showDescriptionProduct: true,
  border: true,
  productsDisplay: 1,
});
const options = reactive({
  productsDisplay: [
    { value: 1, text: "Productos Izquierda, imagen derecha" },
    { value: 2, text: "Productos, imagen intercalando posición" },
    { value: 3, text: "Productos sin imagen" },
  ],
});
</script>

<template>
  <g-section-1 subTitle="Configuración de carta">
    <template #content>
      <div class="row gutter-sec container-content">
        <div class="col-12 col-sm-10 col-md-6 col-lg-7 col-xl-7">
          <g-section-4 title="Configuración">
            <g-title-1 title="Colores" contentClass="row gutter-form">
              <g-input
                label="Letra"
                v-model="settingsCard.color.font"
                type="color"
                class="col-4"
                :clearButton="false"
              />
              <g-input
                label="Fondo"
                v-model="settingsCard.color.background"
                type="color"
                class="col-4"
                :clearButton="false"
              />
              <g-input
                label="Empresa"
                v-model="settingsCard.color.fontCompany"
                type="color"
                class="col-4"
                :clearButton="false"
              />
              <g-input
                label="Titulos"
                v-model="settingsCard.color.fontType"
                type="color"
                class="col-4"
                :clearButton="false"
              />
              <g-input
                label="Segundario"
                v-model="settingsCard.color.fontSecondary"
                type="color"
                class="col-4"
                :clearButton="false"
              />
              <g-input
                label="Precio"
                v-model="settingsCard.color.fontPrice"
                type="color"
                class="col-4"
                :clearButton="false"
              />
            </g-title-1>
            <g-title-1 title="Opciones" contentClass="row gutter-form">
              <g-input-check
                v-model="settingsCard.showCompanyName"
                label="Mostar nombre de empresa"
                :switchMode="true"
              />
              <g-input-check
                v-model="settingsCard.border"
                label="Mostar bordes"
                :switchMode="true"
              />
              <g-input-check
                v-model="settingsCard.showDescriptionProduct"
                label="Mostar descripciones de productos"
                :switchMode="true"
              />
            </g-title-1>
            <g-title-1 title="Otros" contentClass="row gutter-form">
              <g-select
                v-model="settingsCard.productsDisplay"
                label="Mostar productos"
                :options="options.productsDisplay"
                :clearButton="false"
              />
            </g-title-1>
          </g-section-4>
        </div>
        <div class="col-12 col-sm-10 col-md-6 col-lg-5 col-xl-5">
          <g-section-4
            title="Previsualización"
            subTitle="Solo referencia, no refleja el cotenido final"
          >
            <div
              class="prev-container"
              :style="{
                background: settingsCard.color.background,
                color: settingsCard.color.font,
              }"
            >
              <div class="emp">
                <img
                  :src="company.company_image"
                  alt="Logo Empresa"
                  class="image-emp"
                />
                <div
                  class="font-ex"
                  :style="{ color: settingsCard.color.fontCompany }"
                >
                  {{ company.name }}
                </div>
                <div
                  class="desc-emp font-ex"
                  :style="{ color: settingsCard.color.fontSecondary }"
                >
                  {{ company.description }}
                </div>
              </div>
              <div class="type-title-container">
                <fieldset class="title-type-fielset">
                  <legend
                    class="title-type font-ex"
                    :style="{ color: settingsCard.color.fontType }"
                  >
                    TIPO 1
                  </legend>
                </fieldset>
                <div class="products-container">
                  <div class="product-list">
                    <ul class="fix-ul">
                      <li v-for="prod in 4" :key="index">
                        <div class="product-container">
                          <div>
                            <div class="font-ex2">Producto {{ prod }}</div>
                            <div
                              class="prod-desc"
                              :style="{
                                color: settingsCard.color.fontSecondary,
                              }"
                            >
                              Descripción
                            </div>
                          </div>
                          <div
                            class="price font-ex2"
                            :style="{
                              color: settingsCard.color.fontPrice,
                            }"
                          >
                            <span class="simbol-price">S/. </span>
                            <span>50.00</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="img-type">
                    <div class="img-type-sim"></div>
                  </div>
                </div>
              </div>
            </div>
          </g-section-4>
        </div>
      </div>
    </template>
  </g-section-1>
</template>

<style scoped>
.img-type {
  display: flex;
  align-items: center;
}
.simbol-price {
  font-size: 10px;
}
.price {
}
.product-container {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.products-container {
  display: flex;
  gap: 1rem;
}
.img-type-sim {
  height: 70px;
  width: 70px;
  border: 1px solid rgb(182, 182, 182);
}
.prod-desc {
  font-size: 10px;
  margin-top: -0.25rem;
}
.fix-ul {
  padding-left: 1rem;
  margin: 0;
}
.product-list {
  text-align: left;
  width: 100%;
}
.type-title-container {
  width: 100%;
  margin-top: 0.5rem;
  text-align: center;
}
.title-type-fielset {
  border-top: 1px solid rgb(173, 173, 173);
}
.title-type {
  width: fit-content;
  float: none;
  font-size: 12px;
  padding: 0 0.5rem;
}
.container-content {
  justify-content: center;
}
.prev-container {
  border-radius: var(--br-v3);
  border: 1px solid var(--color-border);
  padding: 1rem;
  font-size: 12px;
}
.image-emp {
  max-width: 50px;
  max-height: 50px;
  margin-bottom: 0.5rem;
}
.emp {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.font-ex {
  font-family: "Permanent_Marker";
}
.font-ex2 {
  font-family: "Anton";
}
.desc-emp {
  font-size: 11px;
  margin-top: -0.35rem;
}
</style>
