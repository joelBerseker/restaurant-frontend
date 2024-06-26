<script setup>
import { ref, reactive, onMounted, inject } from "vue";
import Table from "@/common/table/Table.vue";
const props = defineProps({
  getListConsult: { default: null },
});
const isLoading = ref(false);
const columns = ref([
  {
    label: "data",
    field: "data",
  },
]);
const rows = ref([]);
async function getList() {
  let resp = null;
  if (props.getListConsult) {
    isLoading.value = true;
    resp = await props.getListConsult({ orderBy: "id", order: "desc" });
    isLoading.value = false;

    rows.value = resp.map((element) => element.getData());
  } else {
    console.error("No se encontro la funcion getList");
  }
  return resp;
}
function getFirstId() {
  let resp = null;
  console.log(rows.value);
  if (rows.value.length <= 0) {
    console.error("No se encontraron elementos");
  } else {
    resp = rows.value[0].id;
  }
  return resp;
}
defineExpose({
  getList,
  getFirstId,
});
</script>
<template>
  <g-section-4 title="Lista">
    <Table
      ref="tableRef"
      :rows="rows"
      :columns="columns"
      :isLoading="isLoading"
      class="table-cont"
    >
      <template #data="{ row }">
        <pre class="pre-code"><code>{{ row }}</code></pre>
      </template>
    </Table>
  </g-section-4>
</template>
<style scoped>
.table-cont {
  max-height: 250px;
}
</style>
