<template>
  <v-app id="app">
    <v-content>
      <v-container
        class="fill-height"
        fluid>
        <v-row
          style="max-width: unset"
          align="center"
          justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card shaped outlined>
              <v-toolbar flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on" href="/login"
                      target="_blank"
                      icon large>
                      <v-icon>fas fa-lock</v-icon>
                    </v-btn>
                  </template>
                  <span>Forgot password?</span>
                </v-tooltip>
              </v-toolbar>
              <v-divider />
              <v-card-text>
                <login-form />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import LoginForm from '@/components/forms/Login.vue';

export default {
  name: 'Login',
  components: {
    'login-form': LoginForm,
  },
  data: () => ({
    remember: true,
  }),
};
</script>
