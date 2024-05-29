import { isEmpty, dateDiffInDays } from "./utilities";
import { globalSettings } from "./constants/globalSettings";

function valid(text = "") {
  return {
    isValid: true,
    message: text,
    icon: "bi bi-exclamation-circle",
    validationClass: "valid",
  };
}
function noValid(text = "") {
  return {
    isValid: false,
    message: text,
    icon: "bi bi-exclamation-circle",
    validationClass: "no-valid",
  };
}
function validating() {
  return {
    isValid: false,
    message: "Validando...",
    icon: "bi bi-info-circle",
    validationClass: "normal",
  };
}
function noRequired() {
  return {
    isValid: true,
    message: "No requerido",
    icon: "bi bi-info-circle",
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
    var resp = valid();
    if (isEmpty(text)) resp = noValid("Ingrese un valor");
    return resp;
  },
  noRequired(_data) {
    let text = _data.value;
    var resp = noValid();
    if (isEmpty(text)) resp = noRequired();
    return resp;
  },

  length(_data) {
    let text = _data.value;
    let min = _data.min;
    let max = _data.max;

    if (min === undefined) {
      min = globalSettings.text_min_size;
    }
    if (max === undefined) {
      max = globalSettings.normal_text_max_size;
    }
    console.log("LENGTH");
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
};
export { validations, valid, noValid, validating };
