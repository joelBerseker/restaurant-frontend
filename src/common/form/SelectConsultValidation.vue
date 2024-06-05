<script setup>
import { ref, inject, reactive, computed } from "vue";

import { sleepInput, isEmpty, navigationInfo } from "@/helpers";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  modelValue: { default: null },
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

const value = computed({
  get() {
    return props.modelValue;
  },
});

async function getList() {
  if (props.filter === null) return;
  props.filter.status = 1;
  props.filter.search = searchInput.value;

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
const searchInput = ref(null);

function toList() {
  const routeData = router.resolve({
    name: navigationInfo[value.value.navigation].name,
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
  <g-select-val
    v-model="value"
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
          <div class="w-100 search-icon-container">
            <g-input
              placeholder="Buscar..."
              v-model="searchInput"
              @input="getList()"
              @clear="clearInput()"
              :disabled="filter === null"
              :viewMode="false"
              :awaitInput="true"
              class="w-100"
              inputClass="filter-input"
            />
            <div class="search-icon">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </div>
          </div>

          <g-button
            icon="fa-solid fa-rotate-right"
            class="filter-refresh"
            type="search"
            title="Recargar"
            @click.stop="getList()"
            :disabled="filter === null"
          />
        </div>
      </div>
    </template>
    <template v-slot:footer-list>
      <div
        v-if="value.navigation !== undefined"
        class="text-end text-navigation"
      >
        <div class="g-text" @click.stop="toList()">
          Administrar
          <span class="g-name">
            {{ navigationInfo[value.navigation].title }}
          </span>
        </div>
      </div>
    </template>
  </g-select-val>
</template>
<style>
.filter-input {
  padding-left: 1.4rem;
  padding-right: 0.7rem;
}
</style>
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
  color: var(--color-b-v1) !important;
  transition: 0.3s;
  cursor: pointer;
}
.text-navigation .g-text:hover {
  color: var(--color-1-v3) !important;
  text-decoration: underline;
}
.search-select {
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  background-color: var(--color-w);
}

.search-icon-container {
  position: relative;
}
.search-icon-container .search-icon {
  position: absolute;
  top: 0;
  width: 2.5rem;

  height: 100%;
  color: var(--color-b-v3);
  padding-top: 0.3rem;
  font-size: 14px;
}
.filter-refresh {
  margin-left: -0.75rem;
}
</style>
