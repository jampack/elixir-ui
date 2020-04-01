<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    flat>
    <v-app-bar-nav-icon @click.stop="TOGGLE_NAV_DRAWER" />
    <v-toolbar-title
      style="width: 300px"
      class="ml-0 pl-4">
      <span class="hidden-sm-and-down">Elixir</span>
    </v-toolbar-title>
    <v-spacer />
    <v-badge
      class="mr-4"
      content="+9"
      color="orange"
      left>
        <v-icon>fas fa-bell</v-icon>
    </v-badge>
    <v-btn
      class="mr-2"
      icon
      large>
      <v-avatar
        size="32px"
        item>
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
          alt="Vuetify"/>
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'TopBar',
  methods: {
    ...mapMutations([
      'TOGGLE_NAV_DRAWER',
    ]),
  },
};
</script>

<style scoped>

</style>
