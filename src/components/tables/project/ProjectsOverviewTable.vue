<template>
  <ApolloQuery
    :query="queries.projects"
    :variables="{ statusOrder: 'ASC', updatedAtOrder: 'ASC' }"
    ref="projectsQuery"
    notifyOnNetworkStatusChange>
    <template v-slot="{ result: { loading, data }}">
      <table-skeleton-loader v-if="loading"/>
      <v-data-table
        v-else
        class="elevation-1"
        :headers="headers"
        :items="data.projects.data"
        :items-per-page="5"
        fixed-header>

        <template v-slot:item.name="{ item }">
          <span
            class="clickable font-weight-medium"
            @click="$router.push(`/project/${item.slug}`)">
            {{item.name}}
          </span>
        </template>

        <template v-slot:item.status="{item}">
          <span>{{item.status.name}}</span>
        </template>

        <template v-slot:item.assignees="{item}">
          <span>{{item.users.paginatorInfo.total}}</span>
        </template>

        <template v-slot:item.action="{item}">
          <v-menu bottom left offset-y transition="slide-y-transition">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" depressed icon>
                <v-icon small>fas fa-angle-double-down</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item :to="`/project/${item.slug}`">
                <v-icon left small>fas fa-eye</v-icon> View
              </v-list-item>
              <v-list-item link>
                <v-icon left small>fas fa-pen</v-icon> Edit
              </v-list-item>
              <v-list-item link><v-icon left small>fas fa-cog</v-icon> Settings</v-list-item>
            </v-list>
          </v-menu>
        </template>

      </v-data-table>
    </template>
  </ApolloQuery>
</template>

<script>
import { GetProjectsQuery } from '@/GraphQL/queries/ProjectQueries';
import TableSkeletonLoader from '@/components/core/skeletons/Table.vue';
import events from '@/constants/events';

export default {
  name: 'ProjectsOverviewTable',
  components: {
    'table-skeleton-loader': TableSkeletonLoader,
  },
  data: () => ({
    queries: {
      projects: GetProjectsQuery,
    },
    headers: [
      { text: 'Name', value: 'name', align: 'start' },
      { text: 'Status', value: 'status', align: 'center' },
      { text: 'Assignees', value: 'assignees', align: 'center' },
      // { text: 'Notes', value: 'carbs', align: 'center' },
      {
        text: 'Action',
        value: 'action',
        align: 'end',
        sortable: false,
      },
    ],
  }),
  mounted() {
    this.$root.$on(events.PROJECT_CREATED, () => {
      this.$refs.projectsQuery.getApolloQuery().refetch();
    });
  },
};
</script>

<style scoped>

</style>
