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
function getValue(_data) {
  if (isEmpty(_data.value) && _data.default) {
    return _data.default;
  }
  return _data.value;
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
    let _value = getValue(_data);

    if (_data.type === "image" || _data.type === "file ") _value = _data.file;
    var resp = valid();

    if (isEmpty(_value)) {
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
        case "time":
          _txtInvalid = "Seleccione una hora";
          break;
        default:
          break;
      }
      resp = noValid(_txtInvalid);
    }
    return resp;
  },
  noRequired(_data) {
    var resp = null;
    let _value = null;
    if (_data.type === "image" || _data.type === "file ") {
      _value = _data.file;
    } else {
      _value = _data.value;
    }
    console.log(_data);
    if (_data.validate) resp = noValid();
    else resp = valid();

    if (isEmpty(_value)) {
      resp = noRequired();
    }
    return resp;
  },

  length(_data) {
    console.log("legt");
    let _value = getValue(_data);

    let _type = _data.type;
    let min = _data.min;
    let max = _data.max;

    if (min === undefined) {
      min = globalSettings.text_min_size;
      if (_type === "number" || _type === "decimal") min = 1;
    }
    if (max === undefined) {
      switch (_type) {
        case "textarea":
          max = globalSettings.large_text_max_size;
          break;
        case "number":
          max = globalSettings.number_max_size;
          break;
        case "decimal":
          max = globalSettings.number_decimal_max_size;
          break;
        default:
          max = globalSettings.normal_text_max_size;
          break;
      }
    }
    var resp = valid();
    var _valueLength = 0;
    if (!isEmpty(_value)) _valueLength = _value.length;

    if (_valueLength < min) {
      resp = noValid("Debe contener minimo " + min + " caracteres");
      if (min === max) resp = noValid("Debe contener " + min + " caracteres");
    } else if (_valueLength > max) {
      resp = noValid("Debe contener maximo " + max + " caracteres");
      if (min === max) resp = noValid("Debe contener " + min + " caracteres");
    }
    return resp;
  },
  email(_data) {
    let _value = getValue(_data);

    var resp = valid();
    if (!regularExpressions.onlyEmail.test(_value))
      resp = noValid("Por favor ingrese un email valido");
    return resp;
  },
  equals(_data) {
    let _value = getValue(_data);
    let _value2 = _data.equalsTo.value;
    let label = _data.equalsTo.name;

    var resp = valid();

    if (_value !== _value2) {
      resp = noValid("Debe ser igual a " + label + "");
    }
    return resp;
  },

  greaterThan(_data) {
    let _value = getValue(_data);
    let _value2 = _data.greaterThan;

    var resp = valid();

    if (_value <= _value2) {
      resp = noValid("Debe ser mayor a " + _value2);
    }
    return resp;
  },
  number(_data) {
    let _value = getValue(_data);
    var resp = valid();
    if (!regularExpressions.onlyNumber.test(_value))
      resp = noValid("Solo se permite numeros");
    return resp;
  },
  decimal(_data) {
    let _value = getValue(_data);
    var resp = valid();
    if (!regularExpressions.onlyPrice.test(_value))
      resp = noValid("Solo se permite numeros, ejemplo: [1.00 o 1]");
    return resp;
  },

  array(_data) {
    let _value = getValue(_data);

    let min = _data.min;
    let max = _data.max;

    if (min === undefined) {
      min = globalSettings.array_min_size;
    }
    if (max === undefined) {
      max = globalSettings.array_max_size;
    }
    var resp = valid();
    var _valueLength = 0;
    if (!isEmpty(_value)) _valueLength = _value.length;

    if (_valueLength < min) {
      resp = noValid("Debe contener minimo " + min + " elementos");
      if (min === max) resp = noValid("Debe contener " + min + " elementos");
    } else if (_valueLength > max) {
      resp = noValid("Debe contener maximo " + max + " elementos");
      if (min === max) resp = noValid("Debe contener " + min + " elementos");
    }
    return resp;
  },
};
export { validations, valid, noValid, validating };
