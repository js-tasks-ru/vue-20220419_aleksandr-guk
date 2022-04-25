// import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
import {createApp} from './vendor/vue.esm-browser.js';

createApp({
  data() {
    return {
      sum: 'Incorrect input',
      firstNum: 0,
      secondNum: 0,
      calcMethods: {
        sum: (firstNum, secondNum) => firstNum + secondNum,
        subtract: (firstNum, secondNum) => firstNum - secondNum,
        multiply: (firstNum, secondNum) =>  firstNum * secondNum,
        divide: (firstNum, secondNum) =>  firstNum / secondNum,
      }
    }
  },
  methods: {
    showChange() {
      const checkedRadio = document.querySelector('input:checked');
      if ( checkedRadio ) {
         const method = checkedRadio.value;
         if ( this.calcMethods[method] )  {
           this.sum = this.calcMethods[method](this.firstNum, this.secondNum)
         }
      }
    }
  }
}).mount('#app')
