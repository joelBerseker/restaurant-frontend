import axiosJsonInstance from "../axios-json-instance";
import { handleError } from "@/helpers";
import { dataTransform, ticketDetailService } from "@/services";
import { BaseService } from "@/services/BaseService";
import { TicketModel } from "@/models";
import { useToastStore } from "@/stores";

const servicePath = "/ticket.json";
const module = "Boleta de Pago";
export const ticketJsonService = {
  async getTicket(ticket_id) {
    try {
      const response = await axiosJsonInstance.get(`${servicePath}`);

      if (response && response.data) {
        // Encuentra el elemento con el id correspondiente
        const ticketData = response.data.find(
          (ticket) => ticket.id == ticket_id
        );

        if (ticketData) {
          console.log("Restaurant Frontend: Entro y encontro");

          // Transforma los datos
          const data = dataTransform.transformApiData(ticketData, TicketModel);
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
  async getListTicket(filterParams = null) {
    try {
      const response = await axiosJsonInstance.get(`${servicePath}`);
      let filterData = await BaseService.applyFilters(
        response.data,
        filterParams
      );
      filterData = await BaseService.moreFilter(filterData, filterParams, [
        "user_id",
        "table_id",
      ]);
      const datas = filterData.map((apiData) =>
        dataTransform.transformApiData(apiData, TicketModel)
      );
      return datas;
    } catch (error) {
      handleError(error, "get_list_error", module);
    }
  },

  async addTicket(new_data, detail = null) {
    try {
      const data_new = new_data;
      if (detail) {
        detail.forEach((element) => {
          element.initModel(data_new.id.value);
        });
        ticketDetailService.addTicketList(detail);
      }

      const useToast = useToastStore();
      useToast.show("add_success", {
        important_text: data_new.getTextModel(),
      });
      return data_new;
    } catch (error) {
      handleError(error, "add_error", module);
    }
  },
  async updateTicket(new_data) {
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
  async deleteTicket(dataid) {
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
  async changeStatusTicket(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data);
  },
};
