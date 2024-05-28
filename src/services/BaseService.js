// En un archivo BaseService.js
import axiosInstance from "./axios-instance";
import { handleError } from "@/helpers";

export const BaseService = {
  async changeStatus(endpoint, data) {
    try {
      const response = await axiosInstance.patch(endpoint, data.changeStatus());
      return response;
    } catch (error) {
      handleError(error);
    }
  },
};
