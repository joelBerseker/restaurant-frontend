// En un archivo BaseService.js
import axiosInstance from "./axios-instance";
import { handleError } from "@/helpers";
import { useToastStore, useUserStore } from "@/stores";

export const BaseService = {
  async changeStatus(endpoint, data, module = null) {
    let successToast = "active_success";
    let errorToast = "active_error";
    if (data.status.value === 1) {
      successToast = "deactive_success";
      errorToast = "deactive_error";
    }

    try {
      const response = await axiosInstance.patch(endpoint, data.changeStatus());
      const useToast = useToastStore();
      useToast.show(successToast, {
        important_text: data.getTextModel(),
      });
      return response;
    } catch (error) {
      handleError(error, "status_error", module);
    }
  },
  async applyFilters(data, filterParams) {
    let filteredData = [...data]; // Hacer una copia de los datos
    const userStore = useUserStore();
    const company = userStore.getCompany() || 1;

    if (filterParams) {
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
      } = filterParams;

      filteredData = data.filter((item) => {
        if (item.company_id) {
          return item.company_id == company.id;
        }
        return true;
      });
      // Aplicar filtros básicos
      if (search && searchBy) {
        filteredData = filteredData.filter((item) => {
          // Recorre el array de campos en searchBy
          return searchBy.some((field) => {
            // Asegúrate de que el campo exista y conviértelo a minúsculas para la comparación
            return (
              item[field] &&
              item[field]
                .toString()
                .toLowerCase()
                .includes(search.toLowerCase())
            );
          });
        });
      }

      if (status || status != undefined) {
        filteredData = filteredData.filter((item) => item.status == status);
      }

      // Ordenar los datos si es necesario
      if (orderBy) {
        filteredData = filteredData.sort((a, b) => {
          if (order === "desc") {
            return a[orderBy] < b[orderBy] ? 1 : -1;
          } else {
            return a[orderBy] > b[orderBy] ? 1 : -1;
          }
        });
      } else {
        // Si no se especifica orderBy, ordenar por id (por defecto)
        filteredData = filteredData.sort((a, b) => a.id - b.id);
      }
    }

    return filteredData;
  },
  async moreFilter(data, filterParams, specficFilter) {
    try {
      const filteredData = data.filter((item) => {
        return specficFilter.every((key) => {
          if (filterParams[key] !== undefined) {
            return item[key] == filterParams[key];
          }
          return true;
        });
      });

      return filteredData;
    } catch (error) {
      console.error("Error al filtrar los datos:", error);
      throw error;
    }
  },
};
