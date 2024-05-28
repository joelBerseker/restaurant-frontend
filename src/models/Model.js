import { isEmpty } from "@/helpers/Utilities";
import { noValid } from "@/helpers/Validations";

export class Model {
  validation = {
    value: false,
  };
  status = {
    value: 1, // int
  };
  formatData() {}
  errorValidation(key, error) {
    const val = this[key];
    val.validation = noValid(error);
  }

  getValue(key) {
    const val = this[key];

    return isEmpty(val.value) ? val.default : val.value;
  }
  getValueLabel(_data) {
    return isEmpty(_data.value) ? _data.default : _data.value;
  }
  resetValue(key) {
    const val = this[key];
    val.value = null;
    val.validation = {};
  }
  resetValidation(key) {
    const val = this[key];
    val.validation = {};
  }
  validate() {
    let resp = true;
    for (var key in this) {
      if (this[key].validate != undefined) {
        if (this[key].consider === false) {
          continue;
        }

        if (
          this[key].validation.isValid === undefined ||
          this[key].revalidate !== false
        ) {
          this[key].validate();
        }
        resp = resp && this[key].validation.isValid;
      }
    }
    this.validation.value = resp;
  }
  copy(data) {
    for (var key in data) {
      if (this[key].copy !== false)
        this[key].value = JSON.parse(JSON.stringify(data[key].value));
      if (data[key].validation != undefined) {
        this[key].validation = {};
      }
      if (data[key].file !== undefined) {
        this[key].file = data[key].file;
      }
      if (data[key].view_text !== undefined) {
        this[key].view_text = data[key].view_text;
      }
      if (data[key].view_aditional !== undefined) {
        this[key].view_aditional = data[key].view_aditional;
      }
    }
  }
  initUnique() {
    for (var key in this) {
      if (this[key].unique !== undefined) {
        this[key].unique = this[key].value;
      }
      if (this[key].getViewText !== undefined) {
        this[key].getViewText();
      }
    }
  }
  init() {
    this.initUnique();
  }
  changeStatus() {
    let status_new = 1;
    if (this.status.value == 1) {
      status_new = 2;
    }
    return {
      status: status_new,
    };
  }
  getViewText(_key, _value) {
    return this[_key].value === null ? "No definido" : this[_key].value[_value];
  }
}
