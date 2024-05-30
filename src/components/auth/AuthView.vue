<script setup></script>
<template>
  <main class="auth-background">
    <div class="row g-0 row-auth">
      <div class="col-12 col-md-6 col-lg-7 col-xl-8">
        <div class="img-auth">
          <div class="img-auth-wrapper">
            <div>
              <h3 class="text-1">Restaurante</h3>
              <h2 class="text-2">El Placer de Comer</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-5 col-xl-4">
        <div class="form-auth">
          <RouterView />
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.row-auth {
  height: 100%;
}
.form-auth {
  padding: 3rem;
  height: 100%;
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
  background: rgba(0, 0, 0, 0.4);
  padding: 4rem;
  display: flex;
  align-items: center;
}
.img-auth {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/imgs/login2.jpg");

  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
}

.auth-background {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: var(--color-2);
}
@media screen and (max-width: 1199px) {
}
@media screen and (max-width: 991px) {
  :root {
    --padding-header: 2.5rem;
  }
}
@media screen and (max-width: 767px) {
  .img-auth-wrapper {
    padding: 3rem 2rem;
  }
  .form-auth {
    padding: 2rem 2rem;
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
