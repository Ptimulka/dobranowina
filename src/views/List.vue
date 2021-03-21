<template>
  <v-container>

    <v-expansion-panels multiple v-if="!isLoadingQuestions">
      <v-expansion-panel
        class="year-ep"
        v-for="questionsYear in questionsYearsToLoad"
        :key="questionsYear"
      >

        <template>
          <v-expansion-panel-header>
            <h2 class="display-2">{{ questionsYear }}</h2>
          </v-expansion-panel-header>
          <v-expansion-panel-content>

            <v-expansion-panels multiple>
              <v-expansion-panel
                v-for="livestream in questions.getQuestions(questionsYear)['livestreams']"
                :key="livestream.date"
                class="livestream-ep"
              >
                <v-expansion-panel-header>
                  <h2 class="headline">{{ livestream.dateread }}</h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-btn :href="livestream.link" text large class="my-2"><v-icon>mdi-play</v-icon>Obejrzyj</v-btn>
                  <v-expansion-panels multiple accordion>
                    <v-expansion-panel
                      v-for="question in livestream['questions']"
                      :key="question.question"
                    >
                      <v-expansion-panel-header>
                        <h2 class="title">{{ question.question }}</h2>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <div class="px-4">
                          <h4 class="pb-5" v-if="question.timelink">
                            <a :href="question.timelink">{{ question.timelink }}</a>
                          </h4>
                          <span v-html="question.answer"></span>
                        </div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>

                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

          </v-expansion-panel-content>
        </template>

      </v-expansion-panel>
    </v-expansion-panels>

    <v-skeleton-loader
      v-else
      type="card-heading"
    ></v-skeleton-loader>

  </v-container>
</template>


<script>
import QuestionsData from '@/questions/questions-data';

export default {
  data() {
    return {
      questionsYearsToLoad: ['2017','2020','2021'],
      isLoadingQuestions: true,
      questions: QuestionsData
    }
  },
  async created() {
    // load questions
    await this.questions.loadYears(this.questionsYearsToLoad);
    this.isLoadingQuestions = false;
  },
  methods: {
  },
  computed: {
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
