<script setup>
const emit = defineEmits(["closeSidebar"]);
function closeSidebar() {
  emit("closeSidebar");
}
</script>
<template>
  <main class="system">
    <aside id="system-sidebar" class="open">
      <slot name="sidebar"></slot>
    </aside>
    <main id="system-main" class="open-sidebar">
      <div class="cover-system-main" @click="closeSidebar"></div>
      <header id="system-topbar">
        <slot name="topbar"></slot>
      </header>
      <main id="system-content">
        <slot name="content"></slot>
      </main>
    </main>
  </main>
</template>
<style>
#system-main {
  overflow: auto;
  scrollbar-gutter: stable;
}
#system-main::-webkit-scrollbar {
  width: 10px; /* Cambiar el ancho de la barra de desplazamiento */
}
#system-main::-webkit-scrollbar-thumb {
  border-radius: 99rem;
  background: rgb(190, 190, 190);
}
#system-content {
  height: 100%;
}
#system-main.open-sidebar {
  margin-left: 240px !important;
}
#system-sidebar.open {
  width: 240px !important;
}
.cover-system-main {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 4400;
  display: none;
}
.sidebar-item {
  display: flex !important;
}
.sidebar-item {
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
}
#system-sidebar.open .sidebar-item {
  padding-left: 1.75rem !important;
  padding-right: 1.75rem !important;
}

#system-sidebar .text-sidebar-item {
  opacity: 0;
  transition: 0s;
  width: 0px;
  height: 0px;
  display: inline-block;
}
#system-sidebar.open .text-sidebar-item {
  transition: opacity 0.3s ease;
  opacity: 1;
  width: auto;
  height: auto;
  transition-delay: 0.15s;
}
.text-sidebar-item {
  text-wrap: nowrap;
}
@media screen and (max-width: 1199px) {
  #system-main.open-sidebar {
    margin-left: 60px !important;
  }
  #system-main.open-sidebar .cover-system-main {
    display: block;
  }
}
@media screen and (max-width: 767px) {
  #system-main.open-sidebar,
  #system-main {
    margin-left: 0px !important;
  }
  #system-sidebar {
    width: 0px !important;
  }
}
</style>
<style scoped>
.system {
  background-color: var(--color-c3);
}
#system-sidebar {
  overflow: hidden;
  height: 100%;
  width: 60px;
  position: fixed;
  z-index: 4500;
  top: 0;
  left: 0;
  background-color: var(--color-2);
  transition: width 0.3s;
  border-top-right-radius: var(--br-v2);
}
#system-main {
  transition: margin-left 0.3s;
  margin-left: 60px;

  height: 100vh;

  background-size: cover;

  position: relative;

  display: flex;
  flex-direction: column;
}
</style>
