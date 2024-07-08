import axiosInstance from "@/services/axios-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { TypeProductModel } from "@/models";
import { useToastStore } from "@/stores";
const servicePath = "/product_type";
const serviceCart = "/product_type/plate_list";
const module = "Tipo de Producto";
export const typeProductService = {
  async getTypeProduct(typeproduct_id) {
    try {
      const response = await axiosInstance.get(
        `${servicePath}/${typeproduct_id}/`
      );

      if (response && response.data) {
        const data = dataTransform.transformApiData(
          response.data,
          TypeProductModel
        );
        return data;
      } else {
        throw new Error(
          "La respuesta de la API no contiene los datos esperados"
        );
      }
    } catch (error) {
      handleError(error, "get_element_error", module);
    }
  },
  async getListTypeProduct(filterParams = null) {
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
      const datas = response.data.map((apiData) =>
        dataTransform.transformApiData(apiData, TypeProductModel)
      );
      return datas;
    } catch (error) {
      handleError(error, "get_list_error", module);
    }
  },

  async getCart() {
    try {
      const response = await axiosInstance.get(`${serviceCart}/`);
      const datas = response.data;
      console.log(datas);
      return datas;
    } catch (error) {
      handleError(error, "get_list_error", module);
    }
  },

  async addTypeProduct(new_data) {
    try {
      const config = {
        method: "POST",
        url: `${servicePath}/`,
        data: new_data.addData(),
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axiosInstance(config);
      const data_new = dataTransform.transformApiData(
        response.data,
        TypeProductModel
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
  async updateTypeProduct(new_data) {
    try {
      const config = {
        method: "PATCH",
        url: `${servicePath}/${new_data.id.value}/`,
        data: new_data.addData(),
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axiosInstance(config);
      const data_new = dataTransform.transformApiData(
        response.data,
        TypeProductModel
      );
      const useToast = useToastStore();
      useToast.show("edit_success", {
        important_text: data_new.getTextModel(),
      });
      return data_new;
    } catch (error) {
      handleError(error, "edit_error", module);
    }
  },
  async deleteTypeProduct(dataid) {
    try {
      const response = await axiosInstance.delete(`${servicePath}/${dataid}/`);
      const useToast = useToastStore();
      useToast.show("delete_success", {
        important_text: module,
      });
      return response;
    } catch (error) {
      handleError(error, "delete_error", module);
    }
  },
  async changeStatusTypeProduct(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data, "module");
  },
};
