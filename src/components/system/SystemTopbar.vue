<script setup>
import { inject, computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import SystemBreadcrumb from "@/components/system/SystemBreadcrumb.vue";
import { useRoute } from "vue-router";

const props = defineProps({
  topbar: {
    default: null,
  },
});
const switchSidebar = inject("switchSidebar");
const confirmLogout = inject("confirmLogout");

const router = useRouter();
const route = useRoute();

function buttonLogout() {
  confirmLogout();
}
function buttonBack() {
  if (props.topbar.breadcrumb.length > 0) {
    let lastDir = props.topbar.breadcrumb[props.topbar.breadcrumb.length - 1];
    router.push({
      name: lastDir.name,
      params: lastDir.params,
    });
  }
}
const userName = computed(() => {
  var user = useUserStore();
  var resp = user.dataProfile().name;
  console.log(user.dataProfile());
  return resp;
});
const userImage = computed(() => {
  var user = useUserStore();
  var resp = user.dataProfile().photo;
  return resp;
});
const isProfile = computed(() => {
  if (route.path === "/perfil") return true;
  return false;
});
defineExpose({
  buttonBack,
});
</script>
<template>
  <main class="content">
    <header class="d-flex justify-content-between g-wb900">
      <div class="d-flex title-container">
        <div class="button-container">
          <g-button
            @click="switchSidebar()"
            type="transparent-1"
            icon="fa-solid fa-bars"
            title="Abrir / Cerrar barra lateral"
            class="big-icon"
          />
        </div>

        <div class="topbar-title-text ms-1 me-g">
          <SystemBreadcrumb :navigation="topbar"></SystemBreadcrumb>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <div>
          <RouterLink
            to="#"
            class="topbar-item d-flex align-items-center h-100 big-icon"
            active-class="topbar-item-active"
            exact-active-class="disbled-click"
            title="Notificaciones"
          >
            <font-awesome-icon class="icon" icon="fa-solid fa-bell" />
          </RouterLink>
        </div>
        <div>
          <button
            type="button"
            :class="[
              'btn btn-user no-wrap',
              isProfile ? 'active-text' : '',
              userImage !== null ? 'with-image' : '',
            ]"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div class="user-container">
              <div class="square-div">
                <img
                  v-if="userImage !== null"
                  :src="userImage"
                  alt="Foto de perfil"
                  class="profile-photo"
                />
                <div v-else class="img-user">
                  <font-awesome-icon icon="fa-solid fa-user" />
                </div>

                <div class="cover-image"></div>
              </div>
              <div class="ms-2">
                <div>
                  {{ userName }}
                </div>
                <div class="aditional-text">Administrador</div>
              </div>
            </div>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <RouterLink
                to="#"
                class="dropdown-item"
                exact-active-class="disbled-click"
              >
                <i class="bi bi-person-fill"></i> Ver perfil
              </RouterLink>
            </li>
            <li @click="buttonLogout()">
              <button class="dropdown-item">
                <i class="bi bi-power"></i> Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  </main>
</template>
<style scoped>
@media screen and (max-width: 767px) {
  .text-user-button {
    display: none;
  }
}
.button-container {
  display: flex;
  align-items: center;
}
.aditional-text {
  color: var(--color-b-v3);
}
.user-container {
  display: flex;
  align-items: center;
}
.img-user {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: var(--color-w);
}

.btn-user {
  font-size: 13px;
  transition: 0.3s;
  padding-top: 0;
  padding-bottom: 0;

  overflow: hidden;
  border-radius: 0;
  line-height: 1.3;
}
.btn-user:hover,
.btn-user:focus-visible,
.btn-user:active,
.btn-user.show {
}
.with-image:hover .cover-image,
.with-image:focus-visible .cover-image,
.with-image:active .cover-image,
.with-image.show .cover-image {
  box-shadow: inset 0px 0px 0px 200px rgba(0, 0, 0, 0.2);
}
.cover-image {
  transition: 0.3s;
}

.active-text {
  background-color: var(--g-sc500) !important;
  border-color: var(--g-sc500) !important;

  color: var(--g-wb100) !important;
}
.active-text:hover,
.active-text:focus-visible,
.active-text:active,
.active-text.show {
  border-color: #c23153 !important;
}

.cover-image {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  transition: 0.3s;
}
.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.square-div {
  width: 30px;
  height: 30px;
  position: relative;
  background-color: var(--color-2);
  border-radius: 999rem;
}

.user-togle {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
.title-container {
  min-width: 2.25rem;
}
.topbar-title-text {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  min-width: 0;
  text-overflow: ellipsis;
  color: var(--g-wb800);
}
.item-user {
  padding-left: 0.7rem !important;
  padding-right: 0.7rem !important;
  padding-right: calc(1.5rem + 2px) !important;
}
.topbar-title {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  text-transform: uppercase;
  font-size: 16px;
  min-width: 0;
}
.topbar-item {
  text-decoration-line: none;
  color: var(--g-wb900);
  border-radius: var(--g-br1);
  display: inline-block;
  padding-top: calc(1px + 0.25rem);
  padding-bottom: calc(1px + 0.25rem);
  padding-left: calc(1px + 0.75rem);
  padding-right: calc(1px + 0.75rem);
  transition: 0.4s;
  background-color: rgba(0, 0, 0, 0.08);
}
.topbar-item:hover,
.topbar-item-active {
  background-color: var(--g-sc500);
  color: var(--g-wb100);
}
.topbar-item:focus-visible {
  background-color: var(--g-sc500);
  color: var(--g-wb100);
  outline: none;
}

.slide-fade-enter-active,
.slide-fade-enter {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.slide-fade-enter-from {
  transform: translateX(-10px);
  opacity: 0;
}

.content {
  transition: 0.5s;
  padding-left: var(--p-1);
  padding-right: var(--p-1);
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.active {
  color: rgba(255, 255, 255, 0.377) !important;
}
</style>
