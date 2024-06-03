import axiosInstance from "@/services/axios-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { TicketDetailModel } from "@/models";

const servicePath = "/ticket/ticketdetail";
export const ticketDetailService = {
  async getTicketDetail(ticketdetail_id) {
    try {
      const response = await axiosInstance.get(
        `${servicePath}/${ticketdetail_id}/`
      );

      if (response && response.data) {
        const data = dataTransform.transformApiData(
          response.data,
          TicketDetailModel
        );
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
  async getListTicketDetail(filterParams = null) {
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
      product_id,
      ticket_id,
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
      product_id,
      ticket_id,
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
        dataTransform.transformApiData(apiData, TicketDetailModel)
      );
      return quotes;
    } catch (error) {
      handleError(error);
    }
  },

  async addTicketDetail(new_data) {
    try {
      const response = await axiosInstance.post(
        `${servicePath}/`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(
        response.data,
        TicketDetailModel
      );
      return data_new;
    } catch (error) {
      handleError(error);
    }
  },
  async updateTicketDetail(new_data) {
    let dataid = new_data.id.value;
    try {
      const response = await axiosInstance.put(
        `${servicePath}/${dataid}/`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(
        response.data,
        TicketDetailModel
      );
      return data_new;
    } catch (error) {
      handleError(error);
    }
  },
  async deleteTicketDetail(dataid) {
    try {
      const response = await axiosInstance.delete(`${servicePath}/${dataid}/`);
      return response;
    } catch (error) {
      handleError(error);
    }
  },
  async changeStatusTicketDetail(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data);
  },
};