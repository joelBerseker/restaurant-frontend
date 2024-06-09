<script setup>
import { ref, reactive, computed, inject } from "vue";
import { sleepInput } from "@/helpers/utilities";
import { useToastStore } from "@/stores";
const useToast = useToastStore();

const props = defineProps({
  columns: { default: [] },
  filter: {
    default: {},
  },
});

const emit = defineEmits(["search"]);
const textButton = computed(() => {
  let resp = 0;
  filterOptions.searchBy.forEach((element) => {
    if (element.value) {
      resp++;
    }
  });
  return resp;
});
const filterBackup = ref({});
const filterOptions = reactive({
  searchBy: [],
});
function search(index = null) {
  props.filter.search = searchInput.value;
  props.filter.searchBy = checkValidation(index);
  if (props.filter.searchBy.length > 0) emit("search");
}
function checkValidation(index) {
  let sum = 0;
  let _searchBy = [];

  for (let i = 0; i < filterOptions.searchBy.length; i++) {
    const element = filterOptions.searchBy[i];
    if (element.value) {
      sum++;
      _searchBy.push(element.key);
    }
  }
  if (sum < 1) {
    filterOptions.searchBy[index].value = true;
    useToast.show("check_validation_filter");
  }
  return _searchBy;
}
const searchInput = ref(null);
function copyFilter() {
  if (props.filter.searchBy !== undefined) {
    filterBackup.value.searchBy = JSON.parse(
      JSON.stringify(props.filter.searchBy)
    );
  }
}
function restoreFilter() {
  props.filter.search = "";
  if (filterBackup.value.searchBy !== undefined) {
    props.filter.searchBy = JSON.parse(
      JSON.stringify(filterBackup.value.searchBy)
    );
  } else {
    delete props.filter.searchBy;
  }
}

function initFilter() {
  filterOptions.searchBy = [];
  for (let i = 0; i < props.columns.length; i++) {
    const element = props.columns[i];
    if (element.searchable) {
      let elementsearchBy = {
        text: element.label,
        key: element.field,
        value: true,
      };
      filterOptions.searchBy.push(elementsearchBy);
    }
  }
}

function reset() {
  restoreFilter();
  searchInput.value = null;
  initFilter();
}
function init() {
  copyFilter();
  initFilter();
}
init();
defineExpose({
  reset,
});
</script>
<template>
  <label>Buscar:</label>
  <div class="d-flex container-select">
    <div class="count-select">
      {{ textButton }}
    </div>
    <div class="w-100 search-icon-container">
      <g-input
        v-model="searchInput"
        inputClass="filter-input"
        class="filter"
        placeholder="¿Que estas buscando?"
        @input="search()"
        @clear="search()"
        :awaitInput="true"
      />
      <div class="search-icon">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </div>
    </div>
    <g-button
      class="filter-search"
      type="search"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-auto-close="outside"
      icon="fa-solid fa-sliders"
      title="Filtro"
    />
    <div class="dropdown-menu dropdown-menu-end p-3" style="width: 300px">
      <div v-if="filterOptions.searchBy.length > 0" class="col-12">
        <div><label>Buscar por: </label></div>
        <div
          v-for="(item, index) in filterOptions.searchBy"
          :key="index"
          class="form-check form-check-inline"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :id="'inlineCheckbox' + index + item.text"
            v-model="item.value"
            @change="search(index)"
          />
          <p
            class="form-check-label"
            :for="'inlineCheckbox' + index + item.text"
          >
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
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
.filter-input {
  padding-left: 1.4rem;
  padding-right: 1.1rem;
}
.filter-settings {
  border-radius: 0rem !important;
}
.filter-search {
  margin-left: -0.75rem;
  background-color: var(--color-w-v3);
}
</style>
