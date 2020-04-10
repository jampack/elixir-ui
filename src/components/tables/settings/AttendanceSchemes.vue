<template>
  <ApolloQuery
    :query="queries.attendanceSchemes">
    <template v-slot="{ result: { loading, data }}">
      <v-card outlined>
        <v-data-table
          class="elevation-1"
          :headers="headers"
          :items="data.attendanceSchemes.data"
          :items-per-page="5"
          :loading="loading"
          fixed-header>

          <template v-slot:item.action>
            <v-menu bottom left offset-y transition="slide-y-transition">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" depressed icon>
                  <v-icon small>fas fa-angle-double-down</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item link>
                  <v-icon left small>fas fa-pen</v-icon> Edit
                </v-list-item>
                <v-list-item link><v-icon left small>fas fa-trash</v-icon> Delete</v-list-item>
              </v-list>
            </v-menu>
          </template>

        </v-data-table>
      </v-card>
    </template>
  </ApolloQuery>
</template>

<script>
import { AttendanceSchemesQuery } from '@/GraphQL/queries/settings/AttendanceScheme';

export default {
  name: 'AttendanceSchemes',
  data: () => ({
    queries: {
      attendanceSchemes: AttendanceSchemesQuery,
    },
    headers: [
      { text: 'Name', value: 'name', align: 'start' },
      { text: 'Casual leaves', value: 'casual_leaves', align: 'center' },
      { text: 'Sick leaves', value: 'sick_leaves', align: 'center' },
      { text: 'Planned leaves', value: 'planned_leaves', align: 'center' },
      { text: 'Work from Home', value: 'work_from_home', align: 'center' },
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
