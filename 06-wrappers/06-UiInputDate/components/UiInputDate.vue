<template>
  <ui-input v-bind="$attrs"
            v-model="customModel"
            :test="customModel"
            ref="input"

            :type="type"><template v-if="$slots['left-icon']" #left-icon><ui-icon class="icon icon-search" icon="search"></ui-icon></template></ui-input>
</template>

<script>
import UiInput from './UiInput';
import UiIcon from './UiIcon';

export default {
  name: 'UiInputDate',
  props: {
    type: {
      type: String,
      default: 'date',
      validator: function (value) {
        return ['date', 'time', 'datetime-local'].includes(value)
      }
    },
    modelValue: {
      type: [Number, null, String],
      default: null
    },
  },
  emits: ['update:modelValue'],
  computed: {
    customModel: {
      get() {
        const dateObj = getDateTime(this.modelValue)
        if ( this.type === 'date' ) {
          return this.modelValue ? dateObj.date : '';
        }
        if ( this.type === 'time' ) {

          return this.modelValue ? dateObj.time : '';
        }
        if ( this.type === 'datetime-local' ) {
          return this.modelValue ? dateObj.dateTime : '';
        }
      },
      set(value) {
        if (this.type === 'time' ) {
          const date = new Date(this.modelValue);
          const [hh, mm] = value.split(':');
          date.setUTCHours(hh, mm);
          this.$emit('update:modelValue', date.getTime())
          return;
        }
        if ( this.type === 'date' ) {
          const [year, month, day] = value.split(/\D/);
          this.$emit('update:modelValue', new Date(Date.UTC(year, Number(month) - 1, day)).getTime());
          return;
        }
        const [year, month, day, hour, minute] = value.split(/\D/);
        this.$emit('update:modelValue', new Date(Date.UTC(year, Number(month)-1, day, hour, minute)).getTime());

      }
    }
  },
  components: {UiIcon, UiInput },
};

function getDateTime(ms) {
  const dateObj = new Date(ms);
  const time = [String(dateObj.getUTCHours()).padStart(2, '0'), String(dateObj.getUTCMinutes()).padStart(2, '0')].join(':');
  const date = [String(dateObj.getUTCFullYear()) ,
                String(dateObj.getUTCMonth() + 1).padStart(2, '0'),
                String(dateObj.getUTCDate()).padStart(2, '0')].join('-');
  return {date, time, dateTime: [date, time].join('T')}
}
</script>
