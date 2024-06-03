<script setup>
import { ref, reactive, computed, watch, inject } from "vue";
import { status } from "@/helpers";
import { useUserStore } from "@/stores/userStore";

const props = defineProps({
  filter: { default: {} },
});
//  const permises = inject("permises");
const userStore = useUserStore();

const emit = defineEmits(["search"]);
const statusOptions = reactive({
  value: "1",
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
  props.filter.status = "1";
  statusOptions.value = "1";
}
defineExpose({
  reset,
});
</script>
<template>
  <!---g-select-button
    v-model="statusOptions.value"
    :options="statusOptionsPermises"
    @change="search()"
    label="Estado"
    icon="bi bi-arrow-repeat"
    class="no-wrap"
  /--->
</template>
