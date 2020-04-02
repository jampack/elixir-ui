<template>
  <ValidationObserver ref="createProjectForm" v-slot="{ handleSubmit }">
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
          <ValidationProvider name="description" rules="" v-slot="{ errors }">
          <v-textarea
            v-model="description"
            :error-messages="errors[0]"
            label="Description"
            height="100"
            outlined
            dense/>
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
import { CreateProjectMutation } from '@/GraphQL/mutations/ProjectMutations';

export default {
  name: 'CreateProjectForm',
  data: () => ({
    name: '',
    description: '',
    loading: false,
  }),
  methods: {
    submit() {
      this.loading = true;
      this.$apollo.mutate({
        mutation: CreateProjectMutation,
        variables: {
          name: this.name,
          description: this.description,
        },
      }).then(({ data }, response) => {
        const { createProject: { id } } = data;
        if (id) {
          this.$emit('success');
          console.log('project created');
        } else {
          console.warn('Unexpected Result: ', response);
        }
      }).catch((error) => {
        const { graphQLErrors } = error;
        const gqlError = graphQLErrors[0];
        if (gqlError.extensions.category === 'validation') {
          const validationErrors = gqlError.extensions.validation;
          Object.keys(validationErrors).forEach((key) => {
            this.$refs.createProjectForm.setErrors({
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
