<template>
  <ValidationObserver ref="loginForm" v-slot="{ handleSubmit }">
    <v-form>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <ValidationProvider name="title" rules="required|max:1500" v-slot="{ errors }">
            <v-text-field
              v-model="title"
              :error-messages="errors[0]"
              label="Title"
              outlined
            />
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <ValidationProvider name="description" rules="max:10000" v-slot="{ errors }">
            <v-textarea
              v-model="description"
              :error-messages="errors[0]"
              label="Description"
              outlined
              />
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <ValidationProvider name="type" rules="required" v-slot="{ errors }">
            <v-select
              v-model="cardType"
              :items="cardTypeItems"
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
        <v-col cols="12" sm="12" md="12" v-if="isTaskTypeVisible">
          <ValidationProvider name="task_type_id" rules="required" v-slot="{ errors }">
            <v-autocomplete
              v-model="taskType"
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
              :loading="loading"
              depressed
              @click="handleSubmit(submit)">
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
import { CreateCardMutation } from '@/GraphQL/mutations/CardMutations';

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
    title: '',
    description: '',
    cardType: 'TASK',
    taskType: null,
    cardTypeItems: [
      {
        name: 'Task', value: 'TASK', icon: 'fas fa-tasks', color: 'green',
      },
      {
        name: 'Epic', value: 'EPIC', icon: 'fas fa-bolt', color: 'blue',
      },
      {
        name: 'Story', value: 'STORY', icon: 'far fa-bookmark', color: 'purple',
      },
    ],
    loading: false,
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
  computed: {
    isTaskTypeVisible() {
      return this.cardType !== 'STORY' && this.cardType !== 'EPIC';
    },
  },
  methods: {
    submit() {
      this.loading = true;
      this.$apollo.mutate({
        mutation: CreateCardMutation,
        variables: {
          title: this.title,
          description: this.description,
          type: this.cardType,
          taskTypeId: this.taskType,
          boardId: this.boardId,
          boardColumnId: this.boardColumnId,
        },
      }).then((response) => {
        const { createCard: { id } } = response.data;
        if (id) {
          this.$emit('success');
        } else {
          console.warn('Unexpected Result: ', response);
        }
      }).catch((error) => {
        const { graphQLErrors } = error;
        const gqlError = graphQLErrors[0];
        if (gqlError.extensions.category === 'validation') {
          const validationErrors = gqlError.extensions.validation;
          Object.keys(validationErrors).forEach((key) => {
            this.$refs.loginForm.setErrors({
              [key]: validationErrors[key][0],
            });
          });
        } else if (gqlError.extensions.category === 'authentication') {
          this.$refs.loginForm.setErrors({
            password: 'Password is incorrect',
          });
        } else {
          console.error('Error: ', error);
        }
      }).finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>

</style>
