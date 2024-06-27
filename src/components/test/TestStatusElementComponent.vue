<script setup>
const props = defineProps({
  status: { default: 0 },
  loading: { default: false },
  icon: { default: "fa-solid fa-plus" },
  text: { default: "Agregar" },
  arrow: { default: true },
  issues: { default: [] },
});
function getClassStatus() {
  if (props.status === 1) {
    return "el-success";
  } else if (props.status === 2) {
    return "el-danger";
  } else {
    return "";
  }
}
</script>
<template>
  <div :class="['status-element', getClassStatus()]">
    <font-awesome-icon :icon="icon" /> {{ text }}
    <div class="status-issues mt-1">
      <div
        v-for="(element, index) in issues"
        :key="index"
        :class="[element.type === 1 ? 'success' : 'danger']"
      >
        <font-awesome-icon
          :icon="
            element.type === 1
              ? 'fa-solid fa-circle-check'
              : 'fa-solid fa-circle-exclamation'
          "
        />
        {{ element.text }}
      </div>
    </div>
    <div v-show="loading" class="loading-cont">
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      >
      </span>
    </div>
  </div>
  <div v-if="arrow" class="status-icon">
    <font-awesome-icon icon="fa-solid fa-arrow-right" />
  </div>
</template>
<style scoped>
.status-issues {
  font-size: 13px !important;
}
.status-issues .danger {
  color: var(--color-d);
}
.status-issues .success {
  color: var(--color-s);
}
.status-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-cont {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.863);
  border-radius: inherit;
}
.status-element {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--br-v2);
  position: relative;
  text-wrap: nowrap;
}

.status-element.el-success {
  color: var(--color-s);
  border-color: var(--color-s);
}
.status-element.el-danger {
  color: var(--color-d);
  border-color: var(--color-d);
}
</style>
