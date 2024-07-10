import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "production"
      ? "./" // Establece el valor de BASE_URL en producción
      : "/",
  plugins: [vue(), VueDevTools()],
  build: {
    sourcemap: true, // Habilita la generación de source maps en producción
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
