<script setup>
import { ref, reactive, computed } from "vue";
import FilterDate from "@/common/filter/FilterDate.vue";
import FilterSearch from "@/common/filter/FilterSearch.vue";
import FilterOrder from "@/common/filter/FilterOrder.vue";

import FilterStatus from "@/common/filter/FilterStatus.vue";

const props = defineProps({
  columns: { default: [] },
  filter: {
    default: {},
  },
  date: {
    default: false,
  },
  status: {
    default: true,
  },
  resetOtherFilters: {
    default: null,
  },
});
const emit = defineEmits(["update:modelValue", "filterSearch"]);
const filterSearchRef = ref(null);
const filterOrderRef = ref(null);

const filterStatusRef = ref(null);
const filterDateRef = ref(null);
const filterAdvanceRef = ref(null);

const showClearButton = ref(false);
const filterBackup = ref({});

function search() {
  emit("filterSearch");
  showClearButton.value = true;
  console.log(props.filter);
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
  emit("filterSearch");
  showClearButton.value = false;
}

defineExpose({
  sort,
  search,
});
</script>
<template>
  <div class="filter-container">
    <div class="filter-search-container">
      <FilterSearch
        ref="filterSearchRef"
        :filter="filter"
        :columns="columns"
        @search="search()"
      />
    </div>

    <FilterOrder
      ref="filterOrderRef"
      class="ms-2"
      :filter="filter"
      :columns="columns"
      @search="search()"
    />
    <div v-if="status">
      <FilterStatus ref="filterStatusRef" :filter="filter" @search="search()" />
    </div>
    <div v-if="date">
      <FilterDate
        ref="filterDateRef"
        :filter="filter"
        @search="search()"
        class="ms-1"
      />
    </div>

    <slot :search="search"></slot>
    <div v-show="showClearButton" class="ms-1">
      <g-button
        icon="bi bi-x-lg"
        type="secondary"
        title="Limpiar filtro"
        @click="clearFilter()"
      />
    </div>
  </div>
</template>
<style scoped>
.filter-container {
  background-color: var(--color-w-v3);
  padding: 1rem;
  border-radius: var(--br-v2);
  display: flex;
}
.filter-search-container {
  width: 50%;
}
</style>
