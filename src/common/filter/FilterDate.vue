<script setup>
import { ref, reactive, computed } from "vue";
import { isEmpty } from "@/helpers/utilities";
import { validations } from "@/helpers/validations";

const props = defineProps({
  filter: { default: {} },
});
const emit = defineEmits(["search"]);
const textDateButton = computed(() => {
  return filterDate.get(filterDate.value);
});
const filterDate = reactive({
  value: 0,
  options: [
    { value: 0, text: "Todos" },
    { value: 1, text: "Ultimo día" },
    { value: 2, text: "Ultima semana" },
    { value: 3, text: "Ultimo meses" },
    { value: 4, text: "Ultimo año" },
    { value: 5, text: "Fecha especifica" },
    { value: 6, text: "Año especifico" },
    { value: 7, text: "Rango de fechas" },
  ],
  get(_value) {
    return this.options[_value].text;
  },
});
const range = reactive({
  start: {
    value: null,
  },
  end: {
    type: "date",
    value: null,
    validation: {},
    validate() {
      this.validation = validations.dateMin(
        this.value,
        range.start.value,
        "DESDE",
        false
      );
    },
  },
});
const specificDate = ref(null);
const specificYear = reactive({
  value: null,
  validation: {},
  validate() {
    this.validation = validations.number(this.value, 4, 4);
  },
});
function search() {
  delete props.filter.interval;
  delete props.filter.start_date;
  delete props.filter.end_date;
  delete props.filter.specific_date;
  delete props.filter.year_date;
  if (filterDate.value === 1) {
    props.filter.interval = "day";
  }
  if (filterDate.value === 2) {
    props.filter.interval = "weeks";
  }
  if (filterDate.value === 3) {
    props.filter.interval = "months";
  }
  if (filterDate.value === 4) {
    props.filter.interval = "years";
  }
  if (filterDate.value === 5) {
    if (isEmpty(specificDate.value)) return;
    props.filter.specific_date = specificDate.value;
  }
  if (filterDate.value === 6) {
    if (isEmpty(specificYear.value)) return;
    specificYear.validate();
    if (!specificYear.validation.isValid) return;
    props.filter.year_date = specificYear.value;
  }
  if (filterDate.value === 7) {
    if (isEmpty(range.start.value)) return;
    range.end.validate();
    if (!range.end.validation.isValid) return;
    props.filter.start_date = range.start.value;
    props.filter.end_date = range.end.value;
  }
  emit("search");
}
function reset() {
  filterDate.value = 0;
  range.start.value = null;
  range.end.value = null;
  range.end.validation = {};
  specificDate.value = null;
  specificYear.value = null;
  specificYear.validation = {};

  delete props.filter.interval;
  delete props.filter.start_date;
  delete props.filter.end_date;
  delete props.filter.specific_date;
  delete props.filter.year_date;
}
defineExpose({
  reset,
});
</script>
<template>
  <div class="container-select">
    <div class="value-select">
      {{ textDateButton }}
    </div>
    <g-button
      type="secondary"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-auto-close="outside"
      text="Fecha"
      icon="bi bi-calendar3"
      class="no-wrap"
    />
    <div class="dropdown-menu p-3" style="width: 300px">
      <div class="row g-2">
        <div class="col-12">
          <h-select
            label="Filtro de fechas"
            v-model="filterDate.value"
            :options="filterDate.options"
            @change="search()"
            :clearButton="false"
          >
          </h-select>
        </div>
        <div v-if="filterDate.value == 5" class="col-12">
          <h-input
            label="Fecha Especifica"
            type="date"
            v-model="specificDate"
            @input="search()"
          />
        </div>
        <div v-if="filterDate.value == 6" class="col-12">
          <h-input-validation
            label="Año Especifico"
            :data="specificYear"
            @change="search()"
            :onlyDanger="true"
          />
        </div>
        <div v-if="filterDate.value == 7" class="col-12">
          <div class="row g-2">
            <div class="col-6">
              <h-input
                label="Desde"
                type="date"
                v-model="range.start.value"
                @input="search()"
              />
            </div>
            <div class="col-6">
              <h-input-validation
                label="Hasta"
                :data="range.end"
                @change="search()"
                :onlyDanger="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.container-select {
  position: relative;
}
.value-select {
  position: absolute;
  bottom: -10px;
  right: 0px;
  background-color: var(--g-success);
  color: var(--g-wb200);
  padding-left: 0.35rem;
  padding-right: 0.35rem;
  padding-top: 0rem;
  padding-bottom: 0rem;
  border-radius: 999rem;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
}
</style>
