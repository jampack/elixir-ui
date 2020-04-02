<template>
  <v-dialog :value="value" persistent max-width="600px">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>Create User</v-toolbar-title>
        <v-spacer />
        <v-btn icon rounded @click="closeDialog"><v-icon>fas fa-times</v-icon></v-btn>
      </v-toolbar>
      <v-card-text>
        <create-user-form v-on:success="closeDialog"/>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import ModalControlMixin from '@/mixins/ModalControl';
import CreateUserForm from '@/components/forms/user/Create.vue';

export default {
  name: 'CreateUserDialog',
  mixins: [ModalControlMixin],
  components: {
    'create-user-form': CreateUserForm,
  },
};
</script>

<style scoped>

</style>
