<script setup>
import { printDocument, sleep } from "@/helpers";
import { useUserStore } from "@/stores/";
import { ref } from "vue";

const userStore = useUserStore();

const props = defineProps({
  version: { default: "V0001" },
  printName: { default: "Documento" },
  documentName: { default: null },
  documentId: { default: "printable" },
  footer: { default: false },
  header: { default: true },

  printClass: { default: null },
});

const printableRef = ref(null);
const company = ref(userStore.getCompany());

async function print() {
  await sleep(100);
  printDocument(props.printName, printableRef.value, true);
}

defineExpose({
  print,
});
</script>
<template>
  <div id="printable" ref="printableRef">
    <div :class="[printClass, 'print-container']">
      <div class="print-cover"></div>
      <slot name="background"></slot>

      <div v-if="header" class="header">
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
                <span class="info-label">Dirección: </span>
                {{ company.address }}
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
            <td class="content">
              <slot :company="company"></slot>
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

      <div v-if="footer" class="footer">
        <div class="footer-container"></div>
      </div>
    </div>
  </div>
</template>
