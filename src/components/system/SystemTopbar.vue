<script setup>
import { inject, computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import SystemBreadcrumb from "@/components/system/SystemBreadcrumb.vue";
import { useRoute } from "vue-router";
const userStore = useUserStore();

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
const currentUser = computed(() => {
  return userStore.getUser;
});

const showCompany = computed(() => {
  let havePermise = userStore.getPermiseAction(2);

  return havePermise;
});

const isProfile = computed(() => {
  if (route.path === "/profile") return true;
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
            :to="{ name: 'notification' }"
            class="topbar-item d-flex align-items-center h-100 big-icon notifys"
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
              currentUser.photo !== null ? 'with-image' : '',
            ]"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div class="user-container">
              <div class="square-div">
                <img
                  v-if="currentUser.photo !== null"
                  :src="currentUser.photo"
                  alt="Foto de perfil"
                  class="profile-photo"
                />
                <div v-else class="img-user">
                  <font-awesome-icon icon="fa-solid fa-user" />
                </div>

                <div class="cover-image"></div>
              </div>
              <div class="ms-2 info-user">
                <div class="user-name">
                  {{ currentUser.name }}
                </div>
                <div class="aditional-text">{{ currentUser.rol_name }}</div>
              </div>
            </div>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <RouterLink
                :to="{ name: 'userProfile' }"
                class="dropdown-item"
                active-class="active-dropdown-item"
                exact-active-class="disbled-click"
              >
                <span class="icon-option"
                  ><font-awesome-icon icon="fa-solid fa-address-card" /></span
                >Mi perfil
              </RouterLink>
            </li>
            <li v-if="showCompany">
              <RouterLink
                :to="{ name: 'company' }"
                class="dropdown-item"
                active-class="active-dropdown-item"
                exact-active-class="disbled-click"
              >
                <span class="icon-option"
                  ><font-awesome-icon icon="fa-solid fa-building-user" /></span
                >Mi empresa
              </RouterLink>
            </li>
            <li @click="buttonLogout()">
              <button class="dropdown-item">
                <span class="icon-option"
                  ><font-awesome-icon icon="fa-solid fa-door-open" /></span
                >Cerrar sesión
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
  .info-user {
    display: none;
  }
}
.active-dropdown-item {
  color: var(--color-1-v3);
}
.icon-option {
  display: inline-block;
  width: 1.4rem;
}
.notifys:hover {
  box-shadow: inset 0px 0px 0px 200px rgba(51, 51, 51, 0.2);
}
.user-name {
  font-weight: 500;
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
  background-color: var(--color-2);
  transition: 0.3s;
}

.btn-user {
  font-size: 13px;
  transition: 0.3s;
  padding: 0.25rem 0.5rem;

  overflow: hidden;
  border-radius: var(--br-v3);
  line-height: 1.3;
  text-align: left;
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
  color: var(--color-1-v3) !important;
}
.active-text .img-user {
  background-color: var(--color-1-v3) !important;
}
.active-text .profile-photo {
  border-color: var(--color-1-v3) !important;
}
.active-text:hover,
.active-text:focus-visible,
.active-text:active,
.active-text.show {
  color: var(--color-1-v3) !important;
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
  border: 1px solid var(--color-2);
  border-radius: 999rem;
}
.square-div {
  width: 30px;
  height: 30px;
  position: relative;

  border-radius: 999rem;
  overflow: hidden;
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
  color: var(--color-b-v2);
  border-radius: var(--br-v3);

  display: inline-block;
  padding-top: calc(1px + 0.25rem);
  padding-bottom: calc(1px + 0.25rem);
  padding-left: calc(1px + 0.75rem);
  padding-right: calc(1px + 0.75rem);
  transition: 0.4s;
}

.topbar-item-active {
  color: var(--color-1-v3);
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
  padding-left: calc(var(--py-1) - 0.32rem);
  padding-right: calc(var(--py-1) - 0.5rem);
  padding-top: calc(1rem - 0.25rem);
  padding-bottom: calc(1rem - 0.25rem);
}

.active {
  color: rgba(255, 255, 255, 0.377) !important;
}
</style>
