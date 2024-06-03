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

    console.log("SIGUI VERIFICANDO");
    console.log(_data);
    if (_data.validate !== undefined) {
      for (let i = 0; i < _data.validate.length; i++) {
        const element = _data.validate[i];
        console.log(element);
        resp = validations[element](_data);
        if (!resp.isValid) break;
      }
    }
    console.log({ resp });
    _data.validation = resp;
    console.log({ resp });
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
    return {
      status: status_new,
    };
  }

  addData() {
    let resp = {};
    for (var key in this) {
      resp[key] = this[key].value;
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
