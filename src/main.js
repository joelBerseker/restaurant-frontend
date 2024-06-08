import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { registerComponents } from "@/registerComponents";
import VueApexCharts from "vue3-apexcharts";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, fab, far);

const app = createApp(App);

registerComponents(app);
app.component("font-awesome-icon", FontAwesomeIcon);

const pinia = createPinia();
const customFilter = ({ key }) => {
  return !["user.token", "user.refresh"].includes(key);
};

// Configurar el plugin de persisted state con el filtro personalizado
pinia.use(piniaPluginPersistedstate, {
  filter: customFilter,
});

app.use(VueApexCharts);

app.use(pinia);
app.use(router);

app.mount("#app");
