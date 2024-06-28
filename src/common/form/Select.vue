<script setup>
import { ref, computed } from "vue";
import { isEmpty } from "@/helpers";
import LoadingContainer from "@/common/container/LoadingContainer.vue";
import ElementFormLayout from "@/common/form/ElementFormLayout.vue";

const props = defineProps({
  id: { default: null },

  modelValue: { default: null },
  options: { default: [] },

  valueText: { default: null },
  valueTextAdditional: { default: null },

  viewMode: { default: true },
  textOptions: { default: "text" },
  valueOptions: { default: "value" },
  disabled: { default: false },
  viewClass: { default: "" },
  loading: { default: false },
  selectClass: { default: "" },
  label: { default: null },
  labelClass: { default: "" },
  helpText: { default: "" },
  showHelpText: { default: true },
  clearButton: { default: true },
  display: { default: null },
  loadingSelect: { default: true },
  showAditionalInSelect: { default: true },
  noChangeValue: { default: false },
  nullText: { default: "Seleccione una opción" },
  nullOption: { default: false },
  validation: { default: null },
});

const selectRef = ref(null);
const emit = defineEmits([
  "update:modelValue",
  "change",
  "changeGetComplete",
  "clear",
  "clickButton",
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
const valueComplete = ref(null);
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
  let _valueText = null;
  let _valueTextAditional = null;

  let resp = {
    text: "No encontrado",
    additional: null,
  };
  if (typeof props.valueText === "object" && props.valueText !== null) {
    _valueText = props.valueText.text;
    _valueTextAditional = props.valueText.additional;
  } else {
    _valueText = props.valueText;
  }

  if (!props.disabled) {
    if (isEmpty(value.value)) {
      resp.text = props.nullText;
      return resp;
    }
    let search = props.options.find(
      (x) => x[props.valueOptions] === value.value
    );
    if (search) return search;
  }

  if (!isEmpty(_valueText)) {
    resp.text = _valueText;
    resp.additional = _valueTextAditional;
    if (props.display) {
      resp.text = props.display(resp.text);
    }
    return resp;
  }
  return resp;
});
function clear() {
  if (!props.noChangeValue) {
    value.value = null;
    emit("clear", null);
  }
  emit("changeGetComplete", null);
}
function changeValue(_item) {
  if (!props.noChangeValue) {
    value.value = _item[props.valueOptions];
  }
  emit("changeGetComplete", {
    value: _item[props.valueOptions],
    valueComplete: _item,
  });
}
function selectItem(_item) {
  changeValue(_item);
}
function clickButton(_item) {
  emit("clickButton");
}
function tabAction(_item) {
  selectItem(_item);
}
</script>
<template>
  <ElementFormLayout
    :id="id"
    :label="label"
    :value="value"
    :labelClass="labelClass"
    :helpText="helpText"
    :showHelpText="showHelpText"
    :disabled="disabled"
    :loading="loading && loadingSelect"
    :viewMode="viewMode"
    :clearButton="clearButton"
    @clear="clear"
    :validation="validation"
  >
    <template v-slot:view>
      <div :class="[viewClass]">
        <span
          v-if="isEmpty(selectValue.text) || selectValue.text === nullText"
          class="status-element no-defined-status"
        >
          Por determinar
        </span>

        <span v-else>
          {{ selectValue.text }}
          <div
            v-if="selectValue.additional !== undefined && showAditionalInSelect"
            class="additional-data"
          >
            <span class="text-additional">{{ selectValue.additional }}</span>
          </div>
        </span>
      </div>
    </template>
    <template v-slot:form>
      <button
        :id="id"
        ref="selectRef"
        :disabled="disabled"
        :class="['g-select form-select form-select-sm text-start', selectClass]"
        type="button"
        aria-expanded="false"
        data-bs-toggle="dropdown"
        data-bs-popper-config='{"strategy":"fixed"}'
        @click="clickButton"
      >
        <span class="dropdown-text">
          <div v-if="!isEmpty(selectValue.text)">{{ selectValue.text }}</div>
          <div v-else>&nbsp;</div>

          <div
            v-if="selectValue.additional !== undefined && showAditionalInSelect"
            class="additional-data-input"
          >
            {{ selectValue.additional }}
          </div>
        </span>
      </button>
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
                  v-if="item.additional !== undefined"
                  class="additional-data-input"
                >
                  {{ item.additional }}
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
  </ElementFormLayout>
</template>
<style>
.form-select {
  background-position: right 0rem center;
  padding-right: 1.5rem;
}
.g-form-wrapper.show-extra .form-select {
  padding-right: 2.5rem;
  background-position: right 1.4rem center;
}
.form-select:disabled {
  --bs-form-select-bg-img: none;
  padding-right: 0rem;
}
.text-additional {
  display: block;
}
.additional-data-input {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-b-v3);
}
.additional-data {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-b-v3);

  display: flex;
}
.dropdown-item {
  transition: 0.3s;
  font-size: 14px;
}
.dropdown-item.active,
.dropdown-item:active,
.dropdown-item:hover {
  background-color: var(--color-1) !important;
  color: var(--color-w-v2) !important;
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
