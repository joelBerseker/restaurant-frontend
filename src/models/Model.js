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
  validateLabel(_data, validateMultiple = true) {
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
    if (_data.alsoValidate && validateMultiple) {
      _data.alsoValidate.forEach((element) => {
        this.validateLabel(this[element], false);
      });
    }
    if (_data.validate) {
      for (let i = 0; i < _data.validate.length; i++) {
        const element = _data.validate[i];

        resp = validations[element](_data);
        if (!resp.isValid) break;
      }
    }
    console.log(_data.name);
    _data.validation = resp;
  }
  beforeValidate() {}

  validate() {
    this.beforeValidate();

    let resp = true;
    let listLabel = [];
    for (var key in this) {
      let element = this[key];
      if (element.validation === undefined) continue;
      if (element.noValidate) continue;
      this.validateLabel(element, false);
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
      if (data[key].file !== undefined) {
        this[key].file = data[key].file;
        console.log(this[key].file);
      }
      if (data[key].view_text) {
        this[key].view_text = data[key].view_text;
      }
      if (data[key].view_aditional) {
        this[key].view_aditional = data[key].view_aditional;
      }
    }
  }

  copyDefaultTest(data) {
    for (var key in data) {
      if (this[key].defaultTest) {
        this[key].value = data[key].defaultTest;
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
    console.log(this);
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
  beforeAddData() {}
  addData() {
    this.beforeAddData();
    let resp = {};
    for (var key in this) {
      let element = this[key];
      if (element.omit) {
        continue;
      }
      if (element.type === "image" || element.type === "file ") {
        if (element.file) resp[key] = element.file;
      } else {
        resp[key] = isEmpty(element.value) ? element.default : element.value;
      }
    }
    console.log(resp);
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
