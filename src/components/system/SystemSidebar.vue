<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showSidebar = ref(true);
let list = [
  "home",
  "userList",
  "table",
  "rol",
  "productList",
  "productType",
  "ticketList",
];

async function getPermise(module_id) {
  let status = await permissionsService.getPermises(
    module_id,
    Permission_data.View
  );
  return status;
}

function closeSidebar() {
  let _sidebar = document.getElementById("system-sidebar");
  if (_sidebar !== null) _sidebar.classList.remove("open");

  let _main = document.getElementById("system-main");
  if (_main !== null) _main.classList.remove("open-sidebar");

  document.body.classList.remove("body-cover");

  showSidebar.value = false;
}
function openSidebar() {
  document.getElementById("system-sidebar").classList.add("open");
  document.getElementById("system-main").classList.add("open-sidebar");

  if (windowWidth.value <= 1199) document.body.classList.add("body-cover");
  else document.body.classList.remove("body-cover");

  showSidebar.value = true;
}
function switchSidebar() {
  if (showSidebar.value) {
    closeSidebar();
  } else {
    openSidebar();
  }
}
const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);
const handleResize = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
  statusSideBarAcordingSize();
};
function statusSideBarAcordingSize() {
  if (windowWidth.value <= 1199) {
    if (showSidebar.value) {
      closeSidebar();
    }
  } else {
    if (!showSidebar.value) {
      openSidebar();
    }
  }
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
  statusSideBarAcordingSize();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

defineExpose({
  switchSidebar,
  closeSidebar,
});
</script>
<template>
  <nav class="sidebar">
    <header
      class="mt-4 d-flex flex-column align-items-center sidebar-icon-container"
    >
      <transition name="t-sidebar-item" mode="out-in">
        <div v-if="showSidebar">
          <div class="normal-img-container">
            <img
              src="@/assets/imgs/logo-app.jpg"
              alt="app logo"
              class="sidebar-icon"
            />
          </div>
          <p class="text-center mt-1 text-img">Restapp</p>
        </div>

        <img
          v-else
          src="@/assets/imgs/logo-app.jpg"
          alt="app logo"
          class="sidebar-icon-min"
        />
      </transition>
    </header>
    <ul class="w-100 sidebar-list-item px-0">
      <li v-for="item in list" :key="item.title">
        <div class="d-flex">
          <div class="container-link">
            <RouterLink
              :to="{ name: item }"
              class="sidebar-item"
              active-class="sidebar-item-active"
              exact-active-class="disbled-click"
              v-slot="{ route }"
            >
              <span class="sidebar-item-icon">
                <font-awesome-icon :icon="route.meta.icon" />
              </span>
              <span class="text-sidebar-item">
                {{
                  route.meta.title_short
                    ? route.meta.title_short
                    : route.meta.title
                }}
              </span>
            </RouterLink>
            <div class="button-container">
              <div>
                <g-button
                  v-if="item.children != undefined && showSidebar"
                  type="transparent"
                  textColor="light"
                  icon="bi bi-chevron-left"
                  class="button-colapse collapsed"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#' + item.title"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="item.children != undefined && showSidebar"
          class="collapse"
          :id="item.title"
        >
          <ul class="w-100 sidebar-list-item-child px-0">
            <li v-for="item2 in item.children" :key="item2.title">
              <RouterLink
                :to="{ name: item2.name }"
                class="w-100 sidebar-item-children m-0 mb-1"
                active-class="sidebar-item-active"
                exact-active-class="disbled-click"
              >
                <i :class="item2.icon"></i>
                <span v-show="showSidebar" class="text-sidebar-item-child">{{
                  item2.title
                }}</span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <transition name="t-sidebar-item" mode="out-in">
      <footer v-show="showSidebar" class="sidebar-footer">
        Desarrollado por Gleaming Grove
      </footer>
    </transition>
  </nav>
</template>
<style scoped>
.sidebar-item-icon {
  width: 2rem;
}
.normal-img-container {
  display: flex;

  justify-content: center;
}
.text-img {
  color: var(--color-w-v2);
}
.line-sidebar {
  border-color: rgba(255, 255, 255, 0.4);
  margin-left: calc(1rem - 0.25rem);
  margin-right: calc(1rem - 0.25rem);
}
.text-sidebar-item-child {
  margin-left: 0.8rem;
}
.container-link {
  width: 100%;
  position: relative;
}

.button-container {
  position: absolute;
  display: flex;
  align-items: center;
  right: 0;
  top: 0;
  height: 100%;
  margin-right: calc(0.25rem - 1px);
}
.sidebar {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sidebar-icon-container {
  height: 90px;
}
.sidebar-icon {
  max-width: 60px;
  border-radius: 1.5rem;
}
.sidebar-icon-min {
  max-width: 38px;
  margin-top: 1rem;
  border-radius: 999rem;
}
.sidebar-footer {
  font-size: 0.6rem;
  position: absolute;
  color: var(--color-w-v2);
  bottom: 0.1rem;
  right: 0.35rem;
  overflow: hidden;
  text-wrap: nowrap;
}
.sidebar-list-item {
  margin-top: 2rem;
  list-style-type: none;
  overflow-x: hidden;
  overflow-y: auto;
  margin-bottom: 3.2rem;
}

.sidebar-list-item-child {
  list-style-type: none;
  padding-left: 0.9rem !important;
}
.sidebar-item {
  text-decoration-line: none;
  color: var(--color-w-v2);
  transform: translateX(0px);
  display: inline-block;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;

  transition: 0.3s;
  position: relative;
}
.sidebar-item::before {
  content: "";
  background-color: var(--color-w);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.sidebar-item::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: 0.3s;
  background-color: var(--color-2);
}
.sidebar-item:hover::after {
  background-color: var(--color-1);
}
.sidebar-item-active::after {
  transform: translateX(0.35rem);
  background-color: var(--color-1);
}
.sidebar-item-children {
  text-decoration-line: none;
  color: var(--g-wb100);
  border-radius: var(--g-br1);
  transform: translateX(0px);
  display: inline-block;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: 0.4s;
  font-size: 13px;
}
.sidebar-item-compressed {
  padding-left: 0rem;
  padding-right: 0rem;
  text-align: center;
}
.sidebar-item:hover,
.sidebar-item-active,
.sidebar-item-children:hover {
  background-color: var(--color-1);
}
.sidebar-item-children:focus-visible,
.sidebar-item:focus-visible {
  background-color: var(--color-1);
  outline: none;
}

/*TRANSITION */
.t-sidebar-item-enter-active,
.t-sidebar-item-enter {
  transition: all 0.4s ease;
}
.t-sidebar-item-leave-active {
}
.t-sidebar-item-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
.t-sidebar-item-enter-from {
  opacity: 0;
}
.disbled-click {
  pointer-events: none;
  cursor: default;
}
</style>
