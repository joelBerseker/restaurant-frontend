<script setup>
import { ref, inject } from "vue";

import { sleep } from "@/helpers/utilities";

const _email = ref("");
const _password = ref("");

const loadingButton = ref(false);

async function login() {
  console.log(_email.value);
  console.log(_password.value);
}
</script>
<template>
  <div class="center">
    <div class="form-container">
      <h6 class="title-text">Iniciar Sesión</h6>
      <p>Bienvenido, ingrese sus datos para acceder al sistema</p>
      <hr class="my-4" />

      <g-input
        v-model="_email"
        label="Correo electrónico"
        labelClass="label-no-color"
        id="email"
        class="mb-4"
        :uppercase="false"
      />
      <g-input
        v-model="_password"
        label="Contraseña"
        labelClass="label-no-color"
        id="password"
        type="password"
        class="margin-b"
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
  text-transform: uppercase;
  margin-bottom: 1rem;
  color: var(--color-1-v2);
}
.form-container {
  width: 100%;
  color: var(--color-w);
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
  background-image: url("@/assets/images/login.jpg");
  background-position: center;
  background-size: cover;
}
</style>
