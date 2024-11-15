import axiosInstance from "@/services/axios-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { MenuModel, ProductModel, TicketDetailModel } from "@/models";
import { useToastStore } from "@/stores";
const servicePath = "/ticket_detail/detail";
const servicePathOption = "/ticket_detail/option";
const servicePathStatistics = "/ticket_detail/statistics";
const module = "Detalle de Boleta";
export const ticketDetailApiRestService = {
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
      handleError(error, "get_element_error", module);
    }
  },
  async getListTicketDetail(filterParams = null) {
    let filteredFilters = "";
    if (filterParams != null) {
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
        is_menu,
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
        // Otros parámetros de filtro que puedas necesitar
        product_id,
        ticket_id,
        is_menu,
      };

      filteredFilters = Object.entries(filters)
        .filter(
          ([key, value]) =>
            value !== undefined && value !== null && value !== ""
        )
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      if (search && searchBy) {
        const searchByParam = `searchBy=${searchBy.join(",")}`;
        filteredFilters += searchByParam ? `&${searchByParam}` : "";
      }
      if (searches && searches != undefined) {
        console.log("entre a searches");
        searches.forEach((search, index) => {
          if (search.value && search.by) {
            filteredFilters += `&search${index + 1}=${encodeURIComponent(
              search.value
            )}&searchBy${index + 1}=${encodeURIComponent(search.by)}`;
          }
        });
      }
    }
    try {
      const response = await axiosInstance.get(
        `${servicePath}/?${filteredFilters}`
      );
      const datas = response.data.map((apiData) =>
        dataTransform.transformApiData(apiData, TicketDetailModel)
      );
      return datas;
    } catch (error) {
      handleError(error, "get_list_error", module);
    }
  },
  async getListProdutMenu(filterParams = null) {
    let filteredFilters = "";
    if (filterParams != null) {
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
        is_publish,
        is_menu,
        product_id,
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
        // Otros parámetros de filtro que puedas necesitar
        is_publish,
        is_menu,
        product_id,
      };

      filteredFilters = Object.entries(filters)
        .filter(
          ([key, value]) =>
            value !== undefined && value !== null && value !== ""
        )
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      if (search && searchBy) {
        const searchByParam = `searchBy=${searchBy.join(",")}`;
        filteredFilters += searchByParam ? `&${searchByParam}` : "";
      }
      if (searches && searches != undefined) {
        console.log("entre a searches");
        searches.forEach((search, index) => {
          if (search.value && search.by) {
            filteredFilters += `&search${index + 1}=${encodeURIComponent(
              search.value
            )}&searchBy${index + 1}=${encodeURIComponent(search.by)}`;
          }
        });
      }
    }
    try {
      const response = await axiosInstance.get(
        `${servicePathOption}/?${filteredFilters}`
      );
      const data_menus = response.data.menus.map((apiData) =>
        dataTransform.transformApiData(apiData, MenuModel)
      );
      const data_products = response.data.products.map((apiData) =>
        dataTransform.transformApiData(apiData, ProductModel)
      );
      return {
        menu: { name: "Menus", list: data_menus },
        product: { name: "Productos", list: data_products },
      };
    } catch (error) {
      handleError(error, "get_list_error", module);
    }
  },
  async getStatistics(filterParams = null) {
    try {
      const response = await axiosInstance.get(`${servicePathStatistics}/`);
      return response.data;
    } catch (error) {
      handleError(error, "get_list_error", module);
    }
  },

  async addTicketDetail(new_data, total = 10, final = 10) {
    try {
      let sendData = new_data.addData();
      sendData.new_total = total;
      sendData.new_final = final;
      const response = await axiosInstance.post(`${servicePath}/`, sendData);
      const data_new = dataTransform.transformApiData(
        response.data,
        TicketDetailModel
      );
      const useToast = useToastStore();
      useToast.show("add_success", {
        important_text: data_new.getTextModel(),
      });
      return data_new;
    } catch (error) {
      const useToast = useToastStore();
      useToast.show(
        "add_error",
        error.message ? error.message : `Error al agregar ${module}`
      );
      handleError(error, "add_error", module);
    }
  },
  async addTicketList(details) {
    const formattedQV = details.map((q_v) => q_v.addData());
    try {
      const config = {
        method: "POST",
        url: `${servicePath}/`,
        data: JSON.stringify(formattedQV),
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Usa la función con el alias para configurar el encabezado "Content-Type"
      const response = await axiosInstance(config);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateTicketDetail(new_data, total = 10, final = 10) {
    let dataid = new_data.id.value;
    try {
      let sendData = new_data.addData();
      sendData.new_total = total;
      sendData.new_final = final;
      console.log(sendData);
      const response = await axiosInstance.patch(
        `${servicePath}/${dataid}/`,
        sendData
      );
      const data_new = dataTransform.transformApiData(
        response.data,
        TicketDetailModel
      );
      const useToast = useToastStore();
      useToast.show("edit_success", {
        important_text: data_new.getTextModel(),
      });
      return data_new;
    } catch (error) {
      handleError(error, "edit_error", module);
    }
  },
  async deleteTicketDetail(dataid, total = 0, final = 10) {
    try {
      const config = {
        method: "DELETE",
        url: `${servicePath}/${dataid}/`,
        data: { new_total: total, new_final: final },
      };
      const response = await axiosInstance(config);
      const useToast = useToastStore();
      useToast.show("delete_success", {
        important_text: module,
      });
      return response;
    } catch (error) {
      handleError(error, "delete_error", module);
    }
  },
  async changeStatusTicketDetail(data) {
    const endpoint = `${servicePath}/${data.id.value}/`;
    return BaseService.changeStatus(endpoint, data, module);
  },
};
