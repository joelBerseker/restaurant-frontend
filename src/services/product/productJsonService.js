import axiosJsonInstance from "@/services/axios-json-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { ProductModel } from "@/models";
import { useToastStore } from "@/stores";
const servicePath = "/product.json";
const module = "Producto";
export const productJsonService = {
  async getProduct(product_id) {
    try {
      const response = await axiosJsonInstance.get(`${servicePath}`);

      if (response && response.data) {
        // Encuentra el elemento con el id correspondiente
        const productData = response.data.find(
          (product) => product.id === product_id
        );

        if (productData) {
          console.log("Restaurant Frontend: Entro y encontro");

          // Transforma los datos
          const data = dataTransform.transformApiData(
            productData,
            ProductModel
          );
          return data;
        } else {
          throw new Error(`El/La ${module} solicitada no existe en los datos`);
        }
      } else {
        throw new Error(
          "La respuesta del JSON no contiene los datos esperados"
        );
      }
    } catch (error) {
      handleError(error, "get_element_error", module);
    }
  },
  async getListProduct(filterParams = null) {
    try {
      const response = await axiosJsonInstance.get(`${servicePath}`);
      const filterData = await BaseService.applyFilters(
        response.data,
        filterParams
      );
      const datas = filterData.map((apiData) =>
        dataTransform.transformApiData(apiData, ProductModel)
      );
      return datas;
    } catch (error) {
      handleError(error, "get_list_error", module);
    }
  },

  async addProduct(new_data) {
    try {
      const response = await axiosJsonInstance.post(
        `${servicePath}/`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(
        response.data,
        ProductModel
      );
      const useToast = useToastStore();
      useToast.show("add_success", {
        important_text: data_new.getTextModel(),
      });
      return data_new;
    } catch (error) {
      handleError(error, "add_error", module);
    }
  },
  async updateProduct(new_data) {
    try {
      const data_new = new_data;
      const useToast = useToastStore();
      useToast.show("edit_success", {
        important_text: data_new.getTextModel(),
      });
      return data_new;
    } catch (error) {
      handleError(error, "edit_error", module);
    }
  },
  async deleteProduct(dataid) {
    try {
      const useToast = useToastStore();
      useToast.show("delete_success", {
        important_text: module + ` con id: ${dataid} `,
      });
      return "eliminado";
    } catch (error) {
      handleError(error, "delete_error", module);
    }
  },
  async changeStatusProduct(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data, module);
  },
};
