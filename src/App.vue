<template>
  <component v-bind:is="GET_LAYOUT" />
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import gql from 'graphql-tag';

import { tokenExist } from '@/lib/cookies/authCookies';

import AuthLayout from './views/template/Authenticated.vue';
import Login from './views/Login.vue';

export default {
  name: 'App',
  components: {
    'auth-layout': AuthLayout,
    login: Login,
  },

  data: () => ({
  }),
  computed: {
    ...mapGetters([
      'GET_LAYOUT',
    ]),
  },
  methods: {
    ...mapMutations([
      'SET_AUTH',
      'SET_LAYOUT',
      'SET_USER',
      'SET_NAV_DRAWER',
    ]),

    checkToken() {
      if (tokenExist()) {
        this.verifyToken();
      } else {
        this.change_to_no_auth_state();
      }
    },

    verifyToken() {
      // Call to the graphql mutation
      this.$apollo.query({
        // Query
        client: 'authClient',
        query: gql`
          query{
            authCheck
          }
        `,
      }).then((response) => {
        if (response.data.authCheck) {
          this.getUser();
          this.change_to_auth_state();
          return;
        }
        this.change_to_no_auth_state();
      }).catch((error) => {
        console.error('Error', error);
        this.$router.push({ name: 'server-error' });
        return false;
      });
    },

    getUser() {
      this.$apollo.query({
        client: 'authClient',
        query: gql`
          query{
            me{
              name
              avatar
              role
            }
          }
        `,
      }).then((response) => {
        if (response.data.me) {
          const { me: user } = response.data;
          this.SET_USER(user);
        }
      }).catch((error) => {
        console.error('Error', error);
        this.$router.push({ name: 'server-error' });
        return false;
      });
    },

    setDrawer() {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.SET_NAV_DRAWER(false);
      }
    },

    change_to_auth_state() {
      this.removePaceLoader();
      this.SET_AUTH(true);
      this.SET_LAYOUT('auth-layout');
    },

    change_to_no_auth_state() {
      this.removePaceLoader();
      this.SET_AUTH(false);
      this.SET_LAYOUT('login');
    },

    removePaceLoader() {
      const elem = document.getElementById('paceloader');
      elem.parentNode.removeChild(elem);
    },
  },
  mounted() {
    this.checkToken();
    this.setDrawer();
  },
};
</script>
