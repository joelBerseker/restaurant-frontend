import { defineStore } from "pinia";
import { copyObject } from "@/helpers";
export const useSystemStore = defineStore("system", {
  state: () => ({
    filter_cache: {},
  }),
  getters: {
    filterCache: (state) => state.filter_cache,
  },
  actions: {
    addFilterCache(_name, _value) {
      let newValue = {};
      newValue = copyObject(_value);
      this.filter_cache[_name] = newValue;
    },
    deleteFilterCache(_name) {
      delete this.filter_cache[_name];
    },
  },
  persist: true,
});
export const useSystemUtilStore = defineStore("system_util", {
  state: () => ({
    loading_app: true,
    loading_app_message: "Bienvenido, espere por favor.",
    loading_content_system: true,
  }),
  getters: {
    loadingApp: (state) => state.loading_app,
    loadingAppMessage: (state) => state.loading_app_message,
    loadingContentSystem: (state) => state.loading_content_system,
  },
  actions: {
    isLoadingApp(flag, message = "Bienvenido, espere por favor.") {
      this.loading_app = flag;
      if (flag) {
        this.loading_app_message = message;
      }
    },
    isLoadingContentSystem(flag) {
      this.loading_content_system = flag;
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
    show(_text, _aditional = null, _list = []) {
      this.toast_text = _text;
      this.toast_aditional = _aditional;
      this.toast_count++;

      if (this.toast_count > 10) {
        this.toast_count = 0;
      }
    },
  },
});
