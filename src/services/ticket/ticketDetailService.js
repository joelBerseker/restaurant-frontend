import { ticketDetailApiRestService } from "@/services/ticket/ticketDetailApiRestService";
import { ticketDetailJsonService } from "@/services/ticket/ticketDetailJsonService";
const mode = import.meta.env.VITE_APP_MODE;
export const ticketDetailService = {
  async getTicketDetail(ticketdetail_id) {
    switch (mode) {
      case "production":
        return await ticketDetailApiRestService.getTicketDetail(
          ticketdetail_id
        );
      case "test":
        return await ticketDetailJsonService.getTicketDetail(ticketdetail_id);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async getListTicketDetail(filterParams = null) {
    switch (mode) {
      case "production":
        return await ticketDetailApiRestService.getListTicketDetail(
          filterParams
        );
      case "test":
        return await ticketDetailJsonService.getListTicketDetail(filterParams);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async getListProdutMenu(filterParams = null) {
    switch (mode) {
      case "production":
        return await ticketDetailApiRestService.getListProdutMenu(filterParams);
      case "test":
        return await ticketDetailJsonService.getListProdutMenu(filterParams);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async getStatistics(filterParams = null) {
    switch (mode) {
      case "production":
        return await ticketDetailApiRestService.getStatistics(filterParams);
      case "test":
        return await ticketDetailJsonService.getStatistics(filterParams);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },

  async addTicketDetail(new_data, total = 10, final = 10) {
    switch (mode) {
      case "production":
        return await ticketDetailApiRestService.addTicketDetail(
          new_data,
          total,
          final
        );
      case "test":
        return await ticketDetailJsonService.addTicketDetail(
          new_data,
          total,
          final
        );
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async addTicketList(details) {
    switch (mode) {
      case "production":
        return await ticketDetailApiRestService.addTicketList(details);
      case "test":
        return await ticketDetailJsonService.addTicketList(details);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async updateTicketDetail(new_data, total = 10, final = 10) {
    switch (mode) {
      case "production":
        return await ticketDetailApiRestService.updateTicketDetail(
          new_data,
          total,
          final
        );
      case "test":
        return ticketDetailJsonService.updateTicketDetail(
          new_data,
          total,
          final
        );
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async deleteTicketDetail(dataid, total = 0, final = 10) {
    switch (mode) {
      case "production":
        return await ticketDetailApiRestService.deleteTicketDetail(
          dataid,
          total,
          final
        );
      case "test":
        ticketDetailJsonService.deleteTicketDetail(dataid, total, final);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async changeStatusTicketDetail(data) {
    switch (mode) {
      case "production":
        return await ticketDetailApiRestService.changeStatusTicketDetail(data);
      case "test":
        ticketDetailJsonService.changeStatusTicketDetail(data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
};
