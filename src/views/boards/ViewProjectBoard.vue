<template>
  <div class="project-board">
    <v-col>

      <page-title title="Kanban Board">
        <v-btn depressed icon><v-icon>fas fa-sync</v-icon></v-btn>
      </page-title>

      <v-row>
        <v-col cols="12">
          <v-card shaped outlined style="overflow-x: scroll; overflow-y: scroll">
            <div class="d-inline-flex" style="overflow-x: scroll">

              <v-col
                v-for="column in board.columns.data"
                :key="column.id"
                style="min-width: 400px; max-width: 450px;">

                <v-card class="mx-4" flat>
                  <v-toolbar flat>
                    <v-toolbar-title>
                      {{column.name}}
                    </v-toolbar-title>
                    <v-spacer />
                    <v-btn icon v-if="column.is_primary" @click="createCardDialog = true">
                      <v-icon>
                        fas fa-plus
                      </v-icon>
                    </v-btn>
                  </v-toolbar>

                  <v-divider />

                  <draggable
                    :list="list1"
                    class="list-group"
                    group="people"
                    @change="log"
                    ghost-class="ghost">
                    <v-card
                      class="my-4"
                      v-for="(element, index) in list1"
                      :key="element.name">
                      <v-card-text>
                        <div>card {{index}}</div>
                        <p class="display-1 text--primary">
                          {{element.name}}
                        </p>
                        <p>adjective</p>
                        <div class="text--primary">
                          well meaning and kindly. "a benevolent smile"
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          text
                          color="deep-purple accent-4"
                        >
                          Learn More
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </draggable>
                </v-card>
              </v-col>
            </div>

          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <create-card-dialog
      v-if="!queriesLoading"
      v-model="createCardDialog"
      :boardId="board.id"
      :boardColumnId="columnId"
    />

  </div>
</template>

<script>
import PageTitle from '@/components/core/PageTitle.vue';
import CreateCardDialog from '@/components/dialogs/card/CreateCardDialog.vue';
import draggable from 'vuedraggable';
import { GetProjectBySlugQuery } from '@/GraphQL/queries/ProjectQueries';
import { GetProjectMasterBoard } from '@/GraphQL/queries/BoardQueries';

import _ from 'lodash';

export default {
  name: 'ViewProjectBoard',
  components: {
    'page-title': PageTitle,
    'create-card-dialog': CreateCardDialog,
    draggable,
  },
  data: () => ({
    list1: [
      { name: 'John', id: 1 },
      { name: 'Joao', id: 2 },
      { name: 'Juan', id: 5 },
      { name: 'Edgard', id: 6 },
      { name: 'Johnson', id: 7 },
    ],
    list2: [
      { name: 'Juan', id: 5 },
      { name: 'Edgard', id: 6 },
      { name: 'Johnson', id: 7 },
    ],
    project: null,
    board: { columns: { data: {} } },
    createCardDialog: false,
  }),
  apollo: {
    project: {
      query: GetProjectBySlugQuery,
      variables() {
        return {
          slug: this.$route.params.projectSlug,
        };
      },
      update: (data) => data.projectBySlug,
    },
    board: {
      query: GetProjectMasterBoard,
      variables() {
        return {
          projectId: this.project.id,
        };
      },
      update: (data) => data.projectMasterBoard,
      skip: true,
    },
  },
  watch: {
    project(newVal) {
      if (newVal && newVal.id) {
        this.$apollo.queries.board.skip = false;
      }
    },
  },
  computed: {
    columnId() {
      if (_.isEmpty(this.board.columns.data)) return null;
      const { data } = this.board.columns;
      let columnId = null;

      data.map((d) => {
        if (d.is_primary) columnId = d.id;
        return null;
      });

      return columnId;
    },
    queriesLoading() {
      return this.$apollo.queries.board.loading || this.$apollo.queries.project.loading;
    },
  },
  methods: {
    add() {
      this.list.push({ name: 'Juan' });
    },
    replace() {
      this.list = [{ name: 'Edgard' }];
    },
    clone(el) {
      return {
        name: `${el.name} cloned`,
      };
    },
    log(evt) {
      window.console.log(evt);
    },
  },
};
</script>

<style scoped>
  .ghost {
    opacity: 1;
    background-color: #f5f5f5;
  }
</style>
