<script setup></script>
<template>
  <main class="auth-background">
    <div class="auth-background-color">
      <RouterView />
    </div>
  </main>
</template>
<style scoped>
.auth-background {
  background-image: url("@/assets/images/bg-portada.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  height: 100vh;
}
.auth-background-color {
  background-color: #003c62e0;
}
</style>
