<template>
  <div class="project-board">
    <v-col>

      <page-title title="Kanban Board">
        <v-btn depressed icon><v-icon>fas fa-sync</v-icon></v-btn>
      </page-title>

      <v-row>
        <v-col cols="12">
          <v-card shaped outlined>
            <v-row>

              <v-col
                v-for="column in board.columns.data"
                :key="column.id"
                style="min-width: 300px; height: 100%">

                <v-card class="mx-4" flat>
                  <v-toolbar flat>
                    <v-toolbar-title>
                      {{column.name}}
                    </v-toolbar-title>
                    <v-spacer />
                    <v-btn icon>
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
                          well meaning and kindly.<br>
                          "a benevolent smile"
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

<!--              <v-col  style="min-width: 300px; height: 100%">-->
<!--                <draggable-->
<!--                  :list="list2"-->
<!--                  class="list-group full-wh"-->
<!--                  group="people"-->
<!--                  @change="log"-->
<!--                  ghost-class="ghost">-->
<!--                  <v-card-->
<!--                    class="mx-auto"-->
<!--                    v-for="(element, index) in list2"-->
<!--                    :key="element.name"-->
<!--                    max-width="344">-->
<!--                    <v-card-text>-->
<!--                      <div>card {{index}}</div>-->
<!--                      <p class="display-1 text&#45;&#45;primary">-->
<!--                        {{element.name}}-->
<!--                      </p>-->
<!--                      <p>adjective</p>-->
<!--                      <div class="text&#45;&#45;primary">-->
<!--                        well meaning and kindly.<br>-->
<!--                        "a benevolent smile"-->
<!--                      </div>-->
<!--                    </v-card-text>-->
<!--                    <v-card-actions>-->
<!--                      <v-btn-->
<!--                        text-->
<!--                        color="deep-purple accent-4"-->
<!--                      >-->
<!--                        Learn More-->
<!--                      </v-btn>-->
<!--                    </v-card-actions>-->
<!--                  </v-card>-->
<!--                </draggable>-->
<!--              </v-col>-->

            </v-row>

          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import PageTitle from '@/components/core/PageTitle.vue';
import draggable from 'vuedraggable';
import { GetProjectBySlugQuery } from '@/GraphQL/queries/ProjectQueries';
import { GetProjectMasterBoard } from '@/GraphQL/queries/BoardQueries';

export default {
  name: 'ViewProjectBoard',
  components: {
    'page-title': PageTitle,
    draggable,
  },
  data: () => ({
    list1: [
      { name: 'John', id: 1 },
      { name: 'Joao', id: 2 },
      { name: 'Jean', id: 3 },
      { name: 'Gerard', id: 4 },
    ],
    list2: [
      { name: 'Juan', id: 5 },
      { name: 'Edgard', id: 6 },
      { name: 'Johnson', id: 7 },
    ],
    project: '',
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
