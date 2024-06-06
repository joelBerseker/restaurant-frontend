<script setup>
import { Toast } from "bootstrap";
import { ref, reactive, watch, onUpdated } from "vue";
import { toastText } from "@/helpers/constants/toastText";
import { storeToRefs } from "pinia";

import { useToastStore } from "@/stores/systemStore";
const useToast = useToastStore();

const listToast = ref([]);

const maxToast = ref(4);

const { count } = storeToRefs(useToast);

watch(count, (newValue, oldValue) => {
  show(useToast.text, useToast.aditional);
});
const toastType = reactive([
  {
    title: null,
    icon: null,
    toastClass: null,
  },
  {
    title: "Operación exitosa",
    icon: "fa-solid fa-circle-check",

    toastClass: "toast-success",
  },
  {
    title: "Ocurrió un error",
    icon: "fa-solid fa-circle-exclamation",

    toastClass: "toast-danger",
  },
]);
const toastListRef = ref([]);
const countToast = ref(0);

function show(_text, _additional = null) {
  let type = toastText[_text].type;

  console.log(_additional);

  let _toast = {
    id: countToast.value,
    prevText: toastText[_text].prevText,
    nextText: toastText[_text].nextText,
    defaultText: toastText[_text].defaultText,

    icon: toastType[type].icon,
    toastClass: toastType[type].toastClass,
    title: toastType[type].title,
    listError: [],
    importantText: null,
    error: null,
  };
  if (_additional !== null) {
    if (_additional.list_error) _toast.listError = _additional.list_error;
    _toast.importantText = _additional.important_text;

    _toast.error = _additional.error;
  }
  countToast.value++;
  if (listToast.value.length >= maxToast.value) {
    listToast.value.pop();
  }
  if (!hover.value) {
    reiniciarTimeout();
  }
  listToast.value.unshift(_toast);
}

const hover = ref(false);
const timeoutID = ref(null);

const miFuncion = () => {
  listToast.value.pop();
  if (!hover.value && listToast.value.length > 0) {
    reiniciarTimeout();
  }
};

const iniciarTimeout = () => {
  if (listToast.value.length > 0) {
  }

  timeoutID.value = setTimeout(miFuncion, 5000); // 5000 milisegundos = 5 segundos
};

const detenerTimeout = () => {
  clearTimeout(timeoutID.value);
};
function onHover() {
  hover.value = true;
  detenerTimeout();
}
function onLeave() {
  hover.value = false;
  iniciarTimeout();
}
const reiniciarTimeout = () => {
  clearTimeout(timeoutID.value);
  iniciarTimeout();
};
function deleteToast(index) {
  listToast.value.splice(index, 1);
}
</script>
<template>
  <div
    class="toast-container position-fixed top-0 end-0 m-3"
    style="z-index: 10000"
    @mouseenter="onHover"
    @mouseleave="onLeave"
  >
    <TransitionGroup name="list">
      <div
        v-for="(toast, index) in listToast"
        :key="toast.id"
        :id="toast.id"
        ref="toastListRef"
        class="toast show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-autohide="false"
      >
        <div
          class="content-toast"
          :key="index"
          :class="[
            index === listToast.length - 1 ? 'animation ' + index : '',
            toast.toastClass,
          ]"
        >
          <div class="row g-0">
            <div class="col-3 icon-container">
              <font-awesome-icon :icon="toast.icon" />
            </div>
            <div class="col-9">
              <div class="body-toast">
                <div class="title-container mb-2">
                  <div class="title-toast">{{ toast.title }}</div>

                  <div>
                    <g-button-x-min
                      title="Cerrar"
                      class="button-close"
                      @click="deleteToast(index)"
                    />
                  </div>
                </div>

                <div class="text-toast">
                  <div>
                    <span>{{ toast.prevText }}</span>
                    <span class="important-text">{{
                      toast.importantText
                    }}</span>
                    <span>{{ toast.nextText }}</span>

                    <span v-if="toast.listError.length > 0"
                      >, posibles errores:
                    </span>
                    <span v-else>{{ toast.defaultText }}</span>
                  </div>
                  <div>
                    <span class="important-text">{{ toast.error }}</span>
                  </div>
                  <div v-show="toast.listError.length > 0">
                    <ul class="list-errors">
                      <li
                        v-for="(element, index) in toast.listError"
                        :key="index"
                      >
                        {{ element }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.important-text {
  font-weight: 600;
}

.list-errors {
  margin: 0;
}
.toast:hover .content-toast::before {
}
.stop-animation {
  animation: none !important;
}
.body-toast {
  padding: 1rem;
  padding-right: 1rem;

  padding-left: 0;
}
.text-toast {
  color: var(--g-wb600);
  font-size: 13px;
}
.title-toast {
  font-weight: 500;
  text-transform: uppercase;
  font-size: 13px;
  display: flex;
  align-items: center;
}
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
}
.toast {
  border: none;
  overflow: hidden;
  background-color: var(--color-w);
  color: var(--color-b);
}
.content-toast {
  border-left: 5px solid var(--color-b);
  position: relative;
  padding-bottom: 3px;
}

.content-toast::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  bottom: 0;
  right: 0;
  background-color: blue;
}
.toast.show .content-toast.animation::before {
  animation: progress 5s linear forwards;
}
.toast-container:hover .content-toast.animation::before {
  animation: none !important;
}
.button-close {
  background-color: transparent !important;
}
@keyframes progress {
  100% {
    right: 100%;
  }
}
/*DANGER*/
.toast-danger.content-toast::before {
  background-color: var(--color-d);
}
.toast-danger .icon-container,
.toast-danger .title-toast {
  color: var(--color-d);
}
.toast-danger.content-toast {
  border-color: var(--color-d) !important;
}
.toast-danger .button-close:hover {
  background-color: var(--color-d) !important;
  color: var(--color-w) !important;
}
.toast-danger .button-close {
  color: var(--color-d);
}
/*SUCCESS*/

.toast-success.content-toast::before {
  background-color: var(--color-s);
}
.toast-success .icon-container,
.toast-success .title-toast {
  color: var(--color-s);
}

.toast-success.content-toast {
  border-color: var(--color-s) !important;
}

.toast-success .button-close:hover {
  background-color: var(--color-s) !important;
  color: var(--color-w) !important;
}
.toast-success .button-close {
  color: var(--color-s);
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.3s ease;
}
.list-leave-active {
  position: absolute;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
