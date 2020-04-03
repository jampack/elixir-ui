<template>
  <div class="projects">
    <v-col>
      <page-title title="users">
        <v-btn depressed @click="createUserDialog = true">New</v-btn>
      </page-title>

      <v-row>
        <v-col cols="12">
          <v-card shaped outlined>
            <v-toolbar flat>
              <v-toolbar-title>Users overview</v-toolbar-title>
            </v-toolbar>
            <v-divider />
            <users-overview-table />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <create-user-dialog v-model="createUserDialog"/>
  </div>
</template>

<script>
import PageTitle from '@/components/core/PageTitle.vue';
import CreateUserDialog from '@/components/dialogs/user/Create.vue';
import UsersOverviewTable from '@/components/tables/user/Overview.vue';

export default {
  name: 'index',
  components: {
    'page-title': PageTitle,
    'create-user-dialog': CreateUserDialog,
    'users-overview-table': UsersOverviewTable,
  },
  data: () => ({
    createUserDialog: false,
  }),
};
</script>

<style scoped>

</style>
