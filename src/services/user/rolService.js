import axiosInstance from "@/services/axios-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { RolModel } from "@/models";

const servicePath = "/user/rol";
export const rolService = {
  async getRol(rol_id) {
    try {
      const response = await axiosInstance.get(`${servicePath}/${rol_id}/`);

      if (response && response.data) {
        const data = dataTransform.transformApiData(response.data, RolModel);
        return data;
      } else {
        throw new Error(
          "La respuesta de la API no contiene los datos esperados"
        );
      }
    } catch (error) {
      handleError(error);
      throw new Error(`Ocurrió un error al obtener el elemento ${serviceName}`);
    }
  },
  async getListRol(filterParams = null) {
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
      table_number,
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
      searches,
      // Otros parámetros de filtro que puedas necesitar
    };

    let filteredFilters = Object.entries(filters)
      .filter(
        ([key, value]) => value !== undefined && value !== null && value !== ""
      )
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    if (search && searchBy) {
      const searchByParam = `searchBy=${searchBy.join(",")}`;
      filteredFilters += searchByParam ? `&${searchByParam}` : "";
    }

    try {
      const response = await axiosInstance.get(
        `${servicePath}/?${filteredFilters}`
      );
      const quotes = response.data.map((apiData) =>
        dataTransform.transformApiData(apiData, RolModel)
      );
      return quotes;
    } catch (error) {
      handleError(error);
    }
  },

  async addRol(new_data) {
    try {
      const response = await axiosInstance.post(
        `${servicePath}/`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(response.data, RolModel);
      return data_new;
    } catch (error) {
      handleError(error);
    }
  },
  async updateRol(new_data) {
    let dataid = new_data.id.value;
    try {
      const response = await axiosInstance.put(
        `${servicePath}/${dataid}/`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(response.data, RolModel);
      return data_new;
    } catch (error) {
      handleError(error);
    }
  },
  async deleteRol(dataid) {
    try {
      const response = await axiosInstance.delete(`${servicePath}/${dataid}/`);
      return response;
    } catch (error) {
      handleError(error);
    }
  },
  async changeStatusRol(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data);
  },
};
