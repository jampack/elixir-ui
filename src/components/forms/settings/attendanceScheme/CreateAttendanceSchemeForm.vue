<template>
  <ValidationObserver ref="loginForm" v-slot="{ handleSubmit }">
    <v-form>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <ValidationProvider name="name" rules="required|max:50" v-slot="{ errors }">
            <v-text-field
              v-model="name"
              :error-messages="errors[0]"
              label="Scheme name"
              outlined/>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <ValidationProvider name="sick_leave" rules="numeric|min_value:1" v-slot="{ errors }">
            <v-text-field
              v-model="sickLeaves"
              :error-messages="errors[0]"
              label="Sick leaves"
              type="text"
              outlined/>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <ValidationProvider name="casual_leave" rules="numeric|min_value:1" v-slot="{ errors }">
            <v-text-field
              v-model="casualLeaves"
              :error-messages="errors[0]"
              label="Casual leaves"
              outlined/>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <ValidationProvider name="planned_leaves" rules="numeric|min_value:1" v-slot="{ errors }">
            <v-text-field
              v-model="plannedLeaves"
              :error-messages="errors[0]"
              label="Planned leaves"
              outlined/>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <ValidationProvider name="work_from_home" rules="numeric|min_value:1" v-slot="{ errors }">
            <v-text-field
              v-model="workFromHome"
              :error-messages="errors[0]"
              label="Work from home"
              outlined/>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <v-row class="no-gutters">
            <v-spacer />
            <v-btn
              class="mr-2 mt-n3"
              :loading="loading"
              depressed
              @click="handleSubmit(submit)">
              Create
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { CreateAttendanceSchemeMutation } from '@/GraphQL/mutations/settings/AttendanceSchemeMutations';

export default {
  name: 'CreateAttendanceSchemeForm',
  data: () => ({
    name: '',
    sickLeaves: null,
    casualLeaves: null,
    plannedLeaves: null,
    workFromHome: null,
    loading: false,
  }),
  methods: {
    submit() {
      this.loading = true;
      this.$apollo.mutate({
        mutation: CreateAttendanceSchemeMutation,
        variables: {
          name: this.name,
          sickLeaves: this.sickLeaves,
          casualLeaves: this.casualLeaves,
          plannedLeaves: this.plannedLeaves,
          workFromHome: this.workFromHome,
        },
      }).then(({ data }, response) => {
        const { createAttendanceScheme: { id } } = data;
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
