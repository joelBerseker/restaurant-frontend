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
  changeInSelect: { default: true },
  nullText: { default: "Seleccione una opción" },
  nullOption: { default: false },
  validation: { default: null },
  autoClose: { default: null },
  dropDirection: { default: null },
});

const selectRef = ref(null);
const emit = defineEmits([
  "update:modelValue",
  "change",
  "select",
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
const selected = ref(null);
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
  if (isEmpty(value.value)) {
    if (props.disabled) resp.text = "No definido";
    else resp.text = props.nullText;
    return resp;
  }

  if (
    !isEmpty(selected.value) &&
    !props.disabled &&
    selected.value.value === value.value
  ) {
    console.log(selected.value);
    resp.text = selected.value.text;
    resp.additional = selected.value.additional;
    return resp;
  }

  if (!isEmpty(props.valueText)) {
    if (typeof props.valueText === "object") {
      resp.text = props.valueText.text;
      resp.additional = props.valueText.additional;
    } else {
      resp.text = props.valueText;
    }
    return resp;
  }
  let search = props.options.find((x) => x[props.valueOptions] === value.value);
  if (search) return search;

  return resp;
});
function clear() {
  if (!props.changeInSelect) {
    value.value = null;
    selected.value = null;

    emit("clear", null);
  }
  emit("select", null);
}
function changeValue(_item) {
  if (props.changeInSelect) {
    value.value = _item[props.valueOptions];
    selected.value = _item;
  }
  console.log(_item);
  emit("select", _item);
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
    wrapperClass="g-select"
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
    <template v-slot:form="{ onFocus, onBlur }">
      <div :class="[dropDirection, 'w-100']">
        <button
          :id="id"
          ref="selectRef"
          :disabled="disabled"
          :class="[
            'g-select form-select form-select-sm text-start w-100',
            selectClass,
          ]"
          type="button"
          aria-expanded="false"
          data-bs-toggle="dropdown"
          data-bs-popper-config='{"strategy":"fixed"}'
          :data-bs-auto-close="autoClose"
          @click="clickButton"
          @focus="onFocus"
          @blur="onBlur"
        >
          <span class="dropdown-text">
            <div v-if="!isEmpty(selectValue.text)">{{ selectValue.text }}</div>
            <div v-else>&nbsp;</div>

            <div
              v-if="
                selectValue.additional !== undefined && showAditionalInSelect
              "
              class="additional-data-input"
            >
              {{ selectValue.additional }}
            </div>
          </span>
        </button>
        <div class="dropdown-menu dropdown-select" tabindex="-1">
          <LoadingContainer
            :loading="loading"
            loadingClass="loading-transparent"
          >
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
      </div>
    </template>
  </ElementFormLayout>
</template>
<style>
.form-select {
  background-position: right 0rem center;
  padding-right: 1.3rem;
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
.dropdown-item:hover .additional-data-input {
  color: var(--color-w-v4);
}
</style>
<style scoped>
.empty-text-list {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  color: var(--color-b-v3);
  font-size: 14px;
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
