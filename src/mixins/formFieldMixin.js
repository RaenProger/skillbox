import baseFormField from '@/components/baseFormField.vue';

export default {
  components: { baseFormField },
  props: ['title', 'error', 'placeholder', 'value'],
  computed: {
      dataValue: {
          get() {
              return this.value;
          },
          set(value) {
              this.$emit('input', value);
          },
      },
  },
};
