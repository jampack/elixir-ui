<template>
  <ValidationObserver ref="loginForm" v-slot="{}">
    <v-form>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <ValidationProvider name="username" rules="required" v-slot="{ errors }">
            <v-text-field
              :error-messages="errors[0]"
              label="Title"
              outlined
            />
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <ValidationProvider name="description" v-slot="{ errors }">
            <v-textarea
              :error-messages="errors[0]"
              label="Description"
              outlined
              />
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <ValidationProvider name="type" rules="required" v-slot="{ errors }">
            <v-select
              :items="cardTypes"
              :error-messages="errors[0]"
              :menu-props="{ bottom: true, offsetY: true }"
              item-text="name"
              item-value="value"
              label="Card Type"
              outlined
            >
              <template v-slot:item="{ item }">
                <span>
                  <v-icon
                    :color="item.color"
                    small
                    left>
                    {{item.icon}}
                  </v-icon>
                  {{item.name}}
                </span>
              </template>
            </v-select>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <ValidationProvider name="task_type" rules="required" v-slot="{ errors }">
            <v-autocomplete
              :items="taskTypes"
              :error-messages="errors[0]"
              :menu-props="{ bottom: true, offsetY: true }"
              :loading="$apollo.queries.taskTypes.loading"
              item-text="name"
              item-value="id"
              label="Task Type"
              outlined
            />
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <v-row class="no-gutters">
            <v-spacer />
            <v-btn
              class="mr-2 mt-n3"
              depressed>
              Create
            </v-btn>
          </v-row>
        </v-col>

      </v-row>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { CardTaskTypesQuery } from '@/GraphQL/queries/CardQueries';

export default {
  name: 'CreateCardForm',
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
  data: () => ({
    cardTypes: [
      {
        name: 'Task', value: '1', icon: 'fas fa-tasks', color: 'green',
      },
      {
        name: 'Epic', value: '2', icon: 'fas fa-bolt', color: 'blue',
      },
      {
        name: 'Story', value: '3', icon: 'far fa-bookmark', color: 'purple',
      },
    ],
  }),
  apollo: {
    taskTypes: {
      query: CardTaskTypesQuery,
      variables() {
        return {
          boardId: this.boardId,
        };
      },
      update: (data) => data.cardTaskTypes,
    },
  },
};
</script>

<style scoped>

</style>
