// En un archivo BaseService.js
import axiosInstance from "./axios-instance";
import { handleError } from "@/helpers";
import { useToastStore } from "@/stores";

export const BaseService = {
  async changeStatus(endpoint, data, module = null) {
    try {
      const response = await axiosInstance.patch(endpoint, data.changeStatus());
      const useToast = useToastStore();
      useToast.show("status_success", `Estado cambiado a ${data.getStatus()}.`);
      return response;
    } catch (error) {
      const useToast = useToastStore();
      handleError(error, "status_error", module);
      handleError(error);
    }
  },
};
