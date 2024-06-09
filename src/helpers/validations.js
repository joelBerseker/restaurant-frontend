import { isEmpty, dateDiffInDays } from "./utilities";
import { globalSettings } from "./constants/globalSettings";
import { icon } from "@fortawesome/fontawesome-svg-core";

function valid(text = "") {
  return {
    isValid: true,
    message: text,
    icon: "fa-solid fa-check",
    icon_text: "fa-regular fa-circle-question",
    validationClass: "valid",
  };
}
function noValid(text = "") {
  return {
    isValid: false,
    message: text,
    icon: "fa-solid fa-exclamation",

    icon_text: "fa-regular fa-circle-question",
    validationClass: "no-valid",
  };
}
function validating() {
  return {
    isValid: false,
    message: "Validando...",
    icon_text: "fa-regular fa-circle-question",
    validationClass: "normal",
  };
}
function noRequired() {
  return {
    isValid: true,
    message: "No requerido",
    icon_text: "fa-regular fa-circle-question",
    validationClass: "normal",
  };
}
const regularExpressions = {
  onlyNumber: /^[0-9]*$/,
  onlyPhone: /^[0-9+]*$/,
  onlyPrice: /^\d+(.\d{2})?$/,
  onlyPlate: /^[A-Z0-9][A-Z]\d{3}-\d{3}$/,
  onlyTextAndNumber: /^[a-zá-úÁ-ÚA-Z0-9 _.,:;"#%&~^/(){}!¡¿?/\\/]*$/,
  onlyText: /^[a-zá-úÁ-ÚA-Z ]*$/,
  onlyTextAndNumber1: /^[a-zá-úÁ-ÚA-Z0-9 ]*$/,
  onlyTextAndNumber2: /^[a-zá-úÁ-ÚA-Z0-9/{/},.:;_!"#$%?¿&()\- //+-/*/[\]]*$/,
  onlyEmail:
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};
const validations = {
  required(_data) {
    let text = _data.value;
    if (_data.type === "image" || _data.type === "file ") text = _data.file;
    var resp = valid();
    if (isEmpty(text)) {
      let _txtInvalid = "Ingrese un valor";
      switch (_data.type) {
        case "select":
          _txtInvalid = "Seleccione una opción";
          break;
        case "file":
          _txtInvalid = "Ingrese un archivo";
          break;
        case "image":
          _txtInvalid = "Ingrese una imagen";
          break;
        case "date":
          _txtInvalid = "Seleccione una fecha";
          break;
        default:
          break;
      }
      resp = noValid(_txtInvalid);
    }
    return resp;
  },
  noRequired(_data) {
    var resp = noValid();

    let text = _data.value;
    if (_data.type === "image" || _data.type === "file ") {
      text = _data.file;
      resp = valid();
    }

    if (isEmpty(text)) {
      console.log("no required");
      resp = noRequired();
    }
    return resp;
  },

  length(_data, from = null) {
    let text = _data.value;
    let min = _data.min;
    let max = _data.max;

    if (min === undefined) {
      min = globalSettings.text_min_size;
      if (from === "number" || from === "decimal") min = 1;
    }
    if (max === undefined) {
      max = globalSettings.normal_text_max_size;
      if (_data.type === "textarea") max = globalSettings.large_text_max_size;
      else if (from === "number") max = globalSettings.number_max_size;
      else if (from === "decimal") max = globalSettings.number_decimal_max_size;
    }
    var resp = valid();
    var textLength = 0;
    if (!isEmpty(text)) textLength = text.length;

    if (textLength < min) {
      resp = noValid("Debe contener minimo " + min + " caracteres");
      if (min === max) resp = noValid("Debe contener " + min + " caracteres");
    } else if (textLength > max) {
      resp = noValid("Debe contener maximo " + max + " caracteres");
      if (min === max) resp = noValid("Debe contener " + min + " caracteres");
    }
    return resp;
  },
  email(_data) {
    let text = _data.value;

    var resp = valid();
    if (!regularExpressions.onlyEmail.test(text))
      resp = noValid("Por favor ingrese un email valido");
    return resp;
  },
  equals(_data) {
    let text = _data.value;
    let text2 = _data.equalsTo.value;
    let label = _data.equalsTo.name;

    var resp = valid();

    if (text !== text2) {
      resp = noValid("Debe ser igual a " + label + "");
    }
    return resp;
  },
  number(_data) {
    let text = _data.value;
    var resp = valid();
    resp = this.length(_data, "number");
    if (!resp.isValid) return resp;
    if (!regularExpressions.onlyNumber.test(text))
      resp = noValid("Solo se permite numeros");
    return resp;
  },
};
export { validations, valid, noValid, validating };
