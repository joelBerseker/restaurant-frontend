import axiosInstance from "@/services/axios-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { UserModel } from "@/models";
import { useToastStore } from "@/stores";

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
      handleError(error);
      throw error; // Asegurarse de lanzar el error para manejarlo adecuadamente en el contexto superior
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
      const useToast = useToastStore();
      useToast.show("add_error");
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
      handleError(error);
    }
  },
  async deleteUser(dataid) {
    try {
      const response = await axiosInstance.delete(`${servicePath}/${dataid}/`);
      return response;
    } catch (error) {
      handleError(error);
    }
  },
  async changeStatusUser(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data);
  },
};
