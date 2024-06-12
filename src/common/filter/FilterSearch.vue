<script setup>
import { ref, reactive, computed, inject } from "vue";
import { isEmpty, sleepInput } from "@/helpers/utilities";
import { useToastStore } from "@/stores";
const useToast = useToastStore();

const props = defineProps({
  columns: { default: [] },
  filter: {
    default: {},
  },
  defaultFilter: { default: {} },
});

const emit = defineEmits(["search"]);

const filterOptions = reactive({
  searchBy: [],
  searchBySelected: [],
  searchInput: null,
});
function search() {
  if (isEmpty(filterOptions.searchInput)) {
    delete props.filter.search;
    delete props.filter.searchBy;
  } else {
    props.filter.search = filterOptions.searchInput;
    props.filter.searchBy = filterOptions.searchBySelected;
  }

  emit("search");
}
function checkValidation(_key) {
  console.log(filterOptions.searchBySelected);
  if (filterOptions.searchBySelected.length <= 0) {
    filterOptions.searchBySelected.push(_key);
    useToast.show("check_validation_filter");
    return;
  }
  search();
}

function restoreFilter() {
  filterOptions.searchInput = null;

  filterOptions.searchBySelected = [];
  filterOptions.searchBy.forEach((element) => {
    filterOptions.searchBySelected.push(element.key);
  });
}

function initFilter() {
  filterOptions.searchBy = [];
  filterOptions.searchBySelected = [];

  for (let i = 0; i < props.columns.length; i++) {
    const element = props.columns[i];
    if (element.searchable) {
      let elementsearchBy = {
        text: element.label,
        key: element.field,
        value: true,
      };
      filterOptions.searchBy.push(elementsearchBy);
      filterOptions.searchBySelected.push(elementsearchBy.key);
    }
  }
  if (props.filter.searchBy) {
    filterOptions.searchBySelected = [];
    props.filter.searchBy.forEach((element) => {
      filterOptions.searchBySelected.push(element);
    });
  }
  if (props.filter.search) {
    filterOptions.searchInput = props.filter.search;
  }
}

function reset() {
  restoreFilter();
}
function init() {
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
      {{ filterOptions.searchBySelected.length }}
    </div>
    <div class="w-100 search-icon-container">
      <g-input
        v-model="filterOptions.searchInput"
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
            :value="item.key"
            v-model="filterOptions.searchBySelected"
            @change="checkValidation(item.key)"
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
