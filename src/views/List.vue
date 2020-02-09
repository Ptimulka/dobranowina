<template>
  <v-container>

    <v-expansion-panels multiple>
      <v-expansion-panel
        class="year-ep"
        v-for="questionsYear in questionsToLoad"
        :key="questionsYear"
      >

        <template v-if="!isLoading[questionsYear]">
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
        </template>

        <v-skeleton-loader
          v-else
          type="card-heading"
        ></v-skeleton-loader>

      </v-expansion-panel>
    </v-expansion-panels>

  </v-container>
</template>


<script>
import QuestionsData from '@/questions/questions-data';

export default {
  data() {
    return {
      questionsToLoad: ['2017','2020'],
      questions: QuestionsData
    }
  },
  created() {
    this.questionsToLoad.forEach(questionsYear => {
      this.questions.loadYear(questionsYear);
    });
  },
  methods: {
  },
  computed: {
    isLoading() {
      return this.questionsToLoad.reduce((obj, questionsYear) => {
         obj[questionsYear] = !this.questions.isLoaded(questionsYear)
         return obj
       }, {})
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
