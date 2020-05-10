<template>
  <v-img
    :src="src"
    :lazy-src="placeholderImage"
    :height="height"
    :width="width"
    transition="fade-transition">
    <v-overlay v-if="overlay" absolute />
    <template v-slot:placeholder>
      <v-row
        class="fill-height ma-0"
        align="center"
        justify="center">
        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
      </v-row>
    </template>
    <slot/>
  </v-img>
</template>

<script>
import PlaceholderImage from '@/assets/placeholder.png';

export default {
  name: 'ImageWithSpinner',
  data: () => ({
    placeholderImage: PlaceholderImage,
  }),
  props: {
    src: {
      type: String,
      required: true,
    },
    height: {
      type: String,
    },
    width: {
      type: String,
    },
    overlay: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>

</style>
