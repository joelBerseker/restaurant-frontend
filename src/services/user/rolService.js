import axiosInstance from "@/services/axios-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { RolModel } from "@/models";
import { useToastStore } from "@/stores";
import { formatearErrores } from "@/helpers/utilities";

const servicePath = "/user/roles";
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
      const useToast = useToastStore();
      useToast.show(
        "get_element_error",
        error.message ? error.message : "Error al obtener el Rol"
      );
      handleError(error);
    }
  },
  async getListRol(filterParams = null) {
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
      const quotes = response.data.map((apiData) =>
        dataTransform.transformApiData(apiData, RolModel)
      );
      return quotes;
    } catch (error) {
      const useToast = useToastStore();
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
      const useToast = useToastStore();
      useToast.show("add_success", "Rol agregado.");
      return data_new;
    } catch (error) {
      if (error.response.status == 400) {
        const value = error.response.data;
        const useToast = useToastStore();
        const mensaje = formatearErrores(value);
        useToast.show("add_error", mensaje);
      } else {
        console.log(error.response.data);
        const useToast = useToastStore();
        useToast.show(
          "add_error",
          error.message ? error.message : "Error al agregar el Rol"
        );
      }
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
      const useToast = useToastStore();
      useToast.show("edit_success", "Rol editado.");
      return data_new;
    } catch (error) {
      const useToast = useToastStore();
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
      const useToast = useToastStore();
      useToast.show("delete_success", "Rol editado.");
      return response;
    } catch (error) {
      const useToast = useToastStore();
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
