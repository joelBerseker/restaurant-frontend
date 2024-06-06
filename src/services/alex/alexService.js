
import axiosInstance from "@/services/axios-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { AlexModel } from "@/models";
import { useToastStore } from "@/stores";

const servicePath = "/alex/alex";
const module = "alex";

export const alexService = {
  async getAlex(alex_id) {
    try {
      const response = await axiosInstance.get(`${servicePath}/${alex_id}/`);

      if (response && response.data) {
        const data = dataTransform.transformApiData(response.data, AlexModel);
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
  async getListAlex(filterParams = null) {
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
      const alex = response.data.map((apiData) =>
        dataTransform.transformApiData(apiData, AlexModel)
      );
      return alex;
    } catch (error) {
      handleError(error, "get_list_error", module);
    }
  },

  async addAlex(new_data) {
    try {
      const response = await axiosInstance.post(
        `${servicePath}/`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(response.data, AlexModel);
      return data_new;
    } catch (error) {
      handleError(error, "add_error", module);
    }
  },
  async updateAlex(new_data) {
    let dataid = new_data.id.value;
    try {
      const response = await axiosInstance.put(
        `${servicePath}/${dataid}/`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(response.data, AlexModel);
      return data_new;
    } catch (error) {
      handleError(error, "edit_error", module);
    }
  },
  async deleteAlex(dataid) {
    try {
      const response = await axiosInstance.delete(`${servicePath}/${dataid}/`);
      return response;
    } catch (error) {
      handleError(error, "delete_error", module);
    }
  },
  async changeStatusAlex(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data);
  },
};