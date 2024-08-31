import axiosJsonInstance from "@/services/axios-json-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { TableModel } from "@/models";
import { useToastStore } from "@/stores";
const servicePath = "/table.json";
const module = "Mesa";
export const tableJsonService = {
  async getTable(table_id) {
    try {
      const response = await axiosJsonInstance.get(`${servicePath}`);

      if (response && response.data) {
        // Encuentra el elemento con el id correspondiente
        const tableData = response.data.find((table) => table.id == table_id);

        if (tableData) {
          console.log("Restaurant Frontend: Entro y encontro");

          // Transforma los datos
          const data = dataTransform.transformApiData(tableData, TableModel);
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
  async getListTable(filterParams = null) {
    try {
      const response = await axiosJsonInstance.get(`${servicePath}`);
      const filterData = await BaseService.applyFilters(
        response.data,
        filterParams
      );
      const datas = filterData.map((apiData) =>
        dataTransform.transformApiData(apiData, TableModel)
      );
      return datas;
    } catch (error) {
      handleError(error, "get_list_error", module);
    }
  },

  async addTable(new_data) {
    try {
      const response = await axiosJsonInstance.post(
        `${servicePath}/`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(
        response.data,
        TableModel
      );
      const useToast = useToastStore();
      useToast.show("add_success", {
        important_text: data_new.getTextModel(),
      });
      return data_new;
    } catch (error) {
      handleError(error, "add_error", module);
    }
  },
  async updateTable(new_data) {
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
  async deleteTable(dataid) {
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
  async changeStatusTable(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data, module);
  },
};
