<template>
  <ValidationObserver ref="createUserForm" v-slot="{ handleSubmit }">
    <v-form>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <ValidationProvider name="name" rules="required" v-slot="{ errors }">
            <v-text-field
              v-model="name"
              :error-messages="errors[0]"
              label="Name"
              autofocus
              outlined />
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
            <v-text-field
              v-model="email"
              :error-messages="errors[0]"
              label="Email"
              outlined />
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <ValidationProvider name="role" rules="required" v-slot="{ errors }">
            <v-select
              v-model="role"
              :items="inputRole"
              :error-messages="errors[0]"
              :menu-props="{ bottom: true, offsetY: true }"
              item-text="name"
              item-value="value"
              label="Role"
              outlined
            ></v-select>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row class="my-0 py-0">
        <v-spacer></v-spacer>
        <v-btn :loading="loading" depressed @click="handleSubmit(submit)">Create</v-btn>
      </v-row>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { CreateUserMutation } from '@/GraphQL/mutations/UserMutations';

export default {
  name: 'CreateUserForm',
  data: () => ({
    name: '',
    email: '',
    role: '',
    loading: false,
    inputRole: [
      { name: 'Administrator', value: 'ADMINISTRATOR' },
      { name: 'Manager', value: 'MANAGER' },
      { name: 'Developer', value: 'DEVELOPER' },
    ],
  }),
  methods: {
    submit() {
      this.loading = true;
      this.$apollo.mutate({
        mutation: CreateUserMutation,
        variables: {
          name: this.name,
          email: this.email,
          role: this.role,
        },
      }).then(({ data }, response) => {
        const { createUser: { id } } = data;
        if (id) {
          this.$emit('success');
        } else {
          console.warn('Unexpected Result: ', response);
        }
      }).catch((error) => {
        const { graphQLErrors } = error;
        const gqlError = graphQLErrors[0];
        if (gqlError.extensions.category === 'validation') {
          const validationErrors = gqlError.extensions.validation;
          Object.keys(validationErrors).forEach((key) => {
            this.$refs.createUserForm.setErrors({
              [key]: validationErrors[key][0],
            });
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
