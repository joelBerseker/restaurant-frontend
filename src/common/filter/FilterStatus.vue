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

  if (userStore.isAdmin()) {
    return status.options;
  } else {
    status.options[3].disabled = true;
  }

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
  if (!userStore.isAdmin()) {
    statusOptions.options.splice(3, 1);
  }
  if (props.filter.status !== undefined) {
    if (!(!userStore.isAdmin() && props.filter.status === "3")) {
      statusOptions.value = props.filter.status;
    }
  }
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
