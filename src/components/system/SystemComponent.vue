<script setup>
import SystemSidebar from "@/components/system/SystemSidebar.vue";
import SystemTopbar from "@/components/system/SystemTopbar.vue";
import SystemLayout from "@/components/system/SystemLayout.vue";
import { ref, provide, inject, reactive } from "vue";
import { useRouter } from "vue-router";
import { sleep } from "@/helpers";
import { authService } from "@/services";
import { useSystemUtilStore } from "@/stores";

const confirmDialogue = inject("confirmDialogue");

const router = useRouter();
const useSystemUtil = useSystemUtilStore();

const sidebarRef = ref(null);
const topbarRef = ref(null);
const topbar = ref({
  breadcrumb: [],
});

function setTopbar(data) {
  topbar.value = data;
}
function switchSidebar() {
  sidebarRef.value.switchSidebar();
}
function closeSidebar() {
  sidebarRef.value.closeSidebar();
}
function buttonBack() {
  topbarRef.value.buttonBack();
}
async function confirmLogout() {
  let confirm = await confirmDialogue("logout");
  if (confirm) {
    useSystemUtil.isLoadingApp(true, "Saliendo del sistema, espere por favor.");
    await sleep(700);
    await authService.logoutUser();
    router.push("/login");
  }
}

provide("switchSidebar", switchSidebar);
provide("confirmLogout", confirmLogout);
provide("setTopbar", setTopbar);
provide("buttonBack", buttonBack);
</script>
<template>
  <SystemLayout @closeSidebar="closeSidebar">
    <template #sidebar>
      <SystemSidebar ref="sidebarRef" />
    </template>
    <template #topbar>
      <SystemTopbar ref="topbarRef" :topbar="topbar" />
    </template>
    <template #content>
      <router-view v-slot="{ Component, route }">
        <transition name="transition" mode="out-in">
          <component
            :is="Component"
            @loaded="loadedContent()"
            :key="route.path"
          />
        </transition>
      </router-view>
    </template>
  </SystemLayout>
</template>
<style scoped>
.transition-enter-active,
.transition-enter {
  transition: all 0.2s ease;
}
.transition-leave-active {
  transition: all 0.2s ease;
}
.transition-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
.transition-enter-from {
  transform: translateY(10px);
  opacity: 0;
}
</style>
