<template>
  <div>
    <core-image src="https://picsum.photos/510/300?random" height="300" overlay>
      <v-row class="full-wh">
        <v-col class="d-flex align-end">
          <span class="white--text display-2 text-truncate mb-2 mx-2 py-1" style="z-index: 5">
            Project-X
          </span>
        </v-col>
      </v-row>
    </core-image>
    <v-btn
      :to="{ name: 'project-board-view', params: { projectSlug: $route.params.slug} }"
      dark
      color="red">
      Board
    </v-btn>
  </div>
</template>

<script>
import Image from '@/components/core/Image.vue';

export default {
  name: 'ViewProject',
  components: {
    'core-image': Image,
  },
};
</script>

<style scoped>

</style>
