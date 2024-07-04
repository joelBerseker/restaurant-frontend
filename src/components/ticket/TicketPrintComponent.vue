<script setup>
import { isEmpty } from "@/helpers";
import { TicketModel } from "@/models";
import { ticketService, userService, tableService } from "@/services";
import { ref, onMounted, inject, computed } from "vue";
import FormButtons from "@/common/form/FormButtons.vue";
import PrintContent from "@/common/PrintContent.vue";

const emit = defineEmits(["onFirstLoad", "onSave", "onCancel", "onEdit"]);

const props = defineProps({
  data: { default: null },
});
const documentName = ref("Boleta de Venta Electronica");
const documentId = ref(null);

const header = ref({});
const detail = ref([]);

const printRef = ref(null);
async function print() {
  header.value = props.data.header.getData();
  detail.value = props.data.detail.map((element) => element.getData());

  console.log(header.value);
  console.log(detail.value);

  documentId.value = props.data.header.code.value;
  await printRef.value.print();
}
defineExpose({
  print,
});
</script>
<template>
  <PrintContent
    ref="printRef"
    printName="Imprimir Boleta"
    :documentName="documentName"
    :documentId="documentId"
  >
    <div class="customer">
      <div>
        <span class="info-label">Cliente: </span>{{ header.client_name }}
      </div>
      <div><span class="info-label">Fecha: </span>{{ header.created_at }}</div>
      <div><span class="info-label">DNI/RUC: </span>{{ header.ruc }}</div>
      <div><span class="info-label">Moneda: </span>Soles</div>
    </div>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>N°</th>

            <th>Codigo</th>

            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Precio total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(element, index) in detail" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ element.product_id }}</td>
            <td>{{ element.product_id__name }}</td>
            <td class="text-end">S/. {{ element.price }}</td>
            <td class="text-end">{{ element.quantity }}</td>
            <td class="text-end">S/. {{ element.price_total }}</td>
          </tr>
          <tr>
            <td colspan="6" class="border-none"></td>
          </tr>
          <tr>
            <td colspan="3" class="border-none">&nbsp;</td>
            <td colspan="2" class="text-end">Precio Total:</td>
            <td class="text-end">S/. {{ header.priceTotal }}</td>
          </tr>
          <tr>
            <td colspan="3" class="border-none"></td>
            <td colspan="2" class="text-end">Descuento:</td>
            <td class="text-end">{{ header.discount }} %</td>
          </tr>
          <tr>
            <td colspan="3" class="border-none"></td>
            <td colspan="2" class="text-end">Precio Final:</td>
            <td class="text-end">S/. {{ header.priceFinal }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </PrintContent>
</template>
