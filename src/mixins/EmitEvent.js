export default {
  methods: {
    emitGlobalEvent(event, args = {}) {
      this.$root.$emit(event, args);
    },

    emitEvent(event, args = {}) {
      this.$emit(event, args);
    },
  },
};
