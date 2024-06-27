<script setup>
import { UserModel } from "@/models";
import { userService, rolService } from "@/services";
import { ref, onMounted, inject } from "vue";
const emit = defineEmits(["onFirstLoad"]);

const props = defineProps({
  disabled: { default: false },
  mode: { default: null },
});
const idElement = inject("idElement", null);
const formRef = ref(null);

/*CONSULTS*/
async function getElement(_id) {
  let resp = await userService.getUser(_id);
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function addElement() {
  let resp = await userService.addUser(formRef.value.getElement());
  return resp;
}
async function editElement() {
  let resp = await userService.updateUser(formRef.value.getElement());
  if (resp) formRef.value.copy(resp);
  return resp;
}
async function deleteElement() {
  let resp = await userService.deleteUser(formRef.value.getElement().id.value);
  return resp;
}
async function editStatusElement() {
  let resp = await userService.changeStatusUser(formRef.value.getElement());
  if (resp) return formRef.value.getElement().status.value;
  return;
}
function restoreElement() {
  formRef.value.restore();
}
function resetElement() {
  formRef.value.reset();
}
function validateElement() {
  return formRef.value.validate();
}
onMounted(async () => {
  if (idElement) await getElement(idElement);
  emit("onFirstLoad");
});
defineExpose({
  getElement,
  addElement,
  editElement,
  deleteElement,
  restoreElement,
  resetElement,
  editStatusElement,
  validateElement,
});
</script>
<template>
  <g-form
    ref="formRef"
    :elementModel="UserModel"
    v-slot="{ element, validateLabel }"
  >
    <div class="row gutter-sec container-content">
      <div class="col-12 col-sm-10 col-md-6 col-lg-5 col-xl-4 d-flex">
        <g-section-4
          title="Información Personal"
          contentClass=""
          class="w-100 content-user"
          :topLine="false"
        >
          <template v-slot:contentAboveTitle>
            <div class="img-data">
              <g-input-image-val
                imageClass="user-img"
                v-model="element.photo"
                :disabled="disabled"
                @validate="validateLabel"
                iconEmpty="fa-solid fa-user-large"
              />
            </div>
          </template>
          <div class="row gutter-form">
            <g-input-val
              v-model="element.first_name"
              :label="element.first_name.name"
              @validate="validateLabel"
              :disabled="disabled"
            />
            <g-input-val
              v-model="element.last_name"
              :label="element.last_name.name"
              @validate="validateLabel"
              :disabled="disabled"
            />

            <g-input-val
              v-model="element.ruc"
              :label="element.ruc.name"
              @validate="validateLabel"
              :disabled="disabled"
            />
          </div>
        </g-section-4>
      </div>
      <div class="col-12 col-sm-10 col-md-6 col-lg-5 col-xl-4">
        <g-section-4
          title="Detalles del Sistema"
          subTitle="Información relacionada con el sistema"
          contentClass="row gutter-form"
          :mbTitle="true"
        >
          <div>
            <div class="row gutter-form">
              <g-select-consult-val
                v-model="element.id_role"
                :label="element.id_role.name"
                :disabled="disabled"
                @validate="validateLabel"
                :consult="rolService.getListRol"
                :filter="{ order: 'asc', orderBy: 'name', searchBy: ['name'] }"
              />
              <g-input-check
                v-model="element.dark_mode.value"
                :label="element.dark_mode.name"
                :disabled="disabled"
                labelClass="imp-label"
                checkPosition="bottom"
                :switchMode="true"
              />
            </div>
          </div>
        </g-section-4>
        <g-section-4 title="Autenticación" contentClass="row gutter-form">
          <div>
            <div class="row gutter-form">
              <g-input-val
                v-model="element.email"
                :label="element.email.name"
                @validate="validateLabel"
                :disabled="disabled"
                :lowercase="true"
              />
            </div>
          </div>
          <div v-if="mode === 'add'">
            <div class="row gutter-form">
              <g-input-check
                v-model="element.generate_password.value"
                :label="element.generate_password.name"
                :disabled="disabled"
                labelClass="imp-label"
                checkPosition="bottom"
                :switchMode="true"
              />
              <g-input-val
                v-show="!element.generate_password.value"
                v-model="element.password"
                :label="element.password.name"
                @validate="validateLabel"
                :disabled="disabled"
                :uppercase="false"
              />
              <g-input-val
                v-show="!element.generate_password.value"
                v-model="element.confirm_password"
                :label="element.confirm_password.name"
                @validate="validateLabel"
                :disabled="disabled"
                :uppercase="false"
              />
            </div>
          </div>
          <div v-if="mode !== 'add'">
            <g-button
              icon="fa-solid fa-lock"
              text="Cambiar Contraseña"
              type="search"
            >
            </g-button>
          </div>
        </g-section-4>
      </div>
      <div
        class="col-12 col-sm-10 col-md-12 col-lg-10 col-xl-8"
        v-if="mode === 'view'"
      >
        <g-section-3
          title="Detalles de Empresa"
          contentClass="row gutter-form"
          :mt="true"
        >
          <div class="col-12 col-md-4">
            <div class="img-emp">
              <g-image
                imageClass="user-emp-img "
                :src="element.company_id.additional.company_image"
              />
            </div>
          </div>
          <div class="col-12 col-md-8">
            <div class="row gutter-form">
              <div>
                <label class="imp-label">Nombre</label>
                <div class="name-emp">
                  <div>
                    {{ element.company_id.additional.name }}
                  </div>
                  <div class="desc-emp">
                    {{ element.company_id.additional.description }}
                  </div>
                </div>
              </div>

              <div class="col-6">
                <label class="imp-label">Numero</label>
                <div>
                  <span>{{
                    element.company_id.additional.phone_principal
                  }}</span>
                  <span v-if="element.company_id.additional.phone_secundary">{{
                    " - " + element.company_id.additional.phone_secundary
                  }}</span>
                </div>
              </div>
              <g-input
                v-model="element.company_id.additional.address"
                label="Dirección"
                :disabled="true"
                class="col-6"
              />

              <g-input
                v-model="element.company_id.additional.ruc"
                label="RUC"
                :disabled="true"
              />
            </div>
          </div>
        </g-section-3>
      </div>
    </div>
  </g-form>
</template>
<style scoped>
.img-emp {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.img-data {
  display: flex;
  margin-bottom: 1.5rem;
  margin-top: -6rem;
  justify-content: center;
}
.content-user {
  margin-top: calc(6rem - 1.5rem);
}
.data-img-container {
  display: flex;
  position: relative;
}
.container-content {
  justify-content: center;
}
.desc-emp {
  font-size: 13px;
  color: var(--color-b-v3);
}
.name-emp {
  line-height: 1.3;
}
</style>
