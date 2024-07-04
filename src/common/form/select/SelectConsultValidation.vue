<script setup>
import { ref, computed } from "vue";
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

  nullOption: { default: false },
  nullText: { default: "Seleccione una opción" },
  formatOptions: { default: "getDataOptions" },
  ousideData: { default: null },
  multipleOptions: { default: false },
});

const listLocal = ref([]);
const obtainedLocal = ref(false);
const loadingLocal = ref(false);

const list = computed({
  get() {
    if (props.ousideData) return props.ousideData.list;
    else return listLocal.value;
  },
  set(value) {
    if (props.ousideData) props.ousideData.list = value;
    else listLocal.value = value;
  },
});

const obtained = computed({
  get() {
    if (props.ousideData) return props.ousideData.obtained;
    else return obtainedLocal.value;
  },
  set(value) {
    if (props.ousideData) props.ousideData.obtained = value;
    else obtainedLocal.value = value;
  },
});
const loading = computed({
  get() {
    if (props.ousideData) return props.ousideData.loading;
    else return loadingLocal.value;
  },
  set(value) {
    if (props.ousideData) props.ousideData.loading = value;
    else loadingLocal.value = value;
  },
});
const searchInputLocal = ref(null);

const searchInput = computed({
  get() {
    if (props.ousideData) return props.ousideData.searchInput;
    else return searchInputLocal.value;
  },
  set(value) {
    if (props.ousideData) props.ousideData.searchInput = value;
    else searchInputLocal.value = value;
  },
});

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

  if (resp)
    if (props.multipleOptions) {
      for (var key in resp) {
        resp[key].list = resp[key].list.map((element) =>
          element[props.formatOptions]()
        );
      }
      list.value = resp;
    } else {
      list.value = resp.map((element) => element[props.formatOptions]());
    }
  loading.value = false;
}

async function refresh() {
  searchInput.value = "";
  await getList();
  obtained.value = true;
}

const dataRoute = computed(() => {
  if (value.value.navigation) {
    const _route = router.resolve({
      name: value.value.navigation,
    });
    return _route;
  }
  return null;
});

function toList() {
  window.open(dataRoute.value.href, "_blank");
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
    :nullOption="nullOption"
    :nullText="nullText"
    @clickButton="click()"
    :multipleOptions="multipleOptions"
  >
    <template v-slot:header-list>
      <div v-if="showFilter" class="search-select">
        <div class="d-flex w-100" @click.stop>
          <div class="w-100 search-icon-container">
            <g-input
              placeholder="Buscar..."
              v-model="searchInput"
              @delayChange="getList()"
              @clear="clearInput()"
              :disabled="filter === null"
              :viewMode="false"
              :delay="true"
              class="w-100 input-button-left"
              inputClass="input-search-icon"
            />
            <div class="search-icon">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </div>
          </div>

          <g-button
            icon="fa-solid fa-rotate-right"
            class="button-refresh button-input-right"
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
            {{ dataRoute.meta.title }}
          </span>
        </div>
      </div>
    </template>
  </g-select-val>
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
.button-refresh {
  background-color: var(--color-w);
}
</style>
