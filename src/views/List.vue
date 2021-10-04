<template>
  <v-container>
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
                        <v-icon color="primary" v-bind="attrs" v-on="on">mdi-clock-outline</v-icon>
                      </template>
                      <span>Pytania z tego livestreama zawierają linki czasowe</span>
                    </v-tooltip>
                    <v-tooltip v-if="livestream.hasallanswers" right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon color="primary" v-bind="attrs" v-on="on">mdi-text-box-outline</v-icon>
                      </template>
                      <span>Spisano odpowiedzi do pytań z tego livestreama</span>
                    </v-tooltip>
                    <v-tooltip v-if="!livestream.hasallanswers && livestream.hassomeanswers" right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon color="grey" v-bind="attrs" v-on="on">mdi-text-box-outline</v-icon>
                      </template>
                      <span>Spisano odpowiedzi do niektórych pytań z tego livestreama</span>
                    </v-tooltip>
                  </h6>
                </v-col>
                <v-col cols="auto">
                  <v-btn small
                    :href="livestream.link"
                    rounded
                    :color="buttonColorFromPlatform(livestream.platform)"
                    target="_blank"
                  >
                  <v-icon>
                    {{ livestream.platform === "FB" ? "mdi-facebook" : "mdi-youtube" }}
                  </v-icon>
                    Obejrzyj na {{ livestream.platform }}<v-icon>mdi-open-in-new</v-icon>
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
                      <v-icon color="primary" v-bind="attrs" v-on="on">mdi-clock-outline</v-icon>
                    </template>
                    <span>To pytanie zawiera link czasowy</span>
                  </v-tooltip>
                  <v-tooltip v-if="question.answer" right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="primary" v-bind="attrs" v-on="on">mdi-text-box-outline</v-icon>
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
                  </v-card-subtitle>
                  <v-card-text>
                    <v-btn
                      v-if="question.timelink"
                      :href="question.timelink"
                      rounded
                      :color="buttonColorFromPlatform(livestream.platform)"
                      target="_blank"
                    >
                    <v-icon>
                      {{ livestream.platform === "FB" ? "mdi-facebook" : "mdi-youtube" }}
                    </v-icon>
                      Obejrzyj na {{ livestream.platform }}<v-icon>mdi-open-in-new</v-icon>
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

    <h2 class="mt-5 pb-1 subtitle-1 text-center">
        <v-icon color="primary">mdi-clock-outline</v-icon> - Livestream zawiera link czasowy
    </h2>
    <h2 class="pb-1 subtitle-1 text-center">
      <v-icon color="primary" v-bind="attrs" v-on="on">mdi-text-box-outline</v-icon> - Spisano odpowiedzi na pytania
    </h2>
    <h2 class="pb-5 subtitle-1 text-center">
      <v-icon color="grey" v-bind="attrs" v-on="on">mdi-text-box-outline</v-icon> - Częściowo spisano odpowedzi na pytania
    </h2>

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
    buttonColorFromPlatform: function(platform) {
      if(platform === "FB") {
        return "facebookblue";
      } else {
        return "red";
      }
    }
  },
  computed: {
  }
}
</script>
<style>

.container {
  padding: 12px 0;
}

</style>
