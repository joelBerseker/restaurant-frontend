<script setup>
import { ref, computed } from "vue";
import { isEmpty } from "@/helpers";
import LoadingContainer from "@/common/container/LoadingContainer.vue";

const props = defineProps({
  modelValue: { default: null },
  options: { default: [] },
  emptyText: { default: null },
  textOptions: { default: "text" },
  valueOptions: { default: "value" },
  disabled: { default: false },
  loading: { default: false },
  noChangeValue: { default: false },
  nullText: { default: "Seleccione una opción" },
  nullOption: { default: false },
  type: { default: "primary" },
});

const selectRef = ref(null);
const emit = defineEmits([
  "update:modelValue",
  "change",
  "changeComplete",
  "clear",
  "noChangeValue",
]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
    emit("change", value);
  },
});
const activeOptions = computed(() => {
  let resp = [];
  props.options.forEach((element) => {
    if (element.disabled !== true) {
      resp.push(element);
    }
  });
  return resp;
});
const selectValue = computed(() => {
  if (isEmpty(value.value)) {
    if (props.emptyText !== null) return { text: props.emptyText };
    return { text: props.nullText };
  } else {
    let search = props.options.find(
      (x) => x[props.valueOptions] === value.value
    );
    if (search !== undefined) return search;
    return { text: "No encontrado" };
  }
});
function clear() {
  if (props.noChangeValue) {
    emit("noChangeValue", null);
    return;
  }
  value.value = null;
  emit("clear", null);
}
function changeValue(_item) {
  if (props.noChangeValue) {
    emit("noChangeValue", _item);
    return;
  }
  value.value = _item[props.valueOptions];
  emit("changeComplete", _item);
}
function selectItem(_item) {
  changeValue(_item);
}
function tabAction(_item) {
  selectItem(_item);
}
</script>
<template>
  <g-button
    :icon="selectValue.icon"
    :text="selectValue.text"
    :type="type"
    ref="selectRef"
    aria-expanded="false"
    data-bs-toggle="dropdown"
    data-bs-popper-config='{"strategy":"fixed"}'
  />
  <div class="dropdown-menu dropdown-select" tabindex="-1">
    <LoadingContainer :loading="loading" loadingClass="loading-transparent">
      <slot name="header-list"></slot>
      <ul class="list-items">
        <li v-if="nullOption">
          <button
            :class="['dropdown-item item-select item-active-hover']"
            @click="clear()"
            @keydown.tab="tabAction()"
            tabindex="-1"
            type="button"
          >
            {{ nullText }}
          </button>
        </li>
        <li v-for="(item, index) in activeOptions" :key="index">
          <button
            :ref="'selectlistItem' + index"
            :class="['dropdown-item item-select item-active-hover']"
            @click="selectItem(item)"
            @keydown.tab="tabAction(item)"
            tabindex="-1"
            type="button"
          >
            {{ item[props.textOptions] }}
            <div
              v-if="item.aditional !== undefined"
              class="aditional-data-input"
            >
              {{ item.aditional }}
            </div>
          </button>
        </li>
        <li
          v-show="activeOptions.length <= 0 && !nullOption"
          class="empty-text-list text-center"
        >
          No se encontraron registros
        </li>
      </ul>
      <slot name="footer-list"></slot>
    </LoadingContainer>
  </div>
</template>
<style>
.form-select:disabled {
  --bs-form-select-bg-img: none;
  padding-right: 0.5rem;
}
.text-aditional {
  display: block;
}
.aditional-data-input {
  text-transform: capitalize;
  font-size: 13px;
  font-weight: 500;
  color: var(--g-wb500);
}
.aditional-data {
  text-transform: capitalize;
  font-size: 13px;
  font-weight: 500;
  color: var(--g-wb500);
  display: flex;
}
</style>
<style scoped>
.empty-text-list {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.list-items {
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  max-height: 165px;
}
.item-active-hover:focus-visible {
  background-color: var(--g-wb300) !important;
  outline: none;
}
.dropdown-select {
  width: 300px;

  padding-top: 0rem;
  padding-bottom: 0rem;
  overflow: hidden;
}
.dropdown-text {
  width: 100%;
  display: block;
  overflow: hidden;
  white-space: pre;
}
</style>
