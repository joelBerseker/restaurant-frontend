<script setup>
import { ref, reactive, onMounted, inject } from "vue";
import CardLink from "@/common/CardLink.vue";

import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const router = useRouter();

const list = ref(["table", "reservation"]);

const listWithPermises = ref([]);

function getModuleId(name) {
  const resolved = router.resolve({ name: name });
  return resolved.meta.moduleid;
}
function getListWithPermises() {
  let resp = [];
  for (let i = 0; i < list.value.length; i++) {
    const element = list.value[i];
    let moduleId = getModuleId(element);
    let havePermise = userStore.getPermiseAction(moduleId);
    if (havePermise) resp.push(element);
  }
  listWithPermises.value = resp;
}
function init() {
  getListWithPermises();
}
init();
</script>
<template>
  <g-section-1 subTitle="Gestion de mesas y reservaciones en el sistema">
    <template #content>
      <div class="row gutter-sec">
        <div
          class="col-4"
          v-for="(element, index) in listWithPermises"
          :key="index"
        >
          <CardLink :name="element" />
        </div>
      </div>
    </template>
  </g-section-1>
</template>
