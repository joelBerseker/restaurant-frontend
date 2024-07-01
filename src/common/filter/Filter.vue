<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useSystemStore } from "@/stores/systemStore";
import { copyObject } from "@/helpers";
import FilterDate from "@/common/filter/FilterDate.vue";
import FilterSearch from "@/common/filter/FilterSearch.vue";
import FilterOrder from "@/common/filter/FilterOrder.vue";

import FilterStatus from "@/common/filter/FilterStatus.vue";

const useSystem = useSystemStore();

const props = defineProps({
  modelValue: { default: null },
  columns: { default: [] },
  filter: { default: {} },
  defaultFilter: { default: {} },
  date: { default: false },
  status: { default: true },
  border: { default: false },

  resetOtherFilters: { default: null },
  filterCacheName: { default: null },
});
const emit = defineEmits(["update:modelValue", "filterSearch"]);

const filterSearchRef = ref(null);
const filterOrderRef = ref(null);

const filterStatusRef = ref(null);
const filterDateRef = ref(null);
const filterAdvanceRef = ref(null);

const showClearButton = ref(false);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

function search() {
  emit("filterSearch");
  showClearButton.value = true;
  if (equalsToDefault()) {
    if (props.filterCacheName) {
      useSystem.deleteFilterCache(props.filterCacheName);
      showClearButton.value = false;
    }
    return;
  }
  if (props.filterCacheName) {
    useSystem.addFilterCache(props.filterCacheName, value.value);
  }
  console.log(value.value);
}
function equalsToDefault() {
  let resp = true;
  for (var key in value.value) {
    if (props.defaultFilter[key] === undefined) {
      resp = false;
    }
    if (props.defaultFilter[key] !== value.value[key]) {
      resp = false;
    }
  }
  console.log({ resp });
  return resp;
}
function sort(_data) {
  filterOrderRef.value.sort(_data);
}
function clearFilter() {
  filterSearchRef.value.reset();
  filterOrderRef.value.reset();

  if (props.status) {
    filterStatusRef.value.reset();
  }
  if (props.date) {
    filterDateRef.value.reset();
  }
  if (props.advance) {
    filterAdvanceRef.value.reset();
  }
  if (props.resetOtherFilters !== null) props.resetOtherFilters();
  value.value = copyObject(props.defaultFilter);
  emit("filterSearch");
  showClearButton.value = false;
  if (props.filterCacheName) {
    useSystem.deleteFilterCache(props.filterCacheName);
  }
}
function init() {
  if (props.filterCacheName) {
    let _filter = useSystem.filterCache[props.filterCacheName];
    if (_filter) {
      showClearButton.value = true;
    }
  }
}
init();

defineExpose({
  sort,
  search,
});
</script>
<template>
  <div :class="['filter-container', border ? 'border-cont' : '']">
    <div class="filters-container">
      <div class="filter-search-container">
        <FilterSearch
          ref="filterSearchRef"
          :filter="value"
          :columns="columns"
          :defaultFilter="defaultFilter"
          @search="search()"
        />
      </div>

      <FilterOrder
        ref="filterOrderRef"
        class="ms-2"
        :filter="value"
        :columns="columns"
        :defaultFilter="defaultFilter"
        @search="search()"
      />
      <div v-if="status">
        <FilterStatus
          class="ms-2"
          ref="filterStatusRef"
          :filter="value"
          :defaultFilter="defaultFilter"
          @search="search()"
        />
      </div>
      <div v-if="date">
        <FilterDate
          ref="filterDateRef"
          :filter="value"
          :defaultFilter="defaultFilter"
          @search="search()"
          class="ms-1"
        />
      </div>

      <slot :search="search"></slot>
    </div>
    <div v-show="showClearButton" class="clear-filter">
      <g-button
        icon="fa-solid fa-xmark"
        class="pulse-animation"
        type="link-min"
        text="Limpiar Filtro"
        @click="clearFilter()"
      />
    </div>
  </div>
</template>
<style scoped>
.border-cont {
  border: 1px solid var(--color-border2);
}
.filter-container {
  background-color: var(--color-c1);
  padding: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  padding-bottom: 1.6rem;
  border-radius: var(--br);
  position: relative;
}
.filters-container {
  display: flex;
}
.filter-search-container {
  width: 50%;
}
.clear-filter {
  position: absolute;
  bottom: 0rem;
  right: 0.5rem;
}
</style>
