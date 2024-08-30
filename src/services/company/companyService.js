import { companyApiRestService } from "@/services/company/companyApiRestService";
import { companyJsonService } from "@/services/company/companyJsonService";
const mode = import.meta.env.VITE_APP_MODE;

export const companyService = {
  async getCompany(company_id) {
    switch (mode) {
      case "production":
        return await companyApiRestService.getCompany(company_id);
      case "test":
        return await companyJsonService.getCompany(company_id);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async getListCompany(filterParams = null) {
    switch (mode) {
      case "production":
        return await companyApiRestService.getListCompany(filterParams);
      case "test":
        return await companyJsonService.getListCompany(filterParams);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },

  async addCompany(new_data) {
    switch (mode) {
      case "production":
        return await companyApiRestService.addCompany(new_data);
      case "test":
        return await companyJsonService.getCompany(company_id);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async updateCompany(new_data) {
    switch (mode) {
      case "production":
        return await companyApiRestService.updateCompany(new_data);
      case "test":
        return await companyJsonService.updateCompany(new_data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async deleteCompany(dataid) {
    switch (mode) {
      case "production":
        return await companyApiRestService.deleteCompany(dataid);
      case "test":
        return await companyJsonService.deleteCompany(dataid);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async changeStatusCompany(data) {
    switch (mode) {
      case "production":
        return await companyApiRestService.changeStatusCompany(data);
      case "test":
        return await companyJsonService.changeStatusCompany(data);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
};
