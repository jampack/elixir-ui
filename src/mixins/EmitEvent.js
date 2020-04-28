export default {
  methods: {
    emitEvent(event, args = {}) {
      this.$root.$emit(event, args);
    },
  },
};
