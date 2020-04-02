<template>
  <ValidationObserver ref="loginForm" v-slot="{ handleSubmit }">
    <v-form>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <ValidationProvider name="username" rules="required|email" v-slot="{ errors }">
            <v-text-field
              v-model="username"
              :error-messages="errors[0]"
              label="ID"
              name="username"
              prepend-inner-icon="fas fa-user-tie"
              outlined/>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <ValidationProvider name="password" rules="required" v-slot="{ errors }">
            <v-text-field
              v-model="password"
              :append-icon="showPassword ?  'fas fa-eye-slash' : 'fas fa-eye'"
              :type="showPassword ? 'text' : 'password'"
              :error-messages="errors[0]"
              id="password"
              label="Password"
              name="password"
              prepend-inner-icon="fas fa-key"
              outlined
              @click:append="showPassword = !showPassword"/>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <v-row class="no-gutters">
            <v-checkbox v-model="remember" label="Remember" class="mt-n2"/>
            <v-spacer />
            <v-btn
              class="mr-2 mt-n3"
              :loading="loading"
              depressed
              @click="handleSubmit(submit)">
              Login
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { setAuthCookie } from '@/lib/cookies/authCookies';
import { LoginMutation } from '@/GraphQL/mutations/AuthMutations';

export default {
  name: 'LoginForm',
  data: () => ({
    username: 'demo@elixir.com',
    password: 'password',
    showPassword: false,
    remember: true,
    loading: false,
  }),
  apollo: {
    $client: 'mainClient',
  },
  methods: {
    submit() {
      this.loading = true;
      this.$apollo.mutate({
        mutation: LoginMutation,
        variables: {
          username: this.username,
          password: this.password,
        },
      }).then((response) => {
        const { login } = response.data;
        setAuthCookie(login.access_token, login.refresh_token, login.expires_in, this.remember);
        window.location.reload();
      }).catch((error) => {
        const { graphQLErrors } = error;
        const gqlError = graphQLErrors[0];
        if (gqlError.extensions.category === 'validation') {
          const validationErrors = gqlError.extensions.validation;
          Object.keys(validationErrors).forEach((key) => {
            this.$refs.loginForm.setErrors({
              [key]: validationErrors[key][0],
            });
          });
        } else if (gqlError.extensions.category === 'authentication') {
          this.$refs.loginForm.setErrors({
            password: 'Password is incorrect',
          });
        } else {
          console.error('Error: ', error);
        }
      }).finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>

</style>
