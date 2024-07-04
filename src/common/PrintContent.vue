<script setup>
import { printDocument, sleep } from "@/helpers";
import { useUserStore } from "@/stores/";
import { ref } from "vue";

const userStore = useUserStore();

const props = defineProps({
  version: { default: "V0001" },
  printName: { default: "Imprimir documento" },
  documentName: { default: null },
  documentId: { default: "printable" },
});

const printableRef = ref(null);
const company = ref(userStore.getCompany());

const doc = ref({
  ruc: "ruc",

  type: "Boleta de venta electronica",
  id: "id",
});
async function print() {
  await sleep(0);
  printDocument(props.printName, printableRef.value);
}

defineExpose({
  print,
});
</script>
<template>
  <div id="printable" ref="printableRef">
    <div class="print-cover"></div>
    <div class="header">
      <div class="header-container">
        <div class="company-wrapper">
          <div class="img-container">
            <img
              :src="company.company_image"
              alt="Logo Empresa"
              class="image-header"
            />
          </div>
          <div class="company-container">
            <div>
              <div class="title">{{ company.name }}</div>
              <div class="subtitle">{{ company.description }}</div>
            </div>
            <div>
              <span class="info-label">Dirección: </span> {{ company.address }}
            </div>
            <div>
              <span class="info-label">Telefono(s): </span>
              {{ company.phone_principal }}
            </div>
          </div>
        </div>
        <div class="document-container">
          <div>RUC:{{ company.ruc }}</div>
          <div class="type">{{ documentName }}</div>
          <div>{{ documentId }}</div>
        </div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <td>
            <div class="header-space">&nbsp;</div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="td-content">
            <div class="content">
              <slot></slot>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <div class="footer-space">&nbsp;</div>
          </td>
        </tr>
      </tfoot>
    </table>

    <div class="footer">
      <div class="footer-container">footer</div>
    </div>
  </div>
</template>
