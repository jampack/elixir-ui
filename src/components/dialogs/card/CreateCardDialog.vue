<template>
  <v-dialog :value="value" transition="dialog-bottom-transition" fullscreen persistent hide-overlay>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>Create Card</v-toolbar-title>
        <v-spacer />
        <v-btn icon rounded @click="closeDialog"><v-icon>fas fa-times</v-icon></v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <create-card-form
              :boardId="boardId"
              :boardColumnId="boardColumnId"
              v-on:success="closeDialog"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import ModalControlMixin from '@/mixins/ModalControl';
import CreateCardForm from '@/components/forms/card/CreateCardForm.vue';

export default {
  name: 'CreateCardDialog',
  mixins: [ModalControlMixin],
  components: {
    'create-card-form': CreateCardForm,
  },
  props: {
    boardId: {
      type: String,
      required: true,
    },
    boardColumnId: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
