<template>
  <div class="projects">
    <v-col>
      <page-title title="users">
        <v-btn depressed @click="createProjectDialog = true">New</v-btn>
      </page-title>

      <v-row>
        <v-col cols="12">
          <v-card shaped outlined>
            <v-toolbar flat>
              <v-toolbar-title>Users overview</v-toolbar-title>
            </v-toolbar>
            <v-divider />
            <projects-overview-table />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <create-project-dialog v-model="createProjectDialog"/>
  </div>
</template>

<script>
import PageTitle from '@/components/core/PageTitle.vue';
import CreateProjectDialog from '@/components/dialogs/projects/Create.vue';
import ProjectsOverviewTable from '@/components/tables/projects/Overview.vue';

export default {
  name: 'index',
  components: {
    'page-title': PageTitle,
    'create-project-dialog': CreateProjectDialog,
    'projects-overview-table': ProjectsOverviewTable,
  },
  data: () => ({
    createProjectDialog: false,
  }),
};
</script>

<style scoped>

</style>
