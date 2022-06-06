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
      toasts: []
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
      const timestamp = Date.now();
      const toastObj = {type, message, timestamp};
      this.toasts.push(toastObj);
      setTimeout(()=>this.removeToastByTimeout(timestamp), timeout);
    },
    removeToastByTimeout(timestamp) {
      this.toasts = this.toasts.filter(t=>t.timestamp !== timestamp );
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
