<template>
  <ApolloQuery
    :query="queries.users"
    :variables="{ nameOrder: 'ASC', roleOrder: 'ASC' }"
    notifyOnNetworkStatusChange>
    <template v-slot="{ result: { loading, data }}">
      <table-skeleton-loader v-if="loading"/>
      <v-data-table
        v-else
        class="elevation-1"
        :headers="headers"
        :items="data.users.data"
        :items-per-page="5"
        fixed-header>

        <template v-slot:item.name="{ item }">
          <span
            class="clickable font-weight-medium"
            @click="$router.push(`/user/${item.id}`)">
            {{item.name}}
          </span>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip
            v-if="item.status === 'ACTIVE'"
            small
            color="green"
            text-color="white">
            <span>Active</span>
          </v-chip>
        </template>

        <template v-slot:item.role="{ item }">
          <span class="text-capitalize">{{item.role.toLowerCase()}}</span>
        </template>

        <template v-slot:item.projects="{ item }">
          <span class="text-capitalize">{{item.projects.paginatorInfo.total}}</span>
        </template>

        <template v-slot:item.teams="{ item }">
          <span class="text-capitalize">{{item.teams.paginatorInfo.total}}</span>
        </template>

        <template v-slot:item.action="{item}">
          <v-menu bottom left offset-y transition="slide-y-transition">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" depressed icon>
                <v-icon small>fas fa-angle-double-down</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item :to="`/user/${item.id}`">
                <v-icon left small>fas fa-eye</v-icon> View
              </v-list-item>
              <v-list-item link>
                <v-icon left small>fas fa-pen</v-icon> Edit
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

      </v-data-table>
    </template>
  </ApolloQuery>
</template>

<script>
import { UsersQuery } from '@/GraphQL/queries/UserQueries';
import TableSkeletonLoader from '@/components/core/skeletons/Table.vue';

export default {
  name: 'UsersOverviewTable',
  components: {
    'table-skeleton-loader': TableSkeletonLoader,
  },
  data: () => ({
    queries: {
      users: UsersQuery,
    },
    headers: [
      { text: 'Name', value: 'name', align: 'start' },
      { text: 'Status', value: 'status', align: 'center' },
      { text: 'Role', value: 'role', align: 'center' },
      { text: 'Projects', value: 'projects', align: 'center' },
      { text: 'Teams', value: 'teams', align: 'center' },
      {
        text: 'Action',
        value: 'action',
        align: 'end',
        sortable: false,
      },
    ],
  }),
};
</script>

<style scoped>

</style>
