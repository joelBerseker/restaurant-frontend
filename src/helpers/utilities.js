function isEmpty(text) {
  var resp = false;
  if (text === "" || text === null || text === undefined) {
    resp = true;
  }
  return resp;
}
function fixedDates(fechaOriginal) {
  if (isEmpty(fechaOriginal)) {
    return fechaOriginal;
  }
  const getDateMonth = (numeroMes) => {
    const nombresMes = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    return nombresMes[parseInt(numeroMes, 10) - 1];
  };

  const partesFecha = fechaOriginal.split("-");
  const dia = partesFecha[2];
  const mes = getDateMonth(partesFecha[1]);
  const año = partesFecha[0];

  return `${dia} de ${mes} de ${año}`;
}
function fixedDatesMonth(fechaOriginal) {
  if (isEmpty(fechaOriginal)) {
    return fechaOriginal;
  }
  const getDateMonth = (numeroMes) => {
    const nombresMes = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return nombresMes[parseInt(numeroMes, 10) - 1];
  };

  const partesFecha = fechaOriginal.split("-");
  const dia = partesFecha[2];
  const mes = getDateMonth(partesFecha[1]);

  return `${dia} de ${mes}`;
}
function generateDates(start_date, end_date) {
  const getDateMonth01 = (numeroMes) => {
    const nombresMes = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return nombresMes[parseInt(numeroMes, 10) - 1];
  };
  let datesArray = [];

  // Itera desde la fecha de inicio hasta la fecha de fin
  let currentDate = new Date(start_date);
  while (currentDate <= end_date) {
    // Obtiene el día y el mes en formato deseado
    const dayOfMonth = currentDate.getDate();
    const month = getDateMonth01(currentDate.getMonth() + 1);

    // Crea un objeto con la fecha y establece worked en true
    let dateObject = {
      date: `${dayOfMonth} de ${month}`,
      worked: true,
    };

    // Agrega el objeto al array
    datesArray.push(dateObject);

    // Avanza al siguiente día
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return datesArray;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function sleepInput() {
  return new Promise((resolve) => setTimeout(resolve, 400));
}
function sliceText(text) {
  if (isEmpty(text)) {
    return text;
  }
  var link = text;
  var linkSlice = link.substring(link.lastIndexOf("/") + 1, link.length);
  return linkSlice;
}
function fixMonths(text) {
  if (isEmpty(text)) return text;
  if (text == 1) return text + " mes";
  else return text + " meses";
}
function fixDays(text) {
  if (isEmpty(text)) return text;
  if (text == 1) return text + " día";
  else return text + " días";
}
function fixHours(text) {
  if (isEmpty(text)) return text;
  if (text == 1) return text + " hora";
  else return text + " horas";
}
function fixFuel(text) {
  if (isEmpty(text)) return text;
  if (text == 1) return text + " galon";
  else return text + " galones";
}
function fixRefreshment(text) {
  if (isEmpty(text)) return text;
  if (text == 1) return text + " almuerzo";
  else return text + " almuerzos";
}
const formatData = {
  datesHour(fecha) {
    var fechaActual = new Date();
    var fechaPublicacion = new Date(fecha);

    var diferenciaEnMs = fechaActual - fechaPublicacion;
    var segundosTranscurridos = Math.floor(diferenciaEnMs / 1000);

    if (segundosTranscurridos < 60) {
      return "hace menos de un minuto";
    } else if (segundosTranscurridos < 3600) {
      var minutosTranscurridos = Math.floor(segundosTranscurridos / 60);
      return "hace " + minutosTranscurridos + " minutos";
    } else if (segundosTranscurridos < 86400) {
      var horasTranscurridas = Math.floor(segundosTranscurridos / 3600);
      return "hace " + horasTranscurridas + " horas";
    } else {
      var diasTranscurridos = Math.floor(segundosTranscurridos / 86400);
      return "hace " + diasTranscurridos + " días";
    }
  },
  datesMin(_date) {
    let date = new Date(_date + " 00:00:00");

    let day = date.getDate().toString();
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();

    return day.padStart(2, 0) + "/" + month.padStart(2, 0) + "/" + year;
  },
  dates(fechaOriginal) {
    if (isEmpty(fechaOriginal)) {
      return fechaOriginal;
    }
    const getDateMonth = (numeroMes) => {
      const nombresMes = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ];
      return nombresMes[parseInt(numeroMes, 10) - 1];
    };

    const partesFecha = fechaOriginal.split("-");
    const dia = partesFecha[2];
    const mes = getDateMonth(partesFecha[1]);
    const año = partesFecha[0];

    return `${dia} de ${mes} de ${año}`;
  },
  months(text) {
    if (isEmpty(text)) return text;
    if (text == 1) return text + " mes";
    else return text + " meses";
  },
  days(text) {
    if (isEmpty(text)) return text;
    if (text == 1) return text + " día";
    else return text + " días";
  },
  hours(text) {
    if (isEmpty(text)) return text;
    if (text == 1) return text + " hora";
    else return text + " horas";
  },
  fuel(text) {
    if (isEmpty(text)) return text;
    if (text == 1) return text + " galon";
    else return text + " galones";
  },
  refresment(text) {
    if (isEmpty(text)) return text;
    if (text == 1) return text + " almuerzo";
    else return text + " almuerzos";
  },
  km(text) {
    if (isEmpty(text)) return text;
    return text + " km";
  },
  id(text) {
    var resp = text.toString();
    return resp.padStart(4, 0);
  },
  defined(text) {
    if (isEmpty(text)) return "No definido";
    return text;
  },
  nameProgramation(_name, _lastname) {
    let resp = "";
    resp += _name[0] + ". ";

    let arrayLastName = [];

    let _text = _lastname;
    let _spaceIndex = _text.indexOf(" ");

    let part1 = "";
    let part2 = _text;

    while (_spaceIndex !== -1) {
      part1 = _text.substring(0, _spaceIndex);
      part2 = _text.substring(_spaceIndex + 1, _text.length);
      arrayLastName.push(part1);

      _text = part2;
      _spaceIndex = _text.indexOf(" ");
    }
    arrayLastName.push(part2);

    console.log(arrayLastName);

    if (arrayLastName.length === 1) {
      resp += " " + arrayLastName[0];
      return resp;
    }
    if (arrayLastName.length >= 2) {
      resp += " " + arrayLastName[0];
      if (
        arrayLastName[0].toLowerCase() === "del" ||
        arrayLastName[0].toLowerCase() === "de"
      ) {
        resp += " " + arrayLastName[1];

        if (
          arrayLastName[1].toLowerCase() === "la" ||
          arrayLastName[1].toLowerCase() === "los"
        ) {
          if (arrayLastName.length >= 3) {
            resp += " " + arrayLastName[2];
          }
        }
      }
      return resp;
    }

    return resp;
  },
};
function printDocument(element, title = null) {
  var ventana = window.open(
    "",
    "PRINT",
    "height=" + screen.height + " ,width=" + screen.width + ", fullscreen=yes "
  );
  ventana.document.write("<html><head><title>" + title + "</title>");
  ventana.document.write(
    '<link rel="stylesheet" type="text/css" href="/public/print.css">'
  ); //Cargamos otra hoja, no la normal
  ventana.document.write("</head><body >");
  ventana.document.write(element.innerHTML);
  ventana.document.write("</body></html>");
  ventana.document.close();
  ventana.focus();

  ventana.onload = function () {
    ventana.print();
    ventana.close();
  };
  return true;
}

const selectFormatData = {
  vehicle(_item) {
    let resp = {};

    resp.view_text = _item.plate;
    resp.view_aditional =
      _item.brand_vehicle.brand_name + " / " + _item.model_vehicle.model_name;
    return resp;
  },
  vehicleModel(_item) {
    let resp = {};

    resp.view_text = _item.model_name;
    resp.view_aditional =
      _item.brand_vehicle.brand_name + " / " + _item.type_vehicle.type_name;
    resp.brand = _item.brand_vehicle.brand_name;
    resp.type = _item.type_vehicle.type_name;
    resp.model = _item.model_name;

    return resp;
  },
  vehicleProvider(_item) {
    let resp = {};

    resp.view_text = _item.provider_name;
    resp.view_aditional =
      _item.representative_name + " / " + _item.representative_position;
    return resp;
  },
  user(_item) {
    let resp = {};
    resp.view_text = _item.user_name + " " + _item.user_lastname;
    resp.view_aditional = _item.user_role;
    return resp;
  },
  service(_item) {
    let resp = {};
    resp.view_text = "Servicio " + formatData.id(_item.id);
    resp.view_aditional =
      _item.quote.company.company_name + " / " + _item.quote.quotes_subject;
    return resp;
  },
  article(_item) {
    let resp = {};
    resp.view_text = _item.article_name;
    resp.view_aditional = _item.type.type_article_name;
    return resp;
  },
  quote(_item) {
    let resp = {};
    resp.view_text = "Cotización " + formatData.id(_item.id);
    resp.view_aditional =
      _item.company.company_name + " / " + _item.quotes_subject;
    return resp;
  },
  quoteCompany2(_item) {
    let resp = {};

    resp.view_text = _item.company.company_name;
    resp.view_aditional =
      _item.representative.representative_name +
      " / " +
      _item.representative.representative_position;
    return resp;
  },
  companyRepresentative(_item) {
    let resp = {};

    resp.view_text = _item.representative_name;
    resp.view_aditional = _item.representative_position;

    return resp;
  },
};

async function consult(
  messageText,
  messageFunction,
  consultFunction,
  args1 = null
) {
  let _data = null;
  let _error = null;
  let _resp = null;
  let _ok = false;
  try {
    await sleep(1000);
    if (args1 !== null) _resp = await consultFunction(args1);
    else _resp = await consultFunction();
    messageFunction("success", messageText);
    _data = _resp;
    _error = null;
    _ok = true;
  } catch (error) {
    _data = null;
    _error = error;
    _ok = false;
    messageFunction("error", messageText, error);
  }
  return { data: _data, error: _error, success: _ok };
}
function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
function getModuleBitacora(_module) {
  let resp = { name: "", to: null };
  switch (_module) {
    case "User":
      resp.name = "Usuarios";
      resp.to = "user_detail";
      break;
    case "Service":
      resp.name = "Servicios";
      resp.to = "service_detail";

      break;
    case "Vehicle":
      resp.name = "Vehiculos";
      resp.to = "vehicle_detail";
      break;
    case "DailyPart":
      resp.name = "Parte Diario";
      break;
    case "Quotes":
      resp.name = "Cotizacion";
      resp.to = "quote_detail";

      break;
    case "Accidents_Incidents":
      resp.name = "Incidentes";
      resp.to = "incident_detail";

      break;
    case "Model":
      resp.name = "Modelos de Vehiculos";
      resp.to = "model";

      break;
    case "Type":
      resp.name = "Tipo de Vehiculos";
      resp.to = "type";

      break;

    default:
      resp.name = "No definido";
      resp.to = null;
      break;
  }
  return resp;
}
function getActionBitacora(_action) {
  if (_action === "~") {
    return "Actualizar";
  } else if (_action === "+") {
    return "Agregar";
  } else {
    return "Editar";
  }
}
export {
  isEmpty,
  sleep,
  sleepInput,
  sliceText,
  fixedDates,
  fixedDatesMonth,
  fixMonths,
  fixHours,
  fixDays,
  printDocument,
  fixRefreshment,
  fixFuel,
  formatData,
  generateDates,
  selectFormatData,
  dateDiffInDays,
  getModuleBitacora,
  getActionBitacora,
};
