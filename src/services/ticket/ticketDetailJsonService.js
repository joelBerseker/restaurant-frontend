import axiosJsonInstance from "../axios-json-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { MenuModel, ProductModel, TicketDetailModel } from "@/models";
import { useToastStore } from "@/stores";
const servicePath = "/ticket_detail_detail.json";
const servicePathOption = "/ticket_detail_option.json";
const servicePathStatistics = "/ticket_detail_statistics.json";
const module = "Detalle de Boleta";
export const ticketDetailJsonService = {
  async getTicketDetail(ticketdetail_id) {
    try {
      const response = await axiosJsonInstance.get(`${servicePath}`);

      if (response && response.data) {
        // Encuentra el elemento con el id correspondiente
        const ticketdetailData = response.data.find(
          (ticketdetail) => ticketdetail.id === ticketdetail_id
        );

        if (ticketdetailData) {
          console.log("Restaurant Frontend: Entro y encontro");

          // Transforma los datos
          const data = dataTransform.transformApiData(
            ticketdetailData,
            TicketDetailModel
          );
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
  async getListTicketDetail(filterParams = null) {
    try {
      const response = await axiosJsonInstance.get(`${servicePath}`);
      let filterData = await BaseService.applyFilters(
        response.data,
        filterParams
      );
      console.log(filterParams);

      filterData = await BaseService.moreFilter(filterData, filterParams, [
        "product_id",
        "ticket_id",
        "is_menu",
      ]);
      const datas = filterData.map((apiData) =>
        dataTransform.transformApiData(apiData, TicketDetailModel)
      );
      return datas;
    } catch (error) {
      handleError(error, "get_list_error", module);
    }
  },
  async getListProdutMenu(filterParams = null) {
    try {
      const response = await axiosJsonInstance.get(`${servicePathOption}`);
      let filterData = await BaseService.applyFilters(
        response.data,
        filterParams
      );
      filterData = await BaseService.moreFilter(filterData, filterParams, {
        product_id,
        ticket_id,
        is_menu,
      });
      const datas = filterData.map((apiData) =>
        dataTransform.transformApiData(apiData, TicketDetailModel)
      );
      return datas;
    } catch (error) {
      handleError(error, "get_list_error", module);
    }
  },
  async getStatistics(filterParams = null) {
    try {
      const response = await axiosJsonInstance.get(`${servicePathStatistics}`);
      return response.data;
    } catch (error) {
      handleError(error, "get_list_error", module);
    }
  },

  async addTicketDetail(new_data, total = 10, final = 10) {
    try {
      const data_new = new_data;

      return data_new;
    } catch (error) {
      const useToast = useToastStore();
      useToast.show(
        "add_error",
        error.message ? error.message : `Error al agregar ${module}`
      );
      handleError(error, "add_error", module);
    }
  },
  async addTicketList(details) {
    const formattedQV = details.map((q_v) => q_v.addData());
    try {
      const config = {
        method: "POST",
        url: `${servicePath}/`,
        data: JSON.stringify(formattedQV),
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Usa la función con el alias para configurar el encabezado "Content-Type"
      const response = await axiosInstance(config);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateTicketDetail(new_data, total = 10, final = 10) {
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
  async deleteTicketDetail(dataid, total = 0, final = 10) {
    try {
      const useToast = useToastStore();
      useToast.show("delete_success", {
        important_text: module + ` con id: ${dataid} `,
      });
      return response;
    } catch (error) {
      handleError(error, "delete_error", module);
    }
  },
  async changeStatusTicketDetail(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data, module);
  },
};
