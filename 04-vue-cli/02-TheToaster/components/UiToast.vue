<template>
  <div class="toast" :class="[toastClassName, hidden]">
    <ui-icon class="toast__icon" :icon="this.icon"/>
    <span>{{ message }}</span>
   <ui-icon @click="remove" class="toast__icon_close" icon="trash"/>
  </div>
</template>

<script>

import UiIcon from './UiIcon';

const TOAST_TYPES = {
  'success': {icon: 'check-circle', className: 'toast_success'},
  'error': {icon: 'alert-circle', className: 'toast_error'}

}

export default {
  name: "ToasterList",
  components: {UiIcon},
  props: {
    type: String,
    message: String
  },
  data() {
    return {
      hidden: ''
    }
  },
  computed: {
    icon() {
      return TOAST_TYPES[this.type].icon;
    },
    toastClassName() {
      return TOAST_TYPES[this.type].className;
    }
  },
  methods: {
    remove() {
      this.hidden = 'hidden';
    }
  }
}
</script>

<style scoped>

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

.toast__icon_close {
  cursor: pointer;
}

.hidden {
  display: none;
}
</style>
