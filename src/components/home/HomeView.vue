<script setup>
import SystemContainer from "@/components/system/SystemContainer.vue";
import { ref } from "vue";
import { BasicModel } from "@/models/BasicModel";

const select = ref(null);
const input = ref(null);

const item = ref(new BasicModel());

const options = ref([
  { value: "1", text: "hola" },
  { value: "2", text: "hola2" },
]);
</script>
<template>
  <SystemContainer :loaded="true">
    <g-form :elementModel="BasicModel" v-slot="{ element, validateLabel }">
      <g-input-val
        v-model="element.table_name"
        label="input"
        @validate="validateLabel"
        class="mb-3"
      />
      <g-select-val
        v-model="element.id_user"
        :options="options"
        label="select"
        @validate="validateLabel"
      />
      <g-select v-model="select" :options="options" label="select" />
    </g-form>
  </SystemContainer>
</template>
