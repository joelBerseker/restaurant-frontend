<script setup>
import { ref, reactive, computed, watch, inject } from "vue";
import { status } from "@/helpers";
import { useUserStore } from "@/stores/userStore";

const props = defineProps({
  filter: { default: {} },
  defaultFilter: { default: {} },
});
//  const permises = inject("permises");
const userStore = useUserStore();

const emit = defineEmits(["search"]);
const statusOptions = reactive({
  value: "0",
  options: status.options,
});
function search() {
  if (statusOptions.value === "0") {
    props.filter.status = undefined;
  } else {
    props.filter.status = statusOptions.value;
  }
  emit("search");
}
const statusOptionsPermises = computed(() => {
  status.options.forEach((element) => {
    element.disabled = false;
  });
  console.log(userStore.isAdmin());
  if (userStore.isAdmin()) {
    return status.options;
  } else {
    status.options[3].disabled = true;
  }
  console.log(permises.value);
  if (!permises.value.active) {
    status.options[2].disabled = true;
  }
  if (status.options[2].disabled === true) {
    status.options[0].disabled = true;
  }
  return status.options;
});
function reset() {
  if (props.defaultFilter.status) {
    statusOptions.value = props.defaultFilter.status;
  } else {
    statusOptions.value = "0";
  }
}
function init() {
  console.log(props.filter.status);
  if (props.filter.status !== undefined) {
    statusOptions.value = props.filter.status;
    console.log("#asdasd");
  }
  console.log(statusOptions.value);
}
init();
defineExpose({
  reset,
});
</script>
<template>
  <div>
    <div>
      <label>Estado</label>
    </div>
    <g-button-select
      v-model="statusOptions.value"
      :options="status.options"
      @change="search()"
      type="search"
    />
  </div>
</template>
