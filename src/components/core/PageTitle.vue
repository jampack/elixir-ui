<template>
  <div class="page-title mb-4">
    <v-row class="mx-1">
      <span class="headline font-weight-medium text-capitalize">{{this.title}}</span>
      <v-spacer />
      <div class="mb-2">
        <slot></slot>
      </div>
    </v-row>
    <v-divider/>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
