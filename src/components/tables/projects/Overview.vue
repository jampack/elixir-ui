<template>
  <v-data-table
    class="elevation-1"
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    fixed-header>
    <template v-slot:item.name="{ item }">
      <span
        class="clickable font-weight-medium"
        @click="$router.push(`/project/${item.name}`)">
        {{item.name}}
      </span>
    </template>
    <template v-slot:item.action>
      <v-menu bottom left offset-y transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" depressed icon>
            <v-icon small>fas fa-angle-double-down</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item link><v-icon left small>fas fa-eye</v-icon> View</v-list-item>
          <v-list-item link><v-icon left small>fas fa-cog</v-icon> Settings</v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'Overview',
  data: () => ({
    headers: [
      { text: 'Name', value: 'name', align: 'start' },
      { text: 'Assignees', value: 'calories', align: 'center' },
      { text: 'Status', value: 'fat', align: 'center' },
      { text: 'Notes', value: 'carbs', align: 'center' },
      {
        text: 'Action',
        value: 'action',
        align: 'end',
        sortable: false,
      },
    ],
    desserts: [
      {
        name: 'Phoenix',
        calories: 159,
        fat: 6.0,
        carbs: 24,
      },
      {
        name: 'Salty',
        calories: 237,
        fat: 9.0,
        carbs: 37,
      },
      {
        name: 'Spitfire',
        calories: 262,
        fat: 16.0,
        carbs: 23,
      },
      {
        name: 'Medusa',
        calories: 305,
        fat: 3.7,
        carbs: 67,
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
      },
      {
        name: 'Orion',
        calories: 375,
        fat: 0.0,
        carbs: 94,
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
      },
    ],
  }),
};
</script>

<style scoped>

</style>
