<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();

const currentRoute = computed(() => {
  return router.currentRoute.value.meta;
});

const props = defineProps({
  navigation: {
    default: null,
  },
});
</script>
<template>
  <footer v-if="navigation !== null" class="breadcrumb-container d-flex">
    <div class="d-flex flex-nowrap nav-back">
      <div class="breadcrumb-items-container">
        <nav
          aria-label="breadcrumb"
          class="mb-0 navigation-items breadcrumb-div d-flex"
        >
          <ol class="breadcrumb mb-0 basic-breadcrumb d-flex">
            <li
              v-for="(element, index) in navigation.breadcrumb"
              :key="index"
              class="breadcrumb-item d-flex"
            >
              <span class="d-flex no-wrap">
                <RouterLink
                  :to="{
                    name: element.name,
                    params: element.params,
                  }"
                  class="topbar-link d-flex"
                  v-slot="{ route }"
                >
                  <span>
                    <font-awesome-icon :icon="route.meta.icon" />
                  </span>
                  &nbsp;<span v-if="element.title">
                    {{ element.title }}
                  </span>
                  <span v-else>
                    {{
                      route.meta.title_short
                        ? route.meta.title_short
                        : route.meta.title
                    }}
                  </span>
                </RouterLink>
              </span>
            </li>
            <li class="breadcrumb-item d-flex no-wrap">
              <span aria-current="page" class="d-flex no-wrap">
                <span>
                  <font-awesome-icon :icon="currentRoute.icon" />
                </span>
                &nbsp;
                <span>
                  {{
                    currentRoute.title_short
                      ? currentRoute.title_short
                      : currentRoute.title
                  }}
                </span>
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </footer>
</template>
<style scoped>
.breadcrumb-container {
  height: 100%;
  align-items: center;
}
.nav-back {
  min-width: 0;
}
.breadcrumb-items-container {
  overflow-x: auto;
  min-width: 0;
  font-size: 13px;
  height: 100%;
}
.basic-breadcrumb {
  display: flex !important;
  flex-wrap: nowrap;
}
.navigation-items {
  border-radius: var(--g-br1);
  text-transform: capitalize;
  border: 1px solid var(--g-color-line);
}
.breadcrumb-div {
  padding: 0.25rem 0.7rem 0.25rem 0.7rem;
  width: max-content;
}

.breadcrumb a {
  color: var(--color-b-v3);
  text-decoration-line: none;
}

.breadcrumb-item a {
  text-decoration-line: none;
}

.margin-breadcrumb {
  margin-left: 1.5rem;
}

.breadcrumb .active {
  color: rgba(255, 255, 255, 0.377);
}

.breadcrumb-content {
  transition: 0.3s;
}

.breadcrumb-ol {
  --bs-breadcrumb-divider-color: var(--my-c1);
}
.topbar-link {
  color: var(--color-b-v3) !important;
  transition: 0.2s;
}
.topbar-link:hover {
  color: var(--g-wb900) !important;
}
</style>
