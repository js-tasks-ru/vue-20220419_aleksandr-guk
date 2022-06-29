<template>
  <button @click="handler"  >{{ localCounter }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      localCounter: this.count
    }
  },
  emits: ['update:count'],
  methods: {
    handler() {
      this.localCounter++;
      this.$emit('update:count', this.localCounter);
    }
  },
  watch: {
    count(newVal) {
      if ( newVal !== this.localCounter  ) {
        this.localCounter = newVal;
      }
    }
  }
};
</script>
