<script setup>
import { useSystemUtilStore } from "@/stores";
const useSystemUtil = useSystemUtilStore();
function init() {
  useSystemUtil.isLoadingApp(false);
}
init();
</script>
<template>
  <main class="auth-background">
    <div class="auth-wrapper">
      <div class="auth-separation">
        <div class="auth-img">
          <div class="img-auth">
            <div class="img-auth-wrapper">
              <div>
                <h3 class="text-1">Restaurante</h3>
                <h2 class="text-2">El Placer de Comer</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="auth-form">
          <div class="form-wrapper">
            <div class="form-auth">
              <RouterView />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.auth-wrapper {
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.row-auth {
  height: 100%;
}
.form-auth {
  background-image: url("@/assets/imgs/cutlery.png");
  background-size: auto 50%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position-x: calc(100% + 12%);
  background-position-y: calc(100% + 44%);
  height: 100%;
  padding: 3rem;
}
.form-wrapper {
  height: 100%;
  border-top-left-radius: var(--br-v2);
  background-color: var(--color-2);
}
.text-1 {
  color: var(--color-w);
}
.text-2 {
  color: var(--color-1-v2);
}
.img-auth-wrapper {
  width: 100%;
  height: 100%;
  padding: 4rem;
  display: flex;
  align-items: center;
}
.img-auth {
  width: 100%;
  height: 100%;
}

.auth-background {
  height: 100vh;
  width: 100vw;

  background: var(--color-2);

  background-image: url("@/assets/imgs/login2.jpg");

  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
}

.auth-separation {
  display: flex;
  height: 100%;
}
.auth-img {
  width: 65%;
  height: 100%;
}
.auth-form {
  width: 35%;
  height: 100%;
}

@media screen and (max-width: 1199px) {
  .auth-img {
    width: 55%;
    height: 100%;
  }
  .auth-form {
    width: 45%;
    height: 100%;
  }
}
@media screen and (max-width: 991px) {
  .auth-img {
    width: 50%;
    height: 100%;
  }
  .auth-form {
    width: 50%;
    height: 100%;
  }
}
@media screen and (max-width: 767px) {
  .form-wrapper {
    border-top-right-radius: var(--br-v2);
  }
  .auth-separation {
    display: flex;
    height: 100%;
    flex-direction: column;
  }

  .auth-img {
    width: 100%;
    height: auto;
  }
  .auth-form {
    width: 100%;
    height: 100%;
  }
  .img-auth-wrapper {
    padding: 3rem 2rem;
  }
  .form-auth {
    padding: 3rem 2rem;
  }
  .img-auth {
    height: auto;
  }
  .row-auth {
    height: auto;
  }
}
@media screen and (max-width: 575px) {
  .img-auth-wrapper {
    padding: 3rem 1rem;
  }
  .form-auth {
    padding: 2rem 1rem;
  }
}
</style>
