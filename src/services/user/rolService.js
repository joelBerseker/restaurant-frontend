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
      useToast.show(
        "get_element_error",
        error.message ? error.message : "Error al obtener el Rol"
      );
      handleError(error);
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
      useToast.show(
        "get_list_error",
        error.message ? error.message : "Error al obtener los roles"
      );
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
      useToast.show(
        "add_error",
        error.message ? error.message : "Error al añadir el Rol"
      );
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
      useToast.show(
        "edit_error",
        error.message ? error.message : "Error al editar el Rol"
      );
      handleError(error);
    }
  },
  async deleteRol(dataid) {
    try {
      const response = await axiosInstance.delete(`${servicePath}/${dataid}/`);
      return response;
    } catch (error) {
      useToast.show(
        "delete_error",
        error.message ? error.message : "Error al eliminar el Rol"
      );
      handleError(error);
    }
  },
  async changeStatusRol(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data);
  },
};