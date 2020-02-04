<template>
  <v-container>
    <v-card v-if="isLoading">
        <v-card-text align="center" justify="center">
          <v-progress-circular
            class="my-5"
            indeterminate color="primary"
          ></v-progress-circular>
          <h2 class="primary--text my-5">
            Ładowanie pytań
          </h2>
      </v-card-text>
    </v-card>

    <v-expansion-panels multiple v-if="!isLoading">
      <v-expansion-panel class="year-ep">
        <v-expansion-panel-header>
          <h2 class="display-2">2017</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>

          <v-expansion-panels multiple>
            <v-expansion-panel
              v-for="livestream in questions.allQuestions['q2017']['livestreams']"
              :key="livestream.date"
              class="livestream-ep"
            >
              <v-expansion-panel-header>
                <h2 class="headline">{{ livestream.dateread }}</h2>
              </v-expansion-panel-header>
              <v-expansion-panel-content>

                <v-expansion-panels multiple accordion>
                  <v-expansion-panel
                    v-for="question in livestream['questions']"
                    :key="question.question"
                  >
                    <v-expansion-panel-header>
                      <h2 class="title">{{ question.question }}</h2>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <span v-html="question.answer"></span>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>

              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

  </v-container>
</template>


<script>
import QuestionsData from '@/questions/questions-data';

export default {
  data() {
    return {
      questions: QuestionsData
    }
  },
  created() {
    this.questions.loadQYear('q2017');
  },
  methods: {
  },
  computed: {
    isLoading() {
      return !this.questions.isLoaded('q2017');
    }
  }
}
</script>
<style>

.container {
  padding: 12px 0;
}

.v-expansion-panels .v-expansion-panel.year-ep {
    background-color: var(--v-primary-lighten1);
}

.v-expansion-panels .v-expansion-panel.livestream-ep {
    background-color: var(--v-primary-lighten2);
}

.v-expansion-panel-content__wrap {
  padding: 0 10px 16px;
}

</style>
