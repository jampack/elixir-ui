<template>
  <div class="project-board">
    <v-col>
      <page-title title="Kanban Board">
        <v-btn depressed icon><v-icon>fas fa-sync</v-icon></v-btn>
      </page-title>
      <v-row>
        <v-col cols="12">
          <v-card shaped outlined>
            <v-toolbar flat>
              <v-toolbar-title>Manage project</v-toolbar-title>
            </v-toolbar>
            <v-divider />

            <v-row>
              <v-col cols="6">
                <v-card outlined height="100%">
                  <draggable class="list-group full-wh" :list="list1" group="people" @change="log">
                    <v-card
                      class="mx-auto"
                      v-for="(element, index) in list1"
                      :key="element.name"
                      max-width="344">
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
              <v-col cols="6">
                <v-card outlined height="100%">
                  <draggable class="list-group  full-wh" :list="list2" group="people" @change="log">
                    <v-card
                      class="mx-auto"
                      v-for="(element, index) in list2"
                      :key="element.name"
                      max-width="344">
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

export default {
  name: 'ViewProjectBoard',
  components: {
    'page-title': PageTitle,
    draggable,
  },
  data() {
    return {
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
    };
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

</style>
