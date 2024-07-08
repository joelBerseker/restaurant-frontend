import { Model } from "@/models/";

export class CompanyModel extends Model {
  name = {
    id: "name",
    name: "Nombre",
    value: null,
    validation: {},
    validate: ["length"],
  };

  description = {
    id: "description",
    name: "Descripción",
    type: "textarea",
    value: null,
    required: false,
    type: "textarea",
    validation: {},
    validate: ["length"],
  };

  ruc = {
    id: "ruc",
    name: "RUC",
    value: null,
    validation: {},
    validate: ["length", "number"],
  };

  company_image = {
    id: "company_image",
    name: "Imagen de la Compañia",
    type: "image",
    value: null,
    file: null,
    required: false,
    validation: {},
  };

  address = {
    id: "address",
    name: "Dirección ",
    value: null,
    validation: {},
    validate: ["length"],
  };

  phone_principal = {
    id: "phone_principal",
    name: "Teléfono",
    value: null,
    validation: {},
    validate: ["length"],
  };

  phone_secundary = {
    id: "phone_secundary",
    name: "Teléfono Secundario",
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
  getText() {
    return this.id.value + " - " + this.name.value + " ";
  }
  getTextModel() {
    return "Empresa [" + this.getText() + "]";
  }
}
