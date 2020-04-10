<template>
  <v-card outlined>
    <v-toolbar class="cursor-pointer" flat @click="card = !card">
      <v-toolbar-title class="select-none">
        Attendance
      </v-toolbar-title>
      <v-spacer />
      <v-btn depressed icon @click="card = !card">
        <v-icon>
          {{card ? 'fas fa-angle-up' : 'fas fa-angle-down'}}
        </v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider />
    <v-list v-if="card" dense>
      <v-list-item @click="manageAttendanceDialog = true">
        <v-list-item-content>
          <v-list-item-title>Schemes</v-list-item-title>
          <v-list-item-subtitle>
            Create new attendance schemes or manage existing ones
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>1400 Main Street</v-list-item-title>
          <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>1400 Main Street</v-list-item-title>
          <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <manage-attendance-dialog v-model="manageAttendanceDialog"/>
  </v-card>
</template>

<script>
import ManageAttendanceDialog from '@/components/dialogs/settings/ManageAttendance.vue';

export default {
  name: 'Attendance',
  components: {
    'manage-attendance-dialog': ManageAttendanceDialog,
  },
  data: () => ({
    card: false,
    manageAttendanceDialog: false,
  }),
};
</script>

<style scoped>

</style>
