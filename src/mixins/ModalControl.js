export default {
  props: ['value'],
  methods: {
    closeDialog() {
      this.$emit('input', false);
    },
  },
};
