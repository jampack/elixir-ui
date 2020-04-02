<template>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app>
    <v-list-item two-line>
      <v-list-item-avatar tile>
        <img alt="user" src="https://randomuser.me/api/portraits/men/81.jpg">
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>USERS NAME</v-list-item-title>
        <v-list-item-subtitle>ROLE</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <template v-for="item in items">
        <v-list-group
          v-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon="">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.url">
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-else
          :key="item.text"
          :to="item.url">
          <v-list-item-action>
            <v-icon small>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <template v-slot:append>
      <v-btn block depressed>Button</v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  data: () => ({
    items: [
      { icon: 'fas fa-chart-pie', text: 'Dashboard', url: { name: 'dashboard' } },
      { icon: 'fas fa-laptop-code', text: 'Projects', url: { name: 'project-index' } },
      { icon: 'fas fa-users', text: 'Users', url: { name: 'users-index' } },
      {
        icon: 'fas fa-angle-up',
        'icon-alt': 'fas fa-angle-down',
        text: 'Planning',
        model: false,
        children: [
          { icon: 'mdi-plus', text: 'project planning', url: { name: 'users-index' } },
          { icon: 'mdi-plus', text: 'Employee planning', url: { name: 'users-index' } },
        ],
      },
      {
        icon: 'fas fa-angle-up',
        'icon-alt': 'fas fa-angle-down',
        text: 'Management',
        model: false,
        children: [
          { icon: 'mdi-plus', text: 'Import', url: { name: 'users-index' } },
          { icon: 'mdi-plus', text: 'Export', url: { name: 'users-index' } },
          { icon: 'mdi-plus', text: 'Print', url: { name: 'users-index' } },
          { icon: 'mdi-plus', text: 'Undo changes', url: { name: 'users-index' } },
          { icon: 'mdi-plus', text: 'Other contacts', url: { name: 'users-index' } },
        ],
      },
      { icon: 'fas fa-cog', text: 'Setting', url: { name: 'users-index' } },
    ],
  }),
  computed: {
    drawer: {
      get() {
        return this.$store.getters.GET_NAV_DRAWER;
      },
      set() {},
    },
  },
};
</script>

<style scoped>

</style>
