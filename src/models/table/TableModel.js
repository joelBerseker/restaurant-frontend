import { validations } from "@/helpers/validations";
import { isEmpty } from "@/helpers/utilities";
import { Model } from "@/models/";

export class TableModel extends Model {
  id = {
    value: null,
  };
  table_name = {
    value: null,
    validation: {},
    validate() {
      this.validation = validations.text(this.value, 3, 25);
    },
  };
  table_description = {
    value: null,
    validation: {},
    validate() {
      this.validation = validations.text(this.value, 3, 100, false);
    },
    default: "Sin descripción",
  };
  addData() {
    return {
      table_name: this.table_name.value,
      table_description: isEmpty(this.table_description.value)
        ? this.table_description.default
        : this.table_description.value,
    };
  }
  getData() {
    return {
      id: this.id.value,
      name: this.table_name.value,
      description: this.table_description.value,
      status: this.status.value,
    };
  }
  getDataOptions() {
    return {
      value: this.id.value,
      text: this.table_name.value,
    };
  }
}
