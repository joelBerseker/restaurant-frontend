import { tableApiRestService } from "@/services/table/tableApiRestService";
import { tableJsonService } from "@/services/table/tableJsonService";
const mode = import.meta.env.VITE_APP_MODE;

export const tableService = {
  async getTable(table_id) {
    switch (mode) {
      case "production":
        return await tableApiRestService.getTable(table_id);
      case "test":
        return await tableJsonService.getTable(table_id);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async getListTable(filterParams = null) {
    switch (mode) {
      case "production":
        return await tableApiRestService.getListTable(filterParams);
      case "test":
        return await tableJsonService.getListTable(filterParams);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },

  async addTable(new_data) {
    switch (mode) {
      case "production":
        return await tableApiRestService.addTable(new_data);
      case "test":
        return await tableJsonService.getTable(table_id);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async updateTable(new_data) {
    switch (mode) {
      case "production":
        return await tableApiRestService.updateTable(new_data);
      case "test":
        return await tableJsonService.updateTable(new_data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async deleteTable(dataid) {
    switch (mode) {
      case "production":
        return await tableApiRestService.deleteTable(dataid);
      case "test":
        return await tableJsonService.deleteTable(dataid);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async changeStatusTable(data) {
    switch (mode) {
      case "production":
        return await tableApiRestService.changeStatusTable(data);
      case "test":
        return await tableJsonService.changeStatusTable(data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
};
