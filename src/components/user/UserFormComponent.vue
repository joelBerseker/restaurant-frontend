<script setup>
import { UserModel } from "@/models";
import { userService, rolService } from "@/services";
import { ref, onMounted, inject } from "vue";

const props = defineProps({
  disabled: { default: false },
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
  if (!formRef.value.validate()) return;
  let resp = await userService.addUser(formRef.value.getElement());
  return resp;
}
async function editElement() {
  if (!formRef.value.validate()) return;
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
onMounted(async () => {
  if (idElement) await getElement(idElement);
});
defineExpose({
  getElement,
  addElement,
  editElement,
  deleteElement,
  restoreElement,
  resetElement,
  editStatusElement,
});
</script>
<template>
  <g-form
    ref="formRef"
    :elementModel="UserModel"
    v-slot="{ element, validateLabel }"
  >
    <g-input-val
      v-model="element.first_name"
      :label="element.first_name.name"
      @validate="validateLabel"
      :disabled="disabled"
      class="col-4"
    />

    <g-input-val
      v-model="element.last_name"
      :label="element.last_name.name"
      @validate="validateLabel"
      :disabled="disabled"
      class="col-4"
    />
    <g-input-val
      v-model="element.email"
      :label="element.email.name"
      @validate="validateLabel"
      :disabled="disabled"
      class="col-4"
    />
    <g-input-val
      v-model="element.ruc"
      :label="element.ruc.name"
      @validate="validateLabel"
      :disabled="disabled"
    />
    <g-input-check
      v-model="element.dark_mode.value"
      :label="element.dark_mode.name"
      :disabled="disabled"
      labelClass="imp-label"
      :labelLeft="true"
    />
    <g-select-consult-val
      v-model="element.id_role"
      :disabled="disabled"
      @validate="validateLabel"
      :consult="rolService.getListRol"
      :filter="{ order: 'asc', orderBy: 'name', searchBy: ['name'] }"
    />
  </g-form>
</template>
