<template>
  <v-dialog :value="value" persistent max-width="600px">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>Create Project</v-toolbar-title>
        <v-spacer />
        <v-btn icon rounded><v-icon>fas fa-times</v-icon></v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Legal first name*"
                required
                outlined />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Legal middle name"
                hint="example of helper text only on focus"
                outlined/>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Legal last name*"
                persistent-hint
                required
                outlined />
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Email*"
                required
                outlined />
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password*"
                type="password"
                required
                outlined />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Age*"
                required
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey',]"
                label="Interests"
                multiple
                outlined
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
        <v-btn color="blue darken-1" text>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ModalControlMixin from '@/mixins/ModalControl';

export default {
  name: 'Create',
  mixins: [ModalControlMixin],
};
</script>

<style scoped>

</style>
