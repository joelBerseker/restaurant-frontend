<script>
import { defineComponent } from "vue";
import GModal from "@/common/Modal.vue";
import { confirmDialogueText } from "@/helpers";

export default defineComponent({
  name: "ConfirmDialogue",
  components: {
    GModal,
  },
  data() {
    return {
      title: undefined,
      message: undefined,
      okButton: undefined,
      resolvePromise: undefined,
      rejectPromise: undefined,
      modal: {
        title: "",
        closeButton: false,
      },
    };
  },
  methods: {
    show(type) {
      this.init(type);
      this.openModal();
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },
    init(type) {
      this.modal.title = confirmDialogueText[type].title;
      this.message = confirmDialogueText[type].message;
      this.okButton = confirmDialogueText[type].okButton;
    },

    _confirm() {
      this.closeModal();
      this.resolvePromise(true);
    },

    _cancel() {
      this.closeModal();
      this.resolvePromise(false);
    },

    closeModal() {
      this.$refs.myModal.closeModal();
    },
    openModal() {
      this.$refs.myModal.openModal();
    },
  },
});
</script>
<template>
  <GModal
    ref="myModal"
    :titleModal="modal.title"
    :closeButton="modal.closeButton"
    zIndex="5100"
  >
    {{ message }}
    <template v-slot:footer>
      <g-button
        icon="fa-solid fa-xmark"
        text="Cancelar"
        type="secondary"
        @click="_cancel"
      />
      <g-button
        icon="fa-solid fa-check"
        :text="okButton"
        @click="_confirm"
        class="ms-1"
      />
    </template>
  </GModal>
</template>
<style></style>
