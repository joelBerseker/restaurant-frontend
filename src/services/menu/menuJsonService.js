import axiosJsonInstance from "@/services/axios-json-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { MenuModel } from "@/models";
import { useToastStore } from "@/stores";
const servicePath = "/menu.json";
const module = "Menu";
export const menuJsonService = {
  async getMenu(menu_id) {
    try {
      const response = await axiosJsonInstance.get(`${servicePath}`);

      if (response && response.data) {
        // Encuentra el elemento con el id correspondiente
        const menuData = response.data.find((menu) => menu.id == menu_id);

        if (menuData) {
          console.log("Restaurant Frontend: Entro y encontro");

          // Transforma los datos
          const data = dataTransform.transformApiData(menuData, MenuModel);
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
  async getListMenu(filterParams = null) {
    try {
      const response = await axiosJsonInstance.get(`${servicePath}`);
      const filterData = await BaseService.applyFilters(
        response.data,
        filterParams
      );
      const datas = filterData.map((apiData) =>
        dataTransform.transformApiData(apiData, MenuModel)
      );
      return datas;
    } catch (error) {
      handleError(error, "get_list_error", module);
    }
  },

  async addMenu(new_data) {
    try {
      const response = await axiosJsonInstance.post(
        `${servicePath}/`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(response.data, MenuModel);
      const useToast = useToastStore();
      useToast.show("add_success", {
        important_text: data_new.getTextModel(),
      });
      return data_new;
    } catch (error) {
      handleError(error, "add_error", module);
    }
  },
  async updateMenu(new_data) {
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
  async deleteMenu(dataid) {
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
  async changeStatusMenu(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data, module);
  },
};
