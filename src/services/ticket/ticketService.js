import axiosInstance from "@/services/axios-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { TicketModel } from "@/models";
import { useToastStore } from "@/stores";
const servicePath = "/ticket/ticket";
export const ticketService = {
  async getTicket(ticket_id) {
    try {
      const response = await axiosInstance.get(`${servicePath}/${ticket_id}/`);

      if (response && response.data) {
        const data = dataTransform.transformApiData(response.data, TicketModel);
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
        error.message ? error.message : "Error al obtener user"
      );
      handleError(error);
    }
  },
  async getListTicket(filterParams = null) {
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
      user_id,
      table_id,
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
      user_id,
      table_id,
    };

    let filteredFilters = Object.entries(filters)
      .filter(
        ([key, value]) => value !== undefined && value !== null && value !== ""
      )
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    if (search && searchBy) {
      const searchByParam = `searchBy=${searchBy.join(",")}`;
      filteredFilters += searchByParam ? `&${searchByParam}` : "";
    }

    try {
      const response = await axiosInstance.get(
        `${servicePath}/?${filteredFilters}`
      );
      const quotes = response.data.map((apiData) =>
        dataTransform.transformApiData(apiData, TicketModel)
      );
      return quotes;
    } catch (error) {
      const useToast = useToastStore();
      useToast.show(
        "get_list_error",
        error.message ? error.message : "Error al obtener los usuarios"
      );
      handleError(error);
    }
  },

  async addTicket(new_data) {
    try {
      const response = await axiosInstance.post(
        `${servicePath}/`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(
        response.data,
        TicketModel
      );
      return data_new;
    } catch (error) {
      const useToast = useToastStore();
      useToast.show(
        "add_error",
        error.message ? error.message : "Error al añadir los usuarios"
      );
      handleError(error);
    }
  },
  async updateTicket(new_data) {
    let dataid = new_data.id.value;
    try {
      const response = await axiosInstance.put(
        `${servicePath}/${dataid}/`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(
        response.data,
        TicketModel
      );
      return data_new;
    } catch (error) {
      const useToast = useToastStore();
      useToast.show(
        "edit_error",
        error.message ? error.message : "Error al editar los usuarios"
      );
      handleError(error);
    }
  },
  async deleteTicket(dataid) {
    try {
      const response = await axiosInstance.delete(`${servicePath}/${dataid}/`);
      return response;
    } catch (error) {
      handleError(error);
    }
  },
  async changeStatusTicket(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data);
  },
};
