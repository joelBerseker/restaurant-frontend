<script setup>
import { CompanyModel } from "@/models";
import { companyService, rolService } from "@/services";
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
  let resp = await companyService.getCompany(_id);
  if (resp) formRef.value.copy(resp);
  return resp;
}

async function editElement() {
  let resp = await companyService.updateCompany(formRef.value.getElement());
  if (resp) formRef.value.copy(resp);
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
onMounted(async () => {
  if (idElement) await getElement(idElement);
  emit("onFirstLoad");
});
defineExpose({
  getElement,

  editElement,

  restoreElement,
  resetElement,

  validateElement,
});
</script>
<template>
  <g-form
    ref="formRef"
    :elementModel="CompanyModel"
    v-slot="{ element, validateLabel }"
  >
    <div class="row gutter-sec container-content">
      <div class="col-12 col-sm-10 col-md-6 col-lg-5 col-xl-4 d-flex">
        <g-section-4
          title="Información de la Empresa"
          contentClass=""
          class="w-100"
          :topLine="false"
        >
          <div class="row gutter-form">
            <div class="img-data">
              <g-input-image-val
                imageClass="user-emp-img"
                v-model="element.company_image"
                :disabled="disabled"
                @validate="validateLabel"
              />
            </div>
            <g-input-val
              :label="element.name.name"
              v-model="element.name"
              :disabled="disabled"
              @validate="validateLabel"
            />
            <g-input-val
              v-show="mode !== 'view' || element.description.value"
              :label="element.description.name"
              v-model="element.description"
              :disabled="disabled"
              @validate="validateLabel"
            />
            <g-input-val
              :label="element.ruc.name"
              v-model="element.ruc"
              :disabled="disabled"
              @validate="validateLabel"
            />

            <g-input-val
              :label="element.address.name"
              v-model="element.address"
              :disabled="disabled"
              @validate="validateLabel"
            />
            <g-input-val
              :label="element.phone_principal.name"
              v-model="element.phone_principal"
              :disabled="disabled"
              @validate="validateLabel"
            />
            <g-input-val
              v-show="mode !== 'view' || element.phone_secundary.value"
              :label="element.phone_secundary.name"
              v-model="element.phone_secundary"
              :disabled="disabled"
              @validate="validateLabel"
            />
          </div>
        </g-section-4>
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

  justify-content: center;
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
