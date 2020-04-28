<template>
  <div class="projects">
    <v-col>
      <page-title title="projects">
        <v-btn depressed @click="createProjectDialog = true">New</v-btn>
      </page-title>

      <v-row>
        <v-col cols="12">
          <v-card shaped outlined>
            <v-toolbar flat>
              <v-toolbar-title>Projects overview</v-toolbar-title>
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
import CreateProjectDialog from '@/components/dialogs/project/Create.vue';
import ProjectsOverviewTable from '@/components/tables/project/Overview.vue';

export default {
  name: 'Index',
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
