<script setup>
import { ref, inject } from "vue";
import { authService } from "@/services";
import { sleep } from "@/helpers/utilities";
import { useRouter } from "vue-router";
import { useToastStore } from "@/stores";
import { useSystemUtilStore } from "@/stores";

const useSystemUtil = useSystemUtilStore();
const useToast = useToastStore();

const router = useRouter();
const _email = ref("");
const _password = ref("");

const loadingButton = ref(false);

async function login() {
  loadingButton.value = true;
  const credentials = {
    email: _email.value,
    password: _password.value,
  };
  try {
    await authService.obtain_token(credentials);
    useSystemUtil.isLoadingApp(
      true,
      "Ingresando al sistema, espere por favor."
    );
    await sleep(300);
    router.push("/");
  } catch (error) {
    //console.log(error);
    console.log("Restaurant Frontend: Error");
    loadingButton.value = false;
    //useToast.show("login_error");
  }
}
</script>
<template>
  <div class="center">
    <div class="form-container">
      <h5 class="title-text">Iniciar Sesión</h5>
      <p class="mb-5">Bienvenido, ingrese sus datos para acceder al sistema</p>

      <g-input
        v-model="_email"
        label="Correo electrónico"
        labelClass="label-login"
        id="email"
        class="mb-4 input-white"
        :uppercase="false"
      />
      <g-input
        v-model="_password"
        label="Contraseña"
        labelClass="label-login"
        id="password"
        type="password"
        class="margin-b input-white"
        :uppercase="false"
      />
      <div>
        <g-button
          icon="fa-solid fa-right-to-bracket"
          text="Ingresar"
          @click="login"
          :loading="loadingButton"
          iconPosition="right"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.margin-b {
  margin-bottom: 2rem;
}
.title-logo {
  margin-bottom: 2rem;
  color: var(--color-1-v2);
  text-align: center;
}
.title-text {
  margin-bottom: 1rem;
  color: var(--color-1-v2);
}
.form-container {
  width: 100%;
  color: var(--color-w-v2);
}
.button-loggin {
  padding-right: 0.6rem;
}
.center {
  height: 100%;

  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  min-height: 100%;
}
.card-login {
  overflow: hidden;
  background: rgba(44, 44, 44, 1);
  border: none;
  color: white !important;
  /*#41c96b */
}
.auth-icon {
  width: 100%;
  max-width: 200px;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
}
.image-side {
  background-color: #003c6285;
  height: 100%;
  padding: 1rem;
}
.image-bg {
  background-image: url("@/assets/imgs/login.jpg");
  background-position: center;
  background-size: cover;
}
@media screen and (max-width: 767px) {
  .center {
    align-items: start;
  }
}
</style>
