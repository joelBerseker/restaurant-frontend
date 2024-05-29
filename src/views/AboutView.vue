<script setup>
import { BasicModel } from "@/models/BasicModel";
import { ref } from "vue";

const item = ref(new BasicModel());
const form = ref(null);
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <g-form
      ref="form"
      :elementModel="BasicModel"
      v-slot="{ element, validateLabel }"
    >
      <g-input-val
        v-model="element.table_name"
        :label="element.table_name.name"
        helpText="Nose que poner"
        @validate="validateLabel"
      />
      <g-input-val
        v-model="element.table_description"
        :label="element.table_description.name"
        helpText="Nose que poner"
        @validate="validateLabel"
      />
    </g-form>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
