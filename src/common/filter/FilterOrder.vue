<script setup>
import { ref, reactive, computed } from "vue";

const props = defineProps({
  columns: { default: [] },
  filter: { default: {} },
  defaultFilter: { default: {} },
});

const emit = defineEmits(["search"]);
const textButton = computed(() => {
  let resp = "";

  let search = filterOptions.orderBy.options.find(
    (x) => x.value === filterOptions.orderBy.value
  );
  if (search !== undefined) resp = search;
  return resp.text;
});
const iconButton = computed(() => {
  let resp = "";

  if (filterOptions.order.value === "asc") {
    resp = filterOptions.order.options[0].icon;
  } else if (filterOptions.order.value === "desc") {
    resp = filterOptions.order.options[1].icon;
  } else {
    resp = "fa-solid fa-arrow-down-up-across-line";
  }
  return resp;
});
const filterOptions = reactive({
  orderBy: {
    value: "id",
    options: [],
  },
  order: {
    value: "asc",
    options: [
      { value: "asc", text: "Asc", icon: "fa-solid fa-arrow-up-a-z" },
      { value: "desc", text: "Desc", icon: "fa-solid fa-arrow-down-z-a" },
    ],
  },
});
function search() {
  props.filter.orderBy = filterOptions.orderBy.value;
  props.filter.order = filterOptions.order.value;
  emit("search");
}

function initFilter() {
  changeSort(props.filter);

  filterOptions.orderBy.options = [];
  for (let i = 0; i < props.columns.length; i++) {
    const element = props.columns[i];

    if (element.sortable) {
      let elementOrderBy = { value: element.field, text: element.label };
      filterOptions.orderBy.options.push(elementOrderBy);
    }
    if (element.field === filterOptions.orderBy.value) {
      element.sort = filterOptions.order.value;
    } else {
      element.sort = undefined;
    }
  }
}

//para cuando viene de la tabla
function sort(_data) {
  changeSort(_data);
  search();
}
function changeSort(_data) {
  filterOptions.orderBy.value = _data.orderBy;
  filterOptions.order.value = _data.order;
}
function searchSort() {
  changeColumns();
  search();
}
function changeColumns() {
  props.columns.forEach((element) => {
    if (element.field === filterOptions.orderBy.value) {
      element.sort = filterOptions.order.value;
    } else {
      element.sort = undefined;
    }
  });
}
function reset() {
  changeSort(props.defaultFilter);
  changeColumns();
}
function init() {
  initFilter();
}
init();
defineExpose({
  reset,
  sort,
});
</script>
<template>
  <div>
    <div>
      <label>Orden:</label>
    </div>
    <g-button
      type="search"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-auto-close="outside"
      :text="textButton"
      :icon="iconButton"
    />
    <div class="dropdown-menu p-3" style="width: 300px">
      <label>Orden</label>
      <div class="row g-3">
        <div class="col-8">
          <g-select
            v-model="filterOptions.orderBy.value"
            :options="filterOptions.orderBy.options"
            @change="searchSort"
            :clearButton="false"
          />
        </div>
        <div class="col-4 ps-0">
          <g-select
            v-model="filterOptions.order.value"
            :options="filterOptions.order.options"
            @change="searchSort"
            :clearButton="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>
