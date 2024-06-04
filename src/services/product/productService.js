import axiosInstance from "@/services/axios-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { ProductModel } from "@/models";
import { useToastStore } from "@/stores";
const servicePath = "/product/product";
export const productService = {
  async getProduct(product_id) {
    try {
      const response = await axiosInstance.get(`${servicePath}/${product_id}/`);

      if (response && response.data) {
        const data = dataTransform.transformApiData(
          response.data,
          ProductModel
        );
        return data;
      } else {
        throw new Error(
          "La respuesta de la API no contiene los datos esperados"
        );
      }
    } catch (error) {
      const useToast = useToastStore();
      useToast.show(
        "get_element_error",
        error.message ? error.message : "Error al obtener user"
      );
      handleError(error);
    }
  },
  async getListProduct(filterParams = null) {
    let filteredFilters = "";
    if (filterParams != null) {
      const {
        search,
        searchBy,
        status,
        order,
        orderBy,
        specific_date,
        end_date,
        start_date,
        interval,
        year_date,
        searches,
        // Otros parámetros de filtro que puedas necesitar
        id_typeproduct,
      } = filterParams;

      const filters = {
        orderBy,
        order,
        status,
        search,
        end_date,
        start_date,
        interval,
        specific_date,
        year_date,
        // Otros parámetros de filtro que puedas necesitar
        id_typeproduct,
      };

      filteredFilters = Object.entries(filters)
        .filter(
          ([key, value]) =>
            value !== undefined && value !== null && value !== ""
        )
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      if (search && searchBy) {
        const searchByParam = `searchBy=${searchBy.join(",")}`;
        filteredFilters += searchByParam ? `&${searchByParam}` : "";
      }
      if (searches && searches != undefined) {
        console.log("entre a searches");
        searches.forEach((search, index) => {
          if (search.value && search.by) {
            filteredFilters += `&search${index + 1}=${encodeURIComponent(
              search.value
            )}&searchBy${index + 1}=${encodeURIComponent(search.by)}`;
          }
        });
      }
    }

    try {
      const response = await axiosInstance.get(
        `${servicePath}/?${filteredFilters}`
      );
      const quotes = response.data.map((apiData) =>
        dataTransform.transformApiData(apiData, ProductModel)
      );
      return quotes;
    } catch (error) {
      const useToast = useToastStore();
      useToast.show(
        "get_list_error",
        error.message ? error.message : "Error al obtener los usuarios"
      );
      handleError(error);
    }
  },

  async addProduct(new_data) {
    try {
      const response = await axiosInstance.post(
        `${servicePath}/`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(
        response.data,
        ProductModel
      );
      return data_new;
    } catch (error) {
      const useToast = useToastStore();
      useToast.show(
        "add_error",
        error.message ? error.message : "Error al añadir los usuarios"
      );
      handleError(error);
    }
  },
  async updateProduct(new_data) {
    let dataid = new_data.id.value;
    try {
      const response = await axiosInstance.put(
        `${servicePath}/${dataid}/`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(
        response.data,
        ProductModel
      );
      return data_new;
    } catch (error) {
      const useToast = useToastStore();
      useToast.show(
        "edit_error",
        error.message ? error.message : "Error al editar los usuarios"
      );
      handleError(error);
    }
  },
  async deleteProduct(dataid) {
    try {
      const response = await axiosInstance.delete(`${servicePath}/${dataid}/`);
      return response;
    } catch (error) {
      handleError(error);
    }
  },
  async changeStatusProduct(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data);
  },
};
