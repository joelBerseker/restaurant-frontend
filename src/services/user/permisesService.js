import axiosInstance from "@/services/axios-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { PermisesModel } from "@/models";
import { useToastStore } from "@/stores";

const servicePath = "/user/permissions";
const module = "permisos";

export const permisesService = {
  async getPermises(permises_id) {
    try {
      const response = await axiosInstance.get(
        `${servicePath}/${permises_id}/`
      );

      if (response && response.data) {
        const data = dataTransform.transformApiData(
          response.data,
          PermisesModel
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
  async getListPermises(filterParams = null) {
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
        role_id,
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
        role_id,
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
      const permises = response.data;
      return permises;
    } catch (error) {
      handleError(error, "get_list_error", module);
    }
  },
  async editPermission(permissions) {
    if (permissions == null || permissions.length == 0) {
      throw new Error(`No se envio los permisos para editar correctamente`);
    }
    try {
      const config = {
        method: "PATCH",
        url: `user/bulk-permissions/`,
        data: permissions,
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Usa la función con el alias para configurar el encabezado "Content-Type"
      const response = await axiosInstance(config);
      const useToast = useToastStore();
      useToast.show("edit_success", {
        important_text: module,
      });
      return response.data;
    } catch (error) {
      handleError(error, "edit_error", module);
    }
  },
  async addPermises(new_data) {
    try {
      const response = await axiosInstance.post(
        `${servicePath}/`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(
        response.data,
        PermisesModel
      );
      return data_new;
    } catch (error) {
      handleError(error, "add_error", module);
    }
  },
  async updatePermises(new_data) {
    let dataid = new_data.id.value;
    try {
      const response = await axiosInstance.put(
        `${servicePath}/${dataid}/`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(
        response.data,
        PermisesModel
      );
      return data_new;
    } catch (error) {
      handleError(error, "edit_error", module);
    }
  },
  async deletePermises(dataid) {
    try {
      const response = await axiosInstance.delete(`${servicePath}/${dataid}/`);
      const useToast = useToastStore();
      useToast.show("delete_success", {
        important_text: `${module} `,
      });
      return response;
    } catch (error) {
      handleError(error, "delete_error", module);
    }
  },
  async changeStatusPermises(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data);
  },
};
