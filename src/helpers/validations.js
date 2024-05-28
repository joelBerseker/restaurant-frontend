import { isEmpty, dateDiffInDays } from "../helpers/Utilities";

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
const validate = {
  onlyEmail(text) {
    var resp = valid();
    if (!regularExpressions.onlyEmail.test(text))
      resp = noValid("Por favor ingrese un email valido");
    return resp;
  },
  onlyText(text) {
    var resp = valid();
    if (!regularExpressions.onlyText.test(text))
      resp = noValid("Solo se permite texto");
    return resp;
  },
  onlyTextNumber(text) {
    var resp = valid();
    if (!regularExpressions.onlyTextAndNumber1.test(text))
      resp = noValid("Solo se permite texto y numeros");
    return resp;
  },
  onlyNumber(text) {
    var resp = valid();
    if (!regularExpressions.onlyNumber.test(text))
      resp = noValid("Solo se permite numeros");
    return resp;
  },
  onlyPhone(text) {
    var resp = valid();
    if (!regularExpressions.onlyPhone.test(text))
      resp = noValid("Solo se permite numeros y [+]");
    return resp;
  },
  onlyPrice(text) {
    var resp = valid();
    if (!regularExpressions.onlyPrice.test(text))
      resp = noValid("Solo se permite numeros, ejemplo: [1.00 o 1]");
    return resp;
  },
  textEmpty(text) {
    var resp = valid();
    if (isEmpty(text)) resp = noValid("Ingrese un valor");
    return resp;
  },
  selectEmpty(text) {
    var resp = valid();
    if (isEmpty(text)) resp = noValid("Seleccione una opción");
    return resp;
  },
  fileEmpty(text) {
    var resp = valid();
    if (isEmpty(text)) resp = noValid("Ingrese un archivo");
    return resp;
  },
  dateEmpty(text) {
    var resp = valid();
    if (isEmpty(text)) resp = noValid("Seleccione una fecha");
    return resp;
  },
  hourEmpty(text) {
    var resp = valid();
    if (isEmpty(text)) resp = noValid("Seleccione una hora");
    return resp;
  },
  dateMin(text, min, label) {
    var resp = valid();
    if (text <= min)
      resp = noValid("La fecha no puede ser menor o igual a [" + label + "]");
    return resp;
  },
  dateMax(text, min, label) {
    var resp = valid();
    if (text >= min)
      resp = noValid("La fecha no puede ser mayor o igual a [" + label + "]");
    return resp;
  },
  hourMin(text, min, label) {
    var resp = valid();
    if (text <= min)
      resp = noValid("La hora no puede ser menor o igual a [" + label + "]");
    return resp;
  },
  dateEqual(text, min, label) {
    var resp = valid();
    if (text < min)
      resp = noValid("La fecha no puede ser menor a [" + label + "]");
    return resp;
  },
  dateRange(min, max, range, label) {
    let minDate = new Date(min);
    let maxDate = new Date(max);

    let diff = dateDiffInDays(minDate, maxDate);

    var resp = valid();
    if (diff > range)
      resp = noValid(
        "No puede haber mas de " + range + " dias de diferencia con " + label
      );
    return resp;
  },
  dateMaxEqual(text, min, label) {
    var resp = valid();
    if (text > min)
      resp = noValid("La fecha no puede ser mayor a [" + label + "]");
    return resp;
  },
  noRequired(text) {
    var resp = noValid();
    if (isEmpty(text)) resp = noRequired();
    return resp;
  },

  noRequiredArray(text) {
    var resp = noValid();
    if (text.length === 0) resp = noRequired();
    return resp;
  },
  textLength(text, min, max) {
    var resp = valid();
    var textLength = 0;
    if (!isEmpty(text)) textLength = text.length;

    if (textLength < min) {
      resp = noValid("Debe contener menos de " + min + " caracteres");
      if (min === max) resp = noValid("Debe contener " + min + " caracteres");
    } else if (textLength > max) {
      resp = noValid("Debe contener maximo " + max + " caracteres");
      if (min === max) resp = noValid("Debe contener " + min + " caracteres");
    }
    return resp;
  },
  numberMinMax(text, min, max) {
    var resp = valid();

    if (text < min) {
      resp = noValid("Debe ser mayor o igual a " + min);
    } else if (text > max) {
      resp = noValid("Debe ser menor o igual a " + max);
    }
    return resp;
  },
  arrayLength(array, min, max) {
    var resp = valid();
    var arrayLength = array.length;

    if (arrayLength < min) {
      resp = noValid("Debe contener al menos " + min + " elemento(s)");
    } else if (arrayLength > max) {
      resp = noValid("Debe contener como maximo " + max + " elemento(s)");
    }
    return resp;
  },
  textEquals(text, text2, label = "[]") {
    var resp = valid();

    if (text !== text2) {
      resp = noValid("Debe ser igual a [" + label + "]");
    }
    return resp;
  },
  textNoEquals(text, text2, label = "[]") {
    var resp = valid();

    if (text === text2) {
      resp = noValid("No debe ser igual a [" + label + "]");
    }
    return resp;
  },
};
const validations = {
  select(text, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequired(text);
      if (resp.isValid) return resp;
    }
    resp = validate.selectEmpty(text);
    return resp;
  },
  date(text, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequired(text);
      if (resp.isValid) return resp;
    }
    resp = validate.dateEmpty(text);
    return resp;
  },
  dateRange(min, text, range, label, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequired(text);
      if (resp.isValid) return resp;
    }
    resp = validate.dateEmpty(text);
    if (resp.isValid) resp = validate.dateRange(min, text, range, label);
    return resp;
  },
  programationServiceStart(min, text, label, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequired(text);
      if (resp.isValid) return resp;
    }
    resp = validate.dateEmpty(text);
    if (resp.isValid) resp = validate.dateEqual(text, min, label);

    return resp;
  },
  programationServiceEnd(min, text, range, label, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequired(text);
      if (resp.isValid) return resp;
    }
    resp = validate.dateEmpty(text);
    if (resp.isValid) resp = validate.dateRange(min, text, range, label);
    if (resp.isValid) resp = validate.dateMin(text, min, label);

    return resp;
  },
  hour(text, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequired(text);
      if (resp.isValid) return resp;
    }
    resp = validate.hourEmpty(text);
    return resp;
  },
  price(text, min, max, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequired(text);
      if (resp.isValid) return resp;
    }
    resp = validate.textEmpty(text);
    if (resp.isValid) resp = validate.onlyPrice(text);
    if (resp.isValid) resp = validate.textLength(text, min, max);
    return resp;
  },

  file(text, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequired(text);
      if (resp.isValid) return resp;
    }
    resp = validate.fileEmpty(text);
    return resp;
  },
  dateMin(text, min, label, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequired(text);
      if (resp.isValid) return resp;
    }
    resp = validate.dateEmpty(text);
    if (resp.isValid) resp = validate.dateMin(text, min, label);
    return resp;
  },
  dateMinMaxEqual(text, min, label, max, label2, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequired(text);
      if (resp.isValid) return resp;
    }
    resp = validate.dateEmpty(text);
    if (resp.isValid) resp = validate.dateMin(text, min, label);
    if (resp.isValid) resp = validate.dateMaxEqual(text, max, label2);

    return resp;
  },

  hourMin(text, min, label, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequired(text);
      if (resp.isValid) return resp;
    }
    resp = validate.hourEmpty(text);
    if (resp.isValid) resp = validate.hourMin(text, min, label);
    return resp;
  },
  dateEqual(text, min, label, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequired(text);
      if (resp.isValid) return resp;
    }
    resp = validate.dateEmpty(text);
    if (resp.isValid) resp = validate.dateEqual(text, min, label);
    return resp;
  },
  text(text, min, max, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequired(text);
      if (resp.isValid) return resp;
    }
    resp = validate.textEmpty(text);
    if (resp.isValid) resp = validate.textLength(text, min, max);
    return resp;
  },
  textNumber(text, min, max) {
    var resp = validate.textEmpty(text);
    if (resp.isValid) resp = validate.onlyTextNumber(text);
    if (resp.isValid) resp = validate.textLength(text, min, max);
    return resp;
  },
  number(text, min, max, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequired(text);
      if (resp.isValid) return resp;
    }
    resp = validate.textEmpty(text);
    if (resp.isValid) resp = validate.onlyNumber(text);
    if (resp.isValid) resp = validate.textLength(text, min, max);
    return resp;
  },
  numberMinMax(text, min, max, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequired(text);
      if (resp.isValid) return resp;
    }
    resp = validate.textEmpty(text);
    if (resp.isValid) resp = validate.onlyNumber(text);
    if (resp.isValid) resp = validate.numberMinMax(text, min, max);
    return resp;
  },
  phone(text, min, max, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequired(text);
      if (resp.isValid) return resp;
    }
    resp = validate.textEmpty(text);
    if (resp.isValid) resp = validate.onlyPhone(text, min, max);
    if (resp.isValid) resp = validate.textLength(text, min, max);
    return resp;
  },
  array(array, min, max, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequiredArray(array);
      if (resp.isValid) return resp;
    }
    resp = validate.textEmpty(array);
    if (resp.isValid) resp = validate.arrayLength(array, min, max);
    return resp;
  },
  textEquals(text, text2, label) {
    var resp = validate.textEmpty(text);
    if (resp.isValid) resp = validate.textEquals(text, text2, label);
    return resp;
  },
  textNoEquals(text, text2, label, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequiredArray(array);
      if (resp.isValid) return resp;
    }
    resp = validate.textEmpty(text);
    if (resp.isValid) resp = validate.textNoEquals(text, text2, label);
    return resp;
  },

  selectNoEquals(text, text2, label, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequiredArray(array);
      if (resp.isValid) return resp;
    }
    resp = validate.selectEmpty(text);
    if (resp.isValid) resp = validate.textNoEquals(text, text2, label);
    return resp;
  },
  email(text, min, max, required = true) {
    var resp = null;
    if (!required) {
      resp = validate.noRequired(text);
      if (resp.isValid) return resp;
    }
    resp = validate.textEmpty(text);
    if (resp.isValid) resp = validate.textLength(text, min, max);
    if (resp.isValid) resp = validate.onlyEmail(text);
    return resp;
  },
};
export { validations, valid, noValid, validating };
