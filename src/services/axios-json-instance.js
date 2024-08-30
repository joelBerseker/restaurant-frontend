// auto-barrel-ignore

import axios from "axios";
import { authService } from "./authService";
import { useUserStore } from "@/stores/userStore";

axios.defaults.baseURL = import.meta.env.VITE_APP_RUTA_JSON;

const axiosJsonInstance = axios.create();

axiosJsonInstance.interceptors.request.use((config) => {
  const userStore = useUserStore();
  if (userStore.isActive) {
    let authToken = userStore.isLoggedIn;
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

axiosJsonInstance.interceptors.response.use((response) => {
  // Maneja las respuestas exitosas
  const userStore = useUserStore();
  if (userStore.isActive) {
    let authToken = userStore.isLoggedIn;
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return response;
});
export default axiosJsonInstance;
