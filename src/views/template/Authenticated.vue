<template>
  <v-app id="root">
    <NavigationDrawer />
    <TopBar />
    <v-content>
      <v-container
        fluid
        :class="{
        'ma-0': $route.meta.no_pad || $vuetify.breakpoint.smAndDown,
        'pa-0': $route.meta.no_pad || $vuetify.breakpoint.smAndDown
        }">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TopBar from '../../components/layout/TopBar.vue';
import NavigationDrawer from '../../components/layout/NavigationDrawer.vue';

export default {
  name: 'Authenticated',
  components: {
    TopBar,
    NavigationDrawer,
  },
  props: {
    source: String,
  },
  data: () => ({
  }),
};
</script>
