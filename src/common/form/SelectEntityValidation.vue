<script setup>
import { ref, inject, reactive } from "vue";

import { sleepInput, isEmpty, navigationInfo } from "@/helpers";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  data: {},
  consult: {},
  viewMode: { default: true },
  disabled: { default: false },
  filter: { default: {} },
  display: { default: null },
  showFilter: { default: true },
  showAditionalInSelect: { default: true },
  noChangeValue: { default: false },
  nullOption: { default: false },
  nullText: { default: "Seleccione una opción" },
  formatOptions: { default: "getDataOptions" },
});

const list = ref([]);
const obtained = ref(false);
const loading = ref(false);

async function getList() {
  if (props.filter === null) return;
  props.filter.status = 1;
  loading.value = true;
  let resp = await props.consult(props.filter);
  if (resp) list.value = resp.map((element) => element[props.formatOptions]());
  loading.value = false;
}

async function refresh() {
  searchInput.value = "";
  await getList();
  obtained.value = true;
}
const searchInput = reactive(null);

function toList() {
  const routeData = router.resolve({
    name: navigationInfo[props.data.navigation].name,
  });
  window.open(routeData.href, "_blank");
}
function clearInput() {
  props.filter.search = "";
  getList();
}
function resetList() {
  obtained.value = false;
  list.value = [];
}
function click() {
  init();
}
async function init() {
  if (!obtained.value) {
    await getList();
    obtained.value = true;
  }
}
defineExpose({
  init,
  resetList,
  refresh,
  list,
});
</script>
<template>
  <h-select-validation
    :data="data"
    :options="list"
    :loading="loading"
    :disabled="disabled"
    :viewMode="viewMode"
    :display="display"
    :showAditionalInSelect="showAditionalInSelect"
    :noChangeValue="noChangeValue"
    :nullOption="nullOption"
    :nullText="nullText"
    @click="click()"
  >
    <template v-slot:header-list>
      <div v-if="showFilter" class="search-select">
        <div class="d-flex w-100" @click.stop>
          <h-input
            placeholder="Buscar..."
            v-model="searchInput"
            @input="getList()"
            @clear="clearInput()"
            :disabled="filter === null"
            :viewMode="false"
          />
          <g-button
            icon="bi bi-arrow-clockwise"
            class="ms-1"
            type="secondary"
            @click.stop="getList()"
            :disabled="filter === null"
          />
        </div>
      </div>
    </template>
    <template v-slot:footer-list>
      <div
        v-if="data.navigation !== undefined"
        class="text-end text-navigation"
      >
        <div class="g-text" @click.stop="toList()">
          Administrar
          <span class="g-name">
            {{ navigationInfo[data.navigation].title }}
          </span>
        </div>
      </div>
    </template>
  </h-select-validation>
</template>
<style scoped>
.text-navigation {
  padding-right: 1rem;
  padding-bottom: 0.5rem;
}
.text-navigation .g-name {
  text-transform: lowercase;
}
.text-navigation .g-text {
  font-size: 13px;
  color: var(--g-wb500) !important;
  transition: 0.3s;
  cursor: pointer;
}
.text-navigation .g-text:hover {
  color: var(--g-wb800) !important;
  text-decoration: underline;
}
.search-select {
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  background-color: var(--g-wb050);
}
</style>
