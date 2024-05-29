<script setup>
import { Toast } from "bootstrap";
import { ref, reactive, watch } from "vue";
import { toastText } from "@/helpers/constants/toastText";
import { storeToRefs } from "pinia";

import { useToastStore } from "@/stores/systemStore";
const useToast = useToastStore();

const text = ref(null);
const icon = ref("fa-solid fa-circle-check");
const title = ref(null);
const toastClass = ref(null);
const list = ref([]);
const aditional = ref(null);

const { count } = storeToRefs(useToast);

watch(count, (newValue, oldValue) => {
  show(useToast.text, useToast.aditional, useToast.list);
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

function show(_text, _additional = null, _list = []) {
  let type = toastText[_text].type;

  text.value = toastText[_text].text;
  icon.value = toastType[type].icon;
  toastClass.value = toastType[type].toastClass;
  title.value = toastType[type].title;

  list.value = _list;
  aditional.value = _additional;

  var myToastEl = document.getElementById("myToastEl");
  myToastEl.classList.remove("show");
  var myToast = Toast.getOrCreateInstance(myToastEl);
  myToast.show();
}
</script>
<template>
  <div
    class="position-fixed top-0 end-0 m-3"
    style="z-index: 10000"
    :class="[toastClass]"
  >
    <div
      id="myToastEl"
      class="toast hide"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="content-toast">
        <div class="row g-0">
          <div class="col-3 icon-container">
            <font-awesome-icon :icon="icon" />
          </div>
          <div class="col-9">
            <div class="body-toast">
              <div class="title-container mb-2">
                <div class="title-toast">{{ title }}</div>

                <div>
                  <g-button-x-min
                    title="Cerrar"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                    class="button-close"
                  />
                </div>
              </div>

              <div class="text-toast">
                <div>
                  {{ text }}
                </div>
                <div v-show="aditional !== null">
                  {{ aditional }}
                </div>
                <div v-show="list.length > 0">
                  <ul class="list-errors">
                    <li v-for="(element, index) in list" :key="index">
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
  </div>
</template>

<style scoped>
.list-errors {
  margin: 0;
}
.toast:hover .content-toast::before {
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
.toast.show .content-toast::before {
  animation: progress 5s linear forwards;
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
.toast-danger .content-toast::before {
  background-color: var(--color-d);
}
.toast-danger .icon-container,
.toast-danger .title-toast {
  color: var(--color-d);
}
.toast-danger .content-toast {
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

.toast-success .content-toast::before {
  background-color: var(--color-s);
}
.toast-success .icon-container,
.toast-success .title-toast {
  color: var(--color-s);
}

.toast-success .content-toast {
  border-color: var(--color-s) !important;
}

.toast-success .button-close:hover {
  background-color: var(--color-s) !important;
  color: var(--color-w) !important;
}
.toast-success .button-close {
  color: var(--color-s);
}
</style>
