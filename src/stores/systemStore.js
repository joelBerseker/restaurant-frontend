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
export const useSystemUtilStore = defineStore("system_util", {
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

export const useToastStore = defineStore("toast", {
  state: () => ({
    toast_text: null,
    toast_count: 0,
    toast_aditional: null,
  }),
  getters: {
    text: (state) => state.toast_text,
    count: (state) => state.toast_count,
    aditional: (state) => state.toast_aditional,
  },
  actions: {
    show(_text, _aditional) {
      this.toast_text = _text;
      this.toast_aditional = _aditional;
      this.toast_count++;
      if (this.toast_count > 10) {
        this.toast_count = 0;
      }
    },
  },
});
