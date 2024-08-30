import { reservationApiRestService } from "@/services/reservation/reservationApiRestService";
import { reservationJsonService } from "@/services/reservation/reservationJsonService";
const mode = import.meta.env.VITE_APP_MODE;

export const reservationService = {
  async getReservation(reservation_id) {
    switch (mode) {
      case "production":
        return await reservationApiRestService.getReservation(reservation_id);
      case "test":
        return await reservationJsonService.getReservation(reservation_id);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async getListReservation(filterParams = null) {
    switch (mode) {
      case "production":
        return await reservationApiRestService.getListReservation(filterParams);
      case "test":
        return await reservationJsonService.getListReservation(filterParams);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },

  async addReservation(new_data) {
    switch (mode) {
      case "production":
        return await reservationApiRestService.addReservation(new_data);
      case "test":
        return await reservationJsonService.getReservation(reservation_id);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async updateReservation(new_data) {
    switch (mode) {
      case "production":
        return await reservationApiRestService.updateReservation(new_data);
      case "test":
        return await reservationJsonService.updateReservation(new_data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async deleteReservation(dataid) {
    switch (mode) {
      case "production":
        return await reservationApiRestService.deleteReservation(dataid);
      case "test":
        return await reservationJsonService.deleteReservation(dataid);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async changeStatusReservation(data) {
    switch (mode) {
      case "production":
        return await reservationApiRestService.changeStatusReservation(data);
      case "test":
        return await reservationJsonService.changeStatusReservation(data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
};
