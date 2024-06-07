import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

// Obtener la ruta y el directorio del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argv = yargs(hideBin(process.argv))
  .usage("Usage: npm run gs -- <serviceName> [subfolder]")
  .option("help", { alias: "h", describe: "Show help" })
  .help().argv;

if (argv.help) {
  yargs.showHelp();
  process.exit(0);
}

const serviceName = argv._[0];
const subfolderName = argv._[1] || "";

if (!serviceName) {
  console.error("Por favor, proporciona un nombre para el servicio.");
  process.exit(1);
}

function lowerCaseFirstLetter(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

const servicePath = `/${subfolderName}/${serviceName.toLowerCase()}`;
const module = serviceName.toLowerCase();
const serviceContent = `
import axiosInstance from "@/services/axios-instance";
import { handleError } from "@/helpers";
import { dataTransform } from "@/services";
import { BaseService } from "@/services/BaseService";
import { ${serviceName}Model } from "@/models";
import { useToastStore } from "@/stores";

const servicePath = "${servicePath}";
const module = "${module}";

export const ${lowerCaseFirstLetter(serviceName)}Service = {
  async get${serviceName}(${serviceName.toLowerCase()}_id) {
    try {
      const response = await axiosInstance.get(\`\${servicePath}/\${${serviceName.toLowerCase()}_id}/\`);

      if (response && response.data) {
        const data = dataTransform.transformApiData(response.data, ${serviceName}Model);
        return data;
      } else {
        throw new Error(
          "La respuesta de la API no contiene los datos esperados"
        );
      }
    } catch (error) {
      handleError(error, "get_element_error", module);
    }
  },
  async getList${serviceName}(filterParams = null) {
    let filteredFilters = "";
    if (filterParams != null) {
      const {
        search,
        searchBy,
        status,
        order,
        orderBy,
        specific_date,
        end_date,
        start_date,
        interval,
        year_date,
        searches,
        // Otros parámetros de filtro que puedas necesitar
      } = filterParams;

      const filters = {
        orderBy,
        order,
        status,
        search,
        end_date,
        start_date,
        interval,
        specific_date,
        year_date,
        // Otros parámetros de filtro que puedas necesitar
      };

      filteredFilters = Object.entries(filters)
        .filter(
          ([key, value]) =>
            value !== undefined && value !== null && value !== ""
        )
        .map(([key, value]) => \`\${key}=\${encodeURIComponent(value)}\`)
        .join("&");

      if (search && searchBy) {
        const searchByParam = \`searchBy=\${searchBy.join(",")}\`;
        filteredFilters += searchByParam ? \`&\${searchByParam}\` : "";
      }
      if (searches && searches != undefined) {
        searches.forEach((search, index) => {
          if (search.value && search.by) {
            filteredFilters += \`&search\${index + 1}=\${encodeURIComponent(
              search.value
            )}&searchBy\${index + 1}=\${encodeURIComponent(search.by)}\`;
          }
        });
      }
    }

    try {
      const response = await axiosInstance.get(
        \`\${servicePath}/?\${filteredFilters}\`
      );
      const ${serviceName.toLowerCase()} = response.data.map((apiData) =>
        dataTransform.transformApiData(apiData, ${serviceName}Model)
      );
      return ${serviceName.toLowerCase()};
    } catch (error) {
      handleError(error, "get_list_error", module);
    }
  },

  async add${serviceName}(new_data) {
    try {
      const response = await axiosInstance.post(
        \`\${servicePath}/\`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(response.data, ${serviceName}Model);
      return data_new;
    } catch (error) {
      handleError(error, "add_error", module);
    }
  },
  async update${serviceName}(new_data) {
    let dataid = new_data.id.value;
    try {
      const response = await axiosInstance.put(
        \`\${servicePath}/\${dataid}/\`,
        new_data.addData()
      );
      const data_new = dataTransform.transformApiData(response.data, ${serviceName}Model);
      return data_new;
    } catch (error) {
      handleError(error, "edit_error", module);
    }
  },
  async delete${serviceName}(dataid) {
    try {
      const response = await axiosInstance.delete(\`\${servicePath}/\${dataid}/\`);
      const useToast = useToastStore();
      useToast.show("delete_success", {
        important_text: \`\${module} \`,
      });
      return response;
    } catch (error) {
      handleError(error, "delete_error", module);
    }
  },
  async changeStatus${serviceName}(data) {
    const endpoint = \`\${servicePath}/\${data.id.value}/\`;
    return BaseService.changeStatus(endpoint, data);
  },
};
`;

const folderPath = path.join(__dirname, `../src/services/${subfolderName}`);
const filePath = path.join(
  folderPath,
  `${lowerCaseFirstLetter(serviceName)}Service.js`
);

// Crea la carpeta y subcarpetas si no existen
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

fs.writeFileSync(filePath, serviceContent);

console.log(`Se ha creado ${serviceName}Service en ${filePath}`);
