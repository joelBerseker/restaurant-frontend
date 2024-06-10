<script setup>
const props = defineProps({
  src: { default: null },
  imageClass: { default: "g-default-image" },
  imageEmptyClass: { default: null },
});
</script>
<template>
  <div
    :class="[
      'g-image-container',
      src === null && imageEmptyClass !== null ? imageEmptyClass : imageClass,
    ]"
  >
    <slot></slot>

    <div v-if="src === null" class="no-img-wrapper">
      <font-awesome-icon icon="fa-solid fa-image" />
    </div>
    <img v-else :src="src" alt="Imagen" class="g-image" height="20px" />
  </div>
</template>
<style>
.user-img {
  height: 140px;
  display: block;
  aspect-ratio: 1;

  width: auto;

  border-radius: 999rem;
}
.no-img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: 40px;
  color: var(--color-b-v3);
}
.no-img-wrapper > svg {
  height: 40px;
}
.profile-img-min {
  width: 125px;
  height: 125px;
  border-radius: 999rem;
}
.image-modal {
  width: 100% !important;
  height: auto;
  border-radius: var(--br-v2);
}
.image-modal-empty {
  width: 100% !important;
  height: auto;
  aspect-ratio: 2 / 1.3;

  border-radius: var(--br-v2);
}
.article-image {
  width: 190px !important;
  height: 142px;
  border-radius: var(--br-v2);
}
</style>
<style scoped>
.g-default-image {
  width: 150px;
  height: 150px;
  border-radius: var(--br-v2);
}
.g-image-container {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-w-v3);
  background-color: var(--color-w-v3);
}
.g-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
