<template>
  <v-dialog :value="value" max-width="600px" persistent>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>Create Project</v-toolbar-title>
        <v-spacer />
        <v-btn icon rounded @click="closeDialog"><v-icon>fas fa-times</v-icon></v-btn>
      </v-toolbar>
      <v-card-text>
          <create-project-form v-on:success="closeDialog"/>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import ModalControlMixin from '@/mixins/ModalControl';
import CreateProjectForm from '@/components/forms/project/CreateProjectForm.vue';

export default {
  name: 'CreateProjectDialog',
  mixins: [ModalControlMixin],
  components: {
    'create-project-form': CreateProjectForm,
  },
};
</script>

<style scoped>

</style>
