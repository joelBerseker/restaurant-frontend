<script setup>
import { ref, reactive, onMounted, inject } from "vue";
import CardLink from "@/common/CardLink.vue";
const list = ref(["table"]);
</script>
<template>
  <g-section-1 subTitle="Gestion de usuarios y sus roles en el sistema">
    <template #content>
      <div class="row gutter-sec">
        <div class="col-4" v-for="(element, index) in list" :key="index">
          <CardLink :name="element" />
        </div>
      </div>
    </template>
  </g-section-1>
</template>
