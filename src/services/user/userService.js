import { userApiRestService } from "@/services/user/userApiRestService";
import { userJsonService } from "@/services/user/userJsonService";
const mode = import.meta.env.VITE_APP_MODE;
export const userService = {
  async getUser(user_id) {
    switch (mode) {
      case "production":
        return await userApiRestService.getUser(user_id);
      case "test":
        return await userJsonService.getUser(user_id);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async getListUser(filterParams = null) {
    switch (mode) {
      case "production":
        return await userApiRestService.getListUser(filterParams);
      case "test":
        return await userJsonService.getListUser(filterParams);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },

  async addUser(new_data) {
    switch (mode) {
      case "production":
        return await userApiRestService.addUser(new_data);
      case "test":
        return await userJsonService.addUser(new_data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async updateUser(new_data) {
    switch (mode) {
      case "production":
        return await userApiRestService.updateUser(new_data);
      case "test":
        return await userJsonService.updateUser(new_data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async changePassword(user = null, credential) {
    switch (mode) {
      case "production":
        return await userApiRestService.changePassword(user, credential);
      case "test":
        return await userJsonService.changePassword(user, credential);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async deleteUser(dataid) {
    switch (mode) {
      case "production":
        return await userApiRestService.deleteUser(dataid);
      case "test":
        return await userJsonService.deleteUser(dataid);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async changeStatusUser(data) {
    switch (mode) {
      case "production":
        return await userApiRestService.changeStatusUser(data);
      case "test":
        return await userJsonService.changeStatusUser(data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
};
