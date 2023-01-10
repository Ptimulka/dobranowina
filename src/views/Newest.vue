<template>
  <v-container>
    <v-card class="my-5" v-if="!isLoadingQuestions">
      <h1 class="py-5 headline text-center">Najnowsze filmy Q&amp;A</h1>

      <v-row no-gutters>
        <v-col
          v-for="livestream in newestLivestreams"
          :key="'newest' + livestream.date"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <div
            class="pa-2"
            outlined
            tile
          >
            <v-btn
              large block color="primary"
              :href="livestream.link"
              target="_blank"
              class="my-2">
             {{ livestream.dateread }}<v-icon>mdi-open-in-new</v-icon>
            </v-btn>
            <template>
              <LazyYoutube :src="livestream.link" />
            </template>
              <div
                v-for="question in livestream.questions.slice(0, listQuestionsForEachLivestreamN)"
                :key="'qil' + question.question"
              >
                <v-icon>mdi-arrow-right</v-icon>{{ question.question }}
              </div>
          </div>
        </v-col>
      </v-row>
    </v-card>

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
      questionsYearsToLoad: ['2017','2020','2021','2022','2023'],
      lastYear: '2023',
      lastLastYear: '2022',
      showLastN: 12,
      listQuestionsForEachLivestreamN: 7,
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
    newestLivestreams() {
      if(this.isLoadingQuestions) {
        return [];
      }
      else {
        let newest = this.questions.getQuestions(this.lastYear)['livestreams'];
        if(newest.length < this.showLastN) {
          let prevYear = this.questions.getQuestions(this.lastLastYear)['livestreams'].slice(newest.length - this.showLastN).reverse();
          let currYear = [...newest].reverse();
          return currYear.concat(prevYear);
        }
        else return newest.slice(-this.showLastN).reverse()
      }
    }
  }
}
</script>
<style>

.container {
  padding: 12px 0;
}

</style>
