import axiosInstance from "@/services/axios-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { UserModel } from "@/models";
import { useToastStore, useUserStore } from "@/stores";
import { authService } from "@/services";
const servicePath = "/user/users";
const servicePass = "/user/change-password";

const module = "Usuario";
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
      handleError(error, "get_element_error", module);
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
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
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
      const datas = response.data.map((apiData) =>
        dataTransform.transformApiData(apiData, UserModel)
      );
      return datas;
    } catch (error) {
      handleError(error, "get_list_error", module);
    }
  },

  async addUser(new_data) {
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
      const data_new = dataTransform.transformApiData(response.data, UserModel);
      const useToast = useToastStore();
      useToast.show("add_success", {
        important_text: data_new.getTextModel(),
      });
      return data_new;
    } catch (error) {
      handleError(error, "add_error", module);
    }
  },
  async updateUser(new_data) {
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
      const data_new = await dataTransform.transformApiData(
        response.data,
        UserModel
      );
      const userStore = useUserStore();
      if (data_new.id.value == userStore.getId) {
        authService.setUser();
      }
      const useToast = useToastStore();
      useToast.show("edit_success", {
        important_text: data_new.getTextModel(),
      });
      return data_new;
    } catch (error) {
      handleError(error, "edit_error", module);
    }
  },
  async changePassword(user = null, credential) {
    try {
      let url = `${servicePass}`;
      if (user !== null) {
        url = `${url}/${user}`;
      }
      const response = await axiosInstance.patch(`${url}/`, credential);
      const useToast = useToastStore();
      useToast.show("password_success");
      return response;
    } catch (error) {
      handleError(error, "password_error");
    }
  },
  async deleteUser(dataid) {
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
  async changeStatusUser(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data, module);
  },
};
