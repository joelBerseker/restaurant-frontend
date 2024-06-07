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

        resp = validations[element](_data);
        if (!resp.isValid) break;
      }
    }

    _data.validation = resp;
  }
  validate() {
    let resp = true;
    let listLabel = [];
    for (var key in this) {
      let element = this[key];
      if (element.validation === undefined) continue;
      if (element.consider === false) continue;
      this.validateLabel(element);
      if (!element.validation.isValid) {
        listLabel.push(element.name ? element.name : "Sin nombre");
      }
      resp = resp && element.validation.isValid;
    }

    return { value: resp, list: listLabel };
  }

  copy(data) {
    for (var key in data) {
      if (this[key].copy !== false)
        this[key].value = JSON.parse(JSON.stringify(data[key].value));
      if (this[key].additional)
        this[key].additional = JSON.parse(JSON.stringify(data[key].additional));
      if (data[key].validation) {
        this[key].validation = {};
      }
      if (data[key].file) {
        this[key].file = data[key].file;
      }
      if (data[key].view_text) {
        this[key].view_text = data[key].view_text;
      }
      if (data[key].view_aditional) {
        this[key].view_aditional = data[key].view_aditional;
      }
    }
  }
  initValueText() {
    for (var key in this) {
      if (this[key].getValueText) {
        this[key].valueText = this[key].getValueText();
      }
    }
  }
  init() {
    this.initValueText();
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
    resp.elementText = this.getText();
    resp.elementTextModel = this.getTextModel();

    return resp;
  }
  getText() {
    return null;
  }
  getTextModel() {
    return null;
  }
}
