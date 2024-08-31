import { ticketApiRestService } from "@/services/ticket/ticketApiRestService";
import { ticketJsonService } from "@/services/ticket/ticketJsonService";
const mode = import.meta.env.VITE_APP_MODE;

export const ticketService = {
  async getTicket(ticket_id) {
    switch (mode) {
      case "production":
        return await ticketApiRestService.getTicket(ticket_id);
      case "test":
        return await ticketJsonService.getTicket(ticket_id);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async getListTicket(filterParams = null) {
    switch (mode) {
      case "production":
        return await ticketApiRestService.getListTicket(filterParams);
      case "test":
        return await ticketJsonService.getListTicket(filterParams);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },

  async addTicket(new_data) {
    switch (mode) {
      case "production":
        return await ticketApiRestService.addTicket(new_data);
      case "test":
        return await ticketJsonService.getTicket(ticket_id);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async updateTicket(new_data) {
    switch (mode) {
      case "production":
        return await ticketApiRestService.updateTicket(new_data);
      case "test":
        return await ticketJsonService.updateTicket(new_data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async deleteTicket(dataid) {
    switch (mode) {
      case "production":
        return await ticketApiRestService.deleteTicket(dataid);
      case "test":
        return await ticketJsonService.deleteTicket(dataid);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async changeStatusTicket(data) {
    switch (mode) {
      case "production":
        return await ticketApiRestService.changeStatusTicket(data);
      case "test":
        return await ticketJsonService.changeStatusTicket(data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
};
