import { productApiRestService } from "@/services/product/productApiRestService";
import { productJsonService } from "@/services/product/productJsonService";
const mode = import.meta.env.VITE_APP_MODE;

export const productService = {
  async getProduct(product_id) {
    switch (mode) {
      case "production":
        return await productApiRestService.getProduct(product_id);
      case "test":
        return await productJsonService.getProduct(product_id);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async getListProduct(filterParams = null) {
    switch (mode) {
      case "production":
        return await productApiRestService.getListProduct(filterParams);
      case "test":
        return await productJsonService.getListProduct(filterParams);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },

  async addProduct(new_data) {
    switch (mode) {
      case "production":
        return await productApiRestService.addProduct(new_data);
      case "test":
        return await productJsonService.getProduct(product_id);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async updateProduct(new_data) {
    switch (mode) {
      case "production":
        return await productApiRestService.updateProduct(new_data);
      case "test":
        return await productJsonService.updateProduct(new_data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async deleteProduct(dataid) {
    switch (mode) {
      case "production":
        return await productApiRestService.deleteProduct(dataid);
      case "test":
        return await productJsonService.deleteProduct(dataid);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async changeStatusProduct(data) {
    switch (mode) {
      case "production":
        return await productApiRestService.changeStatusProduct(data);
      case "test":
        return await productJsonService.changeStatusProduct(data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
};
