<script setup>
const props = defineProps({
  src: { default: null },
  imageClass: { default: "g-default-image" },
  imageEmptyClass: { default: null },
  iconEmpty: { default: "fa-solid fa-image" },
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
      <font-awesome-icon :icon="iconEmpty" />
    </div>
    <img v-else :src="src" alt="Imagen" class="g-image" height="20px" />
  </div>
</template>
<style>
.type-product-img {
  height: 140px;
  display: block;
  aspect-ratio: 1;

  width: auto;

  border-radius: var(--br);
}

.user-img {
  height: 140px;
  display: block;
  aspect-ratio: 1;

  width: auto;

  border-radius: 999rem;
}
.user-img.g-image-container {
  background-color: var(--color-c2);
}
.user-emp-img {
  width: 100%;
  max-width: 200px;
  display: block;
  aspect-ratio: 2/1.5;

  border-radius: var(--br);
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-emp-img .g-image {
  object-fit: fill !important;

  width: auto !important;
  height: 80% !important;
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
  height: 32px;
}
.profile-img-min {
  width: 125px;
  height: 125px;
  border-radius: 999rem;
}
.image-modal {
  width: 100% !important;
  height: auto;
  border-radius: var(--br);
}
.image-modal-empty {
  width: 100% !important;
  height: auto;
  aspect-ratio: 2 / 1.3;

  border-radius: var(--br);
}
.article-image {
  width: 190px !important;
  height: 142px;
  border-radius: var(--br);
}
</style>
<style scoped>
.g-default-image {
  width: 150px;
  height: 150px;
  border-radius: var(--br);
}
.g-image-container {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border);
}
.g-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
