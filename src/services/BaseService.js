// En un archivo BaseService.js
import axiosInstance from "./axios-instance";
import { handleError } from "@/helpers";
import { useToastStore } from "@/stores";

export const BaseService = {
  async changeStatus(endpoint, data, module = null) {
    let successToast = "active_success";
    let errorToast = "active_error";
    if (data.status.value === 1) {
      successToast = "deactive_success";
      errorToast = "deactive_error";
    }

    try {
      const response = await axiosInstance.patch(endpoint, data.changeStatus());
      const useToast = useToastStore();
      useToast.show(successToast, {
        important_text: data.getTextModel(),
      });
      return response;
    } catch (error) {
      handleError(error, "status_error", module);
    }
  },
};
