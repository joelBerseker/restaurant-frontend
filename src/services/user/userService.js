import axiosInstance from "@/services/axios-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { UserModel } from "@/models";
import { useToastStore } from "@/stores";
const useToast = useToastStore();
const servicePath = "/user/users";
export const userService = {
  async getUser(user_id) {
    try {
      const response = await axiosInstance.get(`${servicePath}/${user_id}/`);

      if (response && response.data) {
        const data = dataTransform.transformApiData(response.data, UserModel);
        return data;
      } else {
        throw new Error(
          "La respuesta de la API no contiene los datos esperados"
        );
      }
    } catch (error) {
      useToast.show(
        "get_element_error",
        error.message ? error.message : "Error al obtener user"
      ); //
      handleError(error);
      throw new Error(`Ocurrió un error al obtener el elemento ${serviceName}`);
    }
  },
  async getListUser(filterParams = null) {
    let filteredFilters = "";

    if (filterParams) {
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
        id_role,
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
        id_role,
      };

      filteredFilters = Object.entries(filters)
        .filter(
          ([key, value]) =>
            value !== undefined && value !== null && value !== ""
        )
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      if (search && searchBy) {
        const searchByParam = `searchBy=${searchBy.join(",")}`;
        filteredFilters += searchByParam ? `&${searchByParam}` : "";
      }
    }

    try {
      const response = await axiosInstance.get(
        `${servicePath}/?${filteredFilters}`
      );
      const quotes = response.data.map((apiData) =>
        dataTransform.transformApiData(apiData, UserModel)
      );
      return quotes;
    } catch (error) {
      useToast.show(
        "get_list_error",
        error.message ? error.message : "Error al obtener los usuarios"
      );
      handleError(error);
      //throw error; // Asegurarse de lanzar el error para manejarlo adecuadamente en el contexto superior
    }
  },

  async addUser(new_data) {
    try {
      const response = await axiosInstance.post(
        `${servicePath}/`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(response.data, UserModel);
      return data_new;
    } catch (error) {
      useToast.show(
        "add_error",
        error.message ? error.message : "Error al añadir los usuarios"
      );
      handleError(error);
    }
  },
  async updateUser(new_data) {
    let dataid = new_data.id.value;
    try {
      const response = await axiosInstance.put(
        `${servicePath}/${dataid}/`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(response.data, UserModel);
      return data_new;
    } catch (error) {
      useToast.show(
        "edit_error",
        error.message ? error.message : "Error al editar los usuarios"
      );
      handleError(error);
    }
  },
  async deleteUser(dataid) {
    try {
      const response = await axiosInstance.delete(`${servicePath}/${dataid}/`);
      return response;
    } catch (error) {
      useToast.show(
        "delete_error",
        error.message ? error.message : "Error al eliminar los usuarios"
      );
      handleError(error);
    }
  },
  async changeStatusUser(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data);
  },
};
