<script setup>
import { UserPasswordModel } from "@/models";
import { userService } from "@/services";
import { ref, inject } from "vue";

const props = defineProps({
  disabled: { default: false },
  isProfile: { default: false },
});

const formRef = ref(null);
const idElement = inject("idElement", null);

/*CONSULTS*/

async function addElement() {
  let id_user = null;
  if (!props.isProfile) {
    id_user = idElement;
  }
  let resp = await userService.changePassword(
    null,
    formRef.value.getElement().getData()
  );
  return resp;
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
function userValidation() {
  formRef.value.getElement().userValidation();
}

defineExpose({
  addElement,

  restoreElement,
  resetElement,
  userValidation,
  validateElement,
});
</script>
<template>
  <g-form
    ref="formRef"
    :elementModel="UserPasswordModel"
    v-slot="{ element, validateLabel }"
    class="row gutter-form"
  >
    <g-input-val
      v-if="isProfile"
      v-model="element.password"
      :label="element.password.name"
      @validate="validateLabel"
      :disabled="disabled"
      :uppercase="false"
    />
    <g-input-val
      v-model="element.new_password"
      :label="element.new_password.name"
      @validate="validateLabel"
      :disabled="disabled"
      :uppercase="false"
    />
    <g-input-val
      v-model="element.confirm_password"
      :label="element.confirm_password.name"
      @validate="validateLabel"
      :disabled="disabled"
      :uppercase="false"
    />
  </g-form>
</template>
