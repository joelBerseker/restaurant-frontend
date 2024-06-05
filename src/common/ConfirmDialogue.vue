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
      prevMessage: undefined,
      nextMessage: undefined,

      importantMessage: "hola",

      okButton: undefined,
      typeButton: undefined,

      resolvePromise: undefined,
      rejectPromise: undefined,
      modal: {
        title: "",
        closeButton: false,
      },
    };
  },
  methods: {
    show(type, _importantMessage = null) {
      this.init(type, _importantMessage);
      this.openModal();
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },
    init(type, _importantMessage = null) {
      this.modal.title = confirmDialogueText[type].title;
      this.prevMessage = confirmDialogueText[type].prevMessage;
      this.nextMessage = confirmDialogueText[type].nextMessage;
      this.importantMessage = _importantMessage;

      this.okButton = confirmDialogueText[type].okButton;
      let _typeButton = confirmDialogueText[type].typeButton;
      if (_typeButton === undefined) {
        this.typeButton = "primary";
      } else {
        this.typeButton = _typeButton;
      }
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
    size="sm"
  >
    {{ prevMessage }}
    <span class="important-text">{{ importantMessage }}</span> {{ nextMessage }}
    <template v-slot:footer>
      <g-button
        icon="fa-solid fa-xmark"
        text="Cancelar"
        type="secondary"
        @click="_cancel"
      />
      <g-button
        icon="fa-solid fa-check"
        :type="typeButton"
        :text="okButton"
        @click="_confirm"
        class="ms-1"
      />
    </template>
  </GModal>
</template>
<style scoped>
.important-text {
  font-weight: 600;
}
</style>
