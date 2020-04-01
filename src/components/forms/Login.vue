<template>
  <ValidationObserver ref="loginForm" v-slot="{ handleSubmit }">
    <v-form>
      <ValidationProvider name="username" rules="required|email" v-slot="{ errors }">
        <v-text-field
          v-model="username"
          label="ID"
          name="username"
          prepend-inner-icon="fas fa-user-tie"
          type="text"
          outlined
          :error-messages="errors[0]"/>
      </ValidationProvider>
      <ValidationProvider name="password" rules="required" v-slot="{ errors }">
        <v-text-field
          v-model="password"
          id="password"
          label="Password"
          name="password"
          prepend-inner-icon="fas fa-key"
          outlined
          :append-icon="showPassword ?  'fas fa-eye-slash' : 'fas fa-eye'"
          :type="showPassword ? 'text' : 'password'"
          :error-messages="errors[0]"
          @click:append="showPassword = !showPassword"/>
      </ValidationProvider>
      <v-checkbox v-model="remember" label="Remember" class="mt-n2"/>
      <v-row>
        <v-spacer />
        <v-btn
          class="mr-2 mb-1"
          depressed
          @click="handleSubmit(submit)"
          :loading="loading">
          Login
        </v-btn>
      </v-row>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { setAuthCookie } from '@/lib/cookies/authCookies';
import { LoginMutation } from '@/GraphQL/Mutations/AuthMutations';

export default {
  name: 'login',
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
        const { data: { login } } = response;
        setAuthCookie(login.access_token, login.refresh_token, login.expires_in, this.remember);
        window.location.reload();
      }).catch((error) => {
        const { graphQLErrors } = error;
        const gqlError = graphQLErrors[0];
        if (gqlError.extensions.category === 'validation') {
          const validationErrors = gqlError.extensions.validation;
          Object.keys(validationErrors).forEach((key) => {
            this.$refs.loginForm.setErrors({
              key: validationErrors[key][0],
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
