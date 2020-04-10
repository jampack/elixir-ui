<template>
  <v-dialog :value="value" transition="dialog-bottom-transition" fullscreen persistent hide-overlay>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>Manage Attendance Schemes</v-toolbar-title>
        <v-spacer />
        <v-btn icon rounded @click="closeDialog"><v-icon>fas fa-times</v-icon></v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <create-attendance-scheme-from />
          </v-col>
          <v-col cols="12" lg="6">
            <attendance-schemes-table />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import ModalControlMixin from '@/mixins/ModalControl';
import AttendanceSchemesTable from '@/components/tables/settings/AttendanceSchemes.vue';
import CreateAttendanceSchemeForm from '@/components/forms/settings/attendanceScheme/Create.vue';

export default {
  name: 'ManageAttendanceDialog',
  mixins: [ModalControlMixin],
  components: {
    'attendance-schemes-table': AttendanceSchemesTable,
    'create-attendance-scheme-from': CreateAttendanceSchemeForm,
  },
};
</script>

<style scoped>

</style>
