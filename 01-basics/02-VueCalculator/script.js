import {createApp} from './vendor/vue.esm-browser.js';

createApp({
  data() {
    return {
      firstNum: 0,
      secondNum: 0,
      operand: 'sum'
    }
  },
  computed: {
    result() {
      return this[this.operand]();
    }
  },
  methods: {
    sum() {
      return this.firstNum + this.secondNum;
    },
    subtract() {
      return this.firstNum - this.secondNum;
    },
    multiply() {
      return this.firstNum * this.secondNum;
    },
    divide() {
      return this.firstNum / this.secondNum;
    }
  }
}).mount('#app')
