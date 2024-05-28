import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

// Obtener la ruta y el directorio del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argv = yargs(hideBin(process.argv))
  .usage("Usage: npm run gm -- <modelName> [subfolder]")
  .option("help", { alias: "h", describe: "Show help" })
  .help().argv;

if (argv.help) {
  yargs.showHelp();
  process.exit(0);
}

const modelName = argv._[0];
const subfolderName = argv._[1] || "";

if (!modelName) {
  console.error("Por favor, proporciona un nombre para el modelo.");
  process.exit(1);
}

const modelContent = `
import { validations } from "@/helpers/validations";
import { isEmpty } from "@/helpers/Utilities";
import { Model } from "@/models/";

export class ${modelName}Model extends Model {
  id = {
    value: null,
  };
  ${modelName.toLowerCase()}_name = {
    value: null,
    validation: {},
    validate() {
      this.validation = validations.text(this.value, 3, 25);
    },
  };
  ${modelName.toLowerCase()}_description = {
    value: null,
    validation: {},
    validate() {
      this.validation = validations.text(this.value, 3, 100, false);
    },
    default: "Sin descripción",
  };
  addData() {
    return {
      ${modelName.toLowerCase()}_name: this.${modelName.toLowerCase()}_name.value,
      ${modelName.toLowerCase()}_description: isEmpty(this.${modelName.toLowerCase()}_description.value)
        ? this.${modelName.toLowerCase()}_description.default
        : this.${modelName.toLowerCase()}_description.value,
    };
  }
  getData() {
    return {
      id: this.id.value,
      name: this.${modelName.toLowerCase()}_name.value,
      description: this.${modelName.toLowerCase()}_description.value,
      status: this.status.value,
    };
  }
  getDataOptions() {
    return {
      value: this.id.value,
      text: this.${modelName.toLowerCase()}_name.value,
    };
  }
}
`;

const folderPath = path.join(__dirname, `../src/models/${subfolderName}`);
const filePath = path.join(folderPath, `${modelName}Model.js`);

// Crea la carpeta y subcarpetas si no existen
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

fs.writeFileSync(filePath, modelContent);

console.log(`Se ha creado ${modelName}Model.js en ${filePath}`);
