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
        <v-col cols="12" sm="12" md="12">
          <ValidationProvider name="status_id" rules="required" v-slot="{ errors }">
            <v-select
              v-model="status"
              :items="statusItems"
              :error-messages="errors[0]"
              :loading="$apollo.queries.statusItems.loading"
              :menu-props="{ bottom: true, offsetY: true }"
              item-text="name"
              item-value="id"
              label="Status"
              placeholder="Current status of project"
              outlined
            />
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
import { ProjectStatusesQuery } from '@/GraphQL/queries/ProjectStatusQueries';
import { CreateProjectMutation } from '@/GraphQL/mutations/ProjectMutations';
import EmitEvent from '@/mixins/EmitEvent';
import events from '@/constants/events';

export default {
  name: 'CreateProjectForm',
  mixins: [EmitEvent],
  data: () => ({
    name: '',
    description: '',
    status: '',
    loading: false,
    statusItems: '',
  }),
  apollo: {
    statusItems: {
      query: ProjectStatusesQuery,
      variables: {
        first: 500,
      },
      update: (data) => data.projectStatuses,
    },
  },
  methods: {
    submit() {
      this.loading = true;
      this.$apollo.mutate({
        mutation: CreateProjectMutation,
        variables: {
          name: this.name,
          description: this.description,
          statusId: this.status,
        },
      }).then(({ data }, response) => {
        const { createProject: { id } } = data;
        if (id) {
          this.emitGlobalEvent(events.PROJECT_CREATED);
          this.emitEvent('success');
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
