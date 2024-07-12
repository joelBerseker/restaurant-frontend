<script setup>
import { sleep } from "@/helpers";
import { ref, onMounted, onUnmounted, computed, watch, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const router = useRouter();

const showSidebar = ref(true);
let list = [
  { name: "home" },

  { name: "userManagementList", children: ["userList", "rol", "permise"] },
  {
    name: "productManagementList",
    children: ["productList", "productType", "menuList"],
  },
  { name: "tableManagementList", children: ["table", "reservation"] },

  { name: "ticketList" },

  { name: "test" },
];

const listWithPermises = ref([]);

function getModuleId(name) {
  const resolved = router.resolve({ name: name });
  return resolved.meta.moduleid;
}

function getListWithPermises() {
  let resp = [];
  for (let i = 0; i < list.length; i++) {
    const element = list[i];

    let moduleId = getModuleId(element.name);
    let havePermise = userStore.getPermiseAction(moduleId);
    if (element.children) {
      let respChildren = [];

      for (let j = 0; j < element.children.length; j++) {
        const child = element.children[j];
        let moduleChild = getModuleId(child);

        let havePermiseChild = userStore.getPermiseAction(moduleChild);
        if (havePermiseChild) {
          respChildren.push(child);
        }
      }
      if (havePermise && respChildren.length > 0) {
        resp.push({ name: element.name, children: respChildren });
      }
    } else {
      if (havePermise) {
        resp.push(element);
      }
    }
  }
  listWithPermises.value = resp;
}
function init() {
  getListWithPermises();
}
init();
watch(
  () => userStore.getPermises,
  (_new, _old) => {
    let strNew = JSON.stringify(_new);
    let strOld = JSON.stringify(_old);

    if (strNew !== strOld) {
      getListWithPermises();
    }
  },
  { deep: true }
);

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
async function awaitTransition() {
  transitionSwitch.value = true;
  document.getElementById("system-sidebar").classList.add("transition");

  await sleep(300);
  transitionSwitch.value = false;
  document.getElementById("system-sidebar").classList.remove("transition");
}
const transitionSwitch = ref(false);

async function switchSidebar() {
  if (transitionSwitch.value) return;
  awaitTransition();
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
    <ul class="w-100 sidebar-list-item px-0 custom-scrollbar">
      <li v-for="item in listWithPermises" :key="item.title">
        <div class="d-flex">
          <div class="container-link">
            <RouterLink
              :to="{ name: item.name }"
              v-slot="{ route, navigate, href, isActive, isExactActive }"
              custom
            >
              <div>
                <a
                  :class="[
                    'sidebar-item',
                    isActive ? 'sidebar-item-active' : '',
                    isExactActive ? 'disbled-click' : '',
                    item.children && showSidebar ? 'with-children' : '',
                  ]"
                  @click="navigate"
                  :href="href"
                >
                  <div class="sidebar-item-icon">
                    <font-awesome-icon :icon="route.meta.icon" />
                  </div>
                  <div class="text-sidebar-item">
                    {{
                      route.meta.title_short
                        ? route.meta.title_short
                        : route.meta.title
                    }}
                  </div>
                </a>
                <div
                  v-if="item.children && showSidebar"
                  class="collapse"
                  :id="item.name"
                >
                  <ul
                    :class="[
                      'w-100 sidebar-list-item-child px-0 ',
                      isActive ? 'active' : '',
                    ]"
                  >
                    <li v-for="item2 in item.children" :key="item2.title">
                      <RouterLink
                        :to="{ name: item2 }"
                        class="sidebar-item-children"
                        active-class="sidebar-item-children-active"
                        exact-active-class="disbled-click"
                        v-slot="{ route }"
                      >
                        <i :class="item2.icon"></i>
                        <span
                          v-show="showSidebar"
                          class="text-sidebar-item-child"
                          >{{
                            route.meta.title_short
                              ? route.meta.title_short
                              : route.meta.title
                          }}</span
                        >
                      </RouterLink>
                    </li>
                  </ul>
                </div>
              </div>
            </RouterLink>
            <div class="button-container">
              <div>
                <g-button
                  v-if="item.children && showSidebar"
                  type="transparent-2"
                  icon="fa-solid fa-chevron-down"
                  class="button-colapse collapsed"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#' + item.name"
                />
              </div>
            </div>
          </div>
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
  flex-shrink: 0;
  width: 2rem;
  display: inline-block;
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
/*.text-sidebar-item-child {
}*/
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
  margin-top: 0.35rem;
  margin-right: calc(0.75rem - 1px);
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
  white-space: nowrap;
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
  padding-left: calc(1.75rem + 2rem - 0.35rem) !important;
  padding-top: 0.25rem;
  padding-bottom: 0.75rem;
  transition: 0.3s;
  margin-left: calc(0.35rem);
}
.sidebar-list-item-child.active {
  background-color: #38a55a;
  border-color: var(--color-2);
}

.sidebar-item {
  text-decoration-line: none;
  color: var(--color-w);
  transform: translateX(0px);
  display: inline-block;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;

  transition: 0.3s;
  position: relative;
}
.sidebar-item * {
  font-weight: 500;
}
.sidebar-item::before,
.sidebar-list-item-child::before {
  content: "";
  background-color: var(--color-w);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.sidebar-item::after,
.sidebar-list-item-child::after {
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
.sidebar-item-active::after,
.sidebar-list-item-child.active::after {
  transform: translateX(0.35rem);
  background-color: var(--color-1);
}
.sidebar-item-children {
  text-decoration-line: none;
  color: rgba(255, 255, 255, 0.685);

  transform: translateX(0px);
  display: inline-block;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;

  transition: 0.3s;
  font-size: 13px;
}
.sidebar-item-compressed {
  padding-left: 0rem;
  padding-right: 0rem;
  text-align: center;
}
.sidebar-item-children::after,
.sidebar-item-children::before {
  content: "";
  width: 100%;
  height: 2px;
  border-radius: 999rem;
  position: absolute;
  bottom: 1px;
  left: 0;
  transition: 0.3s;
}
.sidebar-item-children:hover,
.sidebar-item-children-active {
  color: var(--color-w);
}

.sidebar-item-children-active::after {
  background-color: rgb(218, 218, 218);
}

.sidebar-item:hover,
.sidebar-item-active {
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
/*.t-sidebar-item-leave-active {
}*/
.t-sidebar-item-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
.t-sidebar-item-enter-from {
  opacity: 0;
}
</style>
