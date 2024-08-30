import { menuApiRestService } from "@/services/menu/menuApiRestService";
import { menuJsonService } from "@/services/menu/menuJsonService";
const mode = "production";

export const menuService = {
  async getMenu(menu_id) {
    switch (mode) {
      case "production":
        return await menuApiRestService.getMenu(menu_id);
      case "test":
        return await menuJsonService.getMenu(menu_id);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async getListMenu(filterParams = null) {
    switch (mode) {
      case "production":
        return await menuApiRestService.getListMenu((filterParams = null));
      case "test":
        return await menuJsonService.getListMenu((filterParams = null));
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },

  async addMenu(new_data) {
    switch (mode) {
      case "production":
        return await menuApiRestService.addMenu(new_data);
      case "test":
        return await menuJsonService.getMenu(menu_id);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async updateMenu(new_data) {
    switch (mode) {
      case "production":
        return await menuApiRestService.updateMenu(new_data);
      case "test":
        return await menuJsonService.updateMenu(new_data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async deleteMenu(dataid) {
    switch (mode) {
      case "production":
        return await menuApiRestService.deleteMenu(dataid);
      case "test":
        return await menuJsonService.deleteMenu(dataid);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async changeStatusMenu(data) {
    switch (mode) {
      case "production":
        return await menuApiRestService.changeStatusMenu(data);
      case "test":
        return await menuJsonService.changeStatusMenu(data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
};
