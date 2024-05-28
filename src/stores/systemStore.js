import { defineStore } from "pinia";

export const useSystemStore = defineStore("system", {
  state: () => ({
    loading_system: true,
    loading_content_system: true,
    filter: {},
    notification: "",
    mayus: true,
    permises: {},
  }),
  getters: {
    loadingSystem: (state) => state.loading_system,
    loadingContentSystem: (state) => state.loading_content_system,
    getNotification: (state) => state.notification,
  },
  actions: {
    isLoadingSystem(flag) {
      this.loading_system = flag;
    },
    isLoadingContentSystem(flag) {
      this.loading_content_system = flag;
    },
    newNotifation(new_notify) {
      this.notification = new_notify;
    },
    loadingRestart() {
      this.$reset();
    },
  },
  persist: true,
});
export const useSystemStoreNoPersist = defineStore("system_no_persist", {
  state: () => ({
    loading_app: true,
    loading_app_message: "Bienvenido, espere por favor.",
  }),
  getters: {
    loadingApp: (state) => state.loading_app,
    loadingAppMessage: (state) => state.loading_app_message,
  },
  actions: {
    isLoadingApp(flag, message = "Bienvenido, espere por favor.") {
      this.loading_app = flag;
      if (flag) {
        this.loading_app_message = message;
      }
    },
    loadingRestart() {
      this.$reset();
    },
  },
});
