import { typeProductApiRestService } from "@/services/product/typeProductApiRestService";
import { typeProductJsonService } from "@/services/product/typeProductJsonService";
const mode = import.meta.env.VITE_APP_MODE;

export const typeProductService = {
  async getTypeProduct(typeProduct_id) {
    switch (mode) {
      case "production":
        return await typeProductApiRestService.getTypeProduct(typeProduct_id);
      case "test":
        return await typeProductJsonService.getTypeProduct(typeProduct_id);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async getListTypeProduct(filterParams = null) {
    switch (mode) {
      case "production":
        return await typeProductApiRestService.getListTypeProduct(filterParams);
      case "test":
        return await typeProductJsonService.getListTypeProduct(filterParams);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },

  async addTypeProduct(new_data) {
    switch (mode) {
      case "production":
        return await typeProductApiRestService.addTypeProduct(new_data);
      case "test":
        return await typeProductJsonService.getTypeProduct(typeProduct_id);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async updateTypeProduct(new_data) {
    switch (mode) {
      case "production":
        return await typeProductApiRestService.updateTypeProduct(new_data);
      case "test":
        return await typeProductJsonService.updateTypeProduct(new_data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async deleteTypeProduct(dataid) {
    switch (mode) {
      case "production":
        return await typeProductApiRestService.deleteTypeProduct(dataid);
      case "test":
        return await typeProductJsonService.deleteTypeProduct(dataid);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async changeStatusTypeProduct(data) {
    switch (mode) {
      case "production":
        return await typeProductApiRestService.changeStatusTypeProduct(data);
      case "test":
        return await typeProductJsonService.changeStatusTypeProduct(data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
};
