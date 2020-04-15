<template>
  <div class="projects">
    <v-col>
      <page-title title="Settings">
      </page-title>

      <v-row>
        <v-col cols="12">
          <v-card shaped outlined>
            <v-toolbar flat>
              <v-toolbar-title>Manage settings</v-toolbar-title>
            </v-toolbar>
            <v-divider />
            <v-container>
              <v-row>

                <v-col cols="12" sm="6" lg="4">
                 <v-row>
                   <v-col cols="12">
                     <attendance-card />
                   </v-col>
                   <v-col cols="12">
                     <!-- item here -->
                   </v-col>
                   <v-col cols="12">
                     <!-- item here -->
                   </v-col>
                 </v-row>
                </v-col>

                <v-col cls="12" sm="6" lg="4">
                  <v-row>
                    <v-col cols="12">
                      <!-- item here -->
                    </v-col>
                    <v-col cols="12">
                      <!-- item here -->
                    </v-col>
                    <v-col cols="12">
                      <!-- item here -->
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cls="12" sm="6" lg="4">
                  <v-row>
                    <v-col cols="12">
                      <!-- item here -->
                    </v-col>
                    <v-col cols="12">
                      <!-- item here -->
                    </v-col>
                    <v-col cols="12">
                      <!-- item here -->
                    </v-col>
                  </v-row>
                </v-col>

              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import PageTitle from '@/components/core/PageTitle.vue';
import AttendanceCard from '@/components/page/settings/Attendance.vue';

export default {
  name: 'Index',
  components: {
    'page-title': PageTitle,
    'attendance-card': AttendanceCard,
  },
  data: () => ({
    createUserDialog: false,
  }),
};
</script>

<style scoped>

</style>
