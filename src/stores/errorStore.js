import { defineStore } from "pinia";

export const useErrorStore = defineStore({
  id: "error",
  state: () => ({
    errorLog: [],
  }),
  getters: {
    getErrorLog: (state) => state.errorLog,
  },
  actions: {
    handleError(error) {
      const timestamp = new Date();
      console.error(`Error: ${error.message}, Timestamp: ${timestamp}`);

      // Guarda el error en el registro de logs
      this.logError(error, timestamp);
    },
    logError(error, timestamp) {
      this.errorLog.push({
        message: error.message,
        timestamp: timestamp,
        stack: error.stack,
      });
    },
    clearErrors() {
      this.errorLog = [];
    },
  },
  persist: {
    enabled: true,
    key: "error",
  },
});
