import { Model } from "@/models/";

export class CompanyModel extends Model {
  name = {
    id: "name",
    name: "Nombre de la Compañia",
    value: null,
    required: false, // blank=True in Django
    validation: {},
    validate: ["length"],
  };

  description = {
    id: "description",
    name: "Descripción de la Compañia",
    value: null,
    required: false, // null=True, blank=True in Django
    type: "textarea",
    validation: {},
    validate: ["length"],
    default: "Sin descripción",
  };

  ruc = {
    id: "ruc",
    name: "RUC de la Compañia",
    value: null,
    required: false, // null=True, blank=True in Django
    validation: {},
    validate: ["length"],
  };

  company_image = {
    id: "company_image",
    name: "Imagen de la Compañia",
    value: null,
    required: false, // null=True, blank=True in Django
    validation: {},
    validate: ["image"],
  };

  address = {
    id: "address",
    name: "Dirección de la Compañia",
    value: null,
    required: false, // null=True, blank=True in Django
    validation: {},
    validate: ["length"],
  };

  phone_principal = {
    id: "phone_principal",
    name: "Teléfono de la Compañia",
    value: null,
    required: false, // null=True, blank=True in Django
    validation: {},
    validate: ["length"],
  };

  phone_secundary = {
    id: "phone_secundary",
    name: "Teléfono Secundario de la Compañia",
    value: null,
    required: false, // null=True, blank=True in Django
    validation: {},
    validate: ["length"],
  };

  getDataOptions() {
    return {
      value: this.id.value,
      text: this.name.value,
    };
  }
}
