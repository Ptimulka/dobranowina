<template>
  <v-container>
    <v-card class="my-5">
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

    <div class="mt-5">
      <h1 class="py-5 headline text-center">Pełna lista Q&amp;A</h1>
      <h2 class="pb-5 subtitle-1 text-center">Wybierz rok aby rozwinąć listę livestreamów</h2>
    </div>

    <v-list v-if="!isLoadingQuestions">

      <!-- years -->
      <v-list-group
        v-for="questionsYear in questionsYearsToLoad"
        :key="'listitem' + questionsYear">

        <template v-slot:activator>
          <v-list-item-title class="py-2">
            <h1 class="display-2">{{ questionsYear }}</h1>
          </v-list-item-title>
        </template>
        <!-- dates -->
        <v-list-group sub-group
          v-for="livestream in questions.getQuestions(questionsYear)['livestreams']"
          :key="'listitemsub' + livestream.date">

          <template v-slot:activator>
            <v-list-item-title>
              <v-row>
                <v-col cols="auto" class="mr-auto">
                  <h6 class="title">
                    {{ livestream.dateread }}
                    <v-tooltip v-if="livestream.hastimelinks" right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">mdi-clock-outline</v-icon>
                      </template>
                      <span>Pytania z tego livestreama zawierają linki czasowe</span>
                    </v-tooltip>
                    <v-tooltip v-if="livestream.hasanswers" right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">mdi-text-box-outline</v-icon>
                      </template>
                      <span>Spisano odpowiedzi do pytań z tego livestreama</span>
                    </v-tooltip>
                    <v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">
                          {{ livestream.platform === "FB" ? "mdi-facebook" : "mdi-youtube" }}
                        </v-icon>
                      </template>
                      <span>Ten livestream znajduje się na {{ livestream.platform }}</span>
                    </v-tooltip>
                  </h6>
                </v-col>
                <v-col cols="auto">
                  <v-btn small
                    :href="livestream.link"
                    rounded
                    color="primary"
                    target="_blank"
                  >Obejrzyj na {{ livestream.platform }}<v-icon>mdi-open-in-new</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item-title>
          </template>
          <!-- questions -->
          <v-list-item
            v-for="question in livestream['questions']"
            :key="'listitemsubsub' + question.question"
          >
            <v-dialog
              transition="dialog-bottom-transition"
              max-width="600"
            >
              <template v-slot:activator="{ on, attrs }">
                <p class="body-1" v-bind="attrs" v-on="on">
                  <v-icon color="primary">mdi-arrow-right</v-icon>
                  {{ question.question }}
                  <v-tooltip v-if="question.timelink" right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on">mdi-clock-outline</v-icon>
                    </template>
                    <span>To pytanie zawiera link czasowy</span>
                  </v-tooltip>
                  <v-tooltip v-if="question.answer" right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on">mdi-text-box-outline</v-icon>
                    </template>
                    <span>Spisano odpowiedź na to pytanie</span>
                  </v-tooltip>
                </p>
              </template>
              <template v-slot:default="dialog">
                <!-- dialog window with quesion -->
                <v-card>
                  <v-card-title color="primary">
                    {{ question.question }}
                  </v-card-title>
                  <v-card-subtitle class="mt-1">
                    {{ livestream.dateread + ' ' + questionsYear }}
                    <v-icon>
                      {{ livestream.platform === "FB" ? "mdi-facebook" : "mdi-youtube" }}
                    </v-icon>
                  </v-card-subtitle>
                  <v-card-text>
                    <v-btn
                      v-if="question.timelink"
                      :href="question.timelink"
                      rounded
                      color="primary"
                      target="_blank"
                    >Obejrzyj na {{ livestream.platform }}<v-icon>mdi-open-in-new</v-icon>
                    </v-btn>
                    <v-divider class="my-2"></v-divider>
                    <h4 class="h4 pt-2">
                      <span v-html="question.answer ? question.answer : '[Nie spisano odpowiedzi]'">
                      </span></h4>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn text
                      @click="dialog.value = false"
                    >Zamknij</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>

          </v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>

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
      lastYear: '2021',
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
        return newest.slice(-this.showLastN).reverse()
      }
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
