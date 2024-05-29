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
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-12 col-md-10 col-lg-8 col-xl-7">
          <div class="card card-login">
            <div class="row g-0">
              <div class="col-12 col-sm-5 image-bg">
                <div
                  class="image-side d-flex align-items-center justify-content-center"
                >
                  <!--img
                    src="@/assets/images/logo-mym.png"
                    alt="MyM logo"
                    class="auth-icon"
                  /-->
                </div>
              </div>
              <div class="col-12 col-sm-7">
                <div class="p-3 pt-4 pb-4">
                  <div class="mb-2 title-text">INICIAR SESIÓN</div>

                  <p class="g-wb600">
                    Bienvenido, ingrese sus datos para acceder al sistema
                  </p>
                  <hr class="my-3" />

                  <div class="">
                    <g-input
                      v-model="_email"
                      label="Correo electrónico"
                      labelClass="label-no-color"
                      id="email"
                      class="mb-3"
                      :uppercase="false"
                    />
                    <g-input
                      v-model="_password"
                      label="Contraseña"
                      labelClass="label-no-color"
                      id="password"
                      type="password"
                      class="mb-4"
                      :uppercase="false"
                    />
                    <div>
                      <g-button
                        icon="bi bi-chevron-right"
                        text="Ingresar"
                        @click="login"
                        :loading="loadingButton"
                        iconPosition="right"
                        buttonClass="button-loggin"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-loggin {
  padding-right: 0.6rem;
}
.center {
  height: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  margin: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  min-height: 100%;
  width: 100%;
  width: 100vw;
}
.card-login {
  overflow: hidden;
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
  /*background-image: url("@/assets/images/bg-portada.jpg");*/
  background-position: center;
  background-size: cover;
}
</style>
