<template>
  <div class="toasts">
    <ui-toast v-for="toast in toasts" :type="toast.type" :message="toast.message"></ui-toast>
  </div>
</template>

<script>
import UiToast from './UiToast';

export default {
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      toasts: [],
      lastId: -1
    }
  },

  methods: {
    success(message, timeout = 5000) {
      this.addToast('success', message, timeout)
    },
    error(message, timeout = 5000) {
      this.addToast('error', message, timeout)
    },
    addToast(type, message, timeout) {
      const id = ++this.lastId;
      const toastObj = {type, message, id};
      this.toasts.push(toastObj);
      setTimeout(()=>this.removeToast(id), timeout);
    },
    removeToast(id) {
      this.toasts = this.toasts.filter(t=>t.id !== id );
    }
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

</style>
