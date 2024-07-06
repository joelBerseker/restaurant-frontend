<script setup>
import { ref, reactive, onMounted, inject } from "vue";
import CardLink from "@/common/CardLink.vue";
import MenuPrintComponent from "@/components/section/MenuPrintComponent.vue";

const list = ref(["productList", "productType", "menuList"]);
const printRef = ref(null);

function onPrint() {
  printRef.value.print();
}
</script>
<template>
  <g-section-1 subTitle="Gestion de usuarios y sus roles en el sistema">
    <template #buttons>
      <g-button
        text="Generar Carta"
        icon="fa-solid fa-book-open"
        @click="onPrint()"
      />
    </template>
    <template #content>
      <div class="row gutter-sec">
        <div class="col-4" v-for="(element, index) in list" :key="index">
          <CardLink :name="element" />
        </div>
      </div>
      <MenuPrintComponent ref="printRef" />
    </template>
  </g-section-1>
</template>
