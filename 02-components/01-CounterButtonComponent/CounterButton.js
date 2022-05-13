import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: "CounterButton",
  props: {
    count: {
      type: Number,
      default: 0
    },
  },
  // Компонент должен иметь входной параметр

  // Шаблон лучше держать максимально простым, а логику выносить в методы

  // Шаблон потребуется отредактировать
  methods: {
    btnClickHandler(count) {
      this.$emit('update:count', count+1);
    }
  },
  template: `<button @click="btnClickHandler(count)" type="button">{{count}}</button>`
});
