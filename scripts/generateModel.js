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
import { Model } from "@/models/";

export class ${modelName}Model extends Model {

  ${modelName.toLowerCase()}_name = {
    id: "${modelName.toLowerCase()}_name",
    name: "Nombre",

    value: null,

    validation: {},
    validate: ["length"],
  };
  ${modelName.toLowerCase()}_description = {
    id: "${modelName.toLowerCase()}_description",
    name: "Descripción",
    type: "textarea",

    value: null,
    default: "Sin descripción",

    required: false,
    validation: {},
    validate: ["length"],
  };
  
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
