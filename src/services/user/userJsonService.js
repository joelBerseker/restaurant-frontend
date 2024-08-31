import axiosJsonInstance from "@/services/axios-json-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { UserModel } from "@/models";
import { useToastStore, useUserStore } from "@/stores";
import { authService } from "@/services";
const servicePath = "/user.json";
const servicePass = "/user/change-password";

const module = "Usuario";
export const userJsonService = {
  async getUser(user_id) {
    try {
      const response = await axiosJsonInstance.get(`${servicePath}`);

      if (response && response.data) {
        // Encuentra el elemento con el id correspondiente
        const userData = response.data.find((user) => user.id === user_id);

        if (userData) {
          console.log("Restaurant Frontend: Entro y encontro");

          // Transforma los datos
          const data = dataTransform.transformApiData(userData, UserModel);
          return data;
        } else {
          throw new Error(`El/La ${module} solicitada no existe en los datos`);
        }
      } else {
        throw new Error(
          "La respuesta del JSON no contiene los datos esperados"
        );
      }
    } catch (error) {
      handleError(error, "get_element_error", module);
    }
  },
  async getListUser(filterParams = null) {
    try {
      const response = await axiosJsonInstance.get(`${servicePath}`);

      const filterData = await BaseService.applyFilters(
        response.data,
        filterParams
      );
      const datas = filterData.map((apiData) =>
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
      const response = await axiosJsonInstance(config);
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
      const data_new = new_data;
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
      const response = await axiosJsonInstance.patch(`${url}/`, credential);
      const useToast = useToastStore();
      useToast.show("password_success");
      return response;
    } catch (error) {
      handleError(error, "password_error");
    }
  },
  async deleteUser(dataid) {
    try {
      const useToast = useToastStore();
      useToast.show("delete_success", {
        important_text: module + ` con id: ${dataid} `,
      });
      return "eliminado";
    } catch (error) {
      handleError(error, "delete_error", module);
    }
  },
  async changeStatusUser(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data, module);
  },
  async userVerify(credentials) {
    try {
      const response = await axiosJsonInstance.get(`${servicePath}`);

      if (response && response.data) {
        // Encuentra el elemento con el id correspondiente
        const userData = response.data.find(
          (user) =>
            user.email == credentials.email &&
            user.password == credentials.password
        );

        if (userData) {
          console.log("Restaurant Frontend: Entro y encontro");

          // Transforma los datos

          return {
            access: "asdasdas",
            refresh: "paraxd",
            user_id: userData.id,
          };
        } else {
          throw new Error(`El/La ${module} solicitada no existe en los datos`);
        }
      } else {
        throw new Error(
          "La respuesta del JSON no contiene los datos esperados"
        );
      }
    } catch (error) {
      handleError(error, "get_element_error", module);
    }
  },
};
