import { isEmpty } from "@/helpers/utilities";
import { noValid, validations } from "@/helpers/validations";

export class Model {
  id = { value: null };
  status = { value: 1 };

  resetLabelValue(key) {
    const val = this[key];
    val.value = null;
  }
  resetLabelValidation(key) {
    const val = this[key];
    val.validation = {};
  }
  resetLabel(key) {
    resetLabelValue(key);
    resetLabelValidation(key);
  }
  validateLabel(_data) {
    let resp = false;
    if (_data.required === false) {
      resp = validations.noRequired(_data);
      if (resp.isValid) {
        _data.validation = resp;
        return;
      }
    } else {
      resp = validations.required(_data);
      if (!resp.isValid) {
        _data.validation = resp;
        return;
      }
    }

    if (_data.validate !== undefined) {
      for (let i = 0; i < _data.validate.length; i++) {
        const element = _data.validate[i];
        console.log(element);
        resp = validations[element](_data);
        if (!resp.isValid) break;
      }
    }

    _data.validation = resp;
  }
  validate() {
    let resp = true;
    for (var key in this) {
      let element = this[key];
      if (element.validate != undefined) {
        if (element.consider === false) {
          continue;
        }

        this.validateLabel(element);
        resp = resp && element.validation.isValid;
      }
    }
    return resp;
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
    this.status.value = status_new;
    return {
      status: status_new,
    };
  }
  getStatus() {
    if (this.status.value == 1) return "activado";
    if (this.status.value == 2) return "desactivado";
    if (this.status.value == 3) return "eliminado";
    return "Gaseoso";
  }

  addData() {
    let resp = {};
    for (var key in this) {
      let element = this[key];
      resp[key] = isEmpty(element.value) ? element.default : element.value;
    }
    return resp;
  }
  getData() {
    let resp = {};
    for (var key in this) {
      resp[key] = this[key].value;
    }
    return resp;
  }
}
