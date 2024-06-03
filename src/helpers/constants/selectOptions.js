import { isEmpty } from "@/helpers/utilities";

const status = {
  options: [
    { value: "0", text: "Todos", color: "" },
    { value: "1", text: "Activo", color: "active-status" },
    { value: "2", text: "Inactivo", color: "inactive-status" },
    { value: "3", text: "Eliminado", color: "delete-status" }, // para la vista de administrador
  ],
  get(value) {
    if (isEmpty(value)) return value;
    return this.options[value].text;
  },
  getAll(value) {
    if (isEmpty(value)) return value;
    return this.options[value];
  },
  getClass(value) {
    if (isEmpty(value)) return value;
    return this.options[value].color;
  },
};

const confirmation = {
  options: [
    { value: true, text: "Si" },
    { value: false, text: "No" },
  ],
  get(value) {
    return value ? "Si" : "No";
  },
};

export { status, confirmation };
