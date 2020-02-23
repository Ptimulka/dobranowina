<template>
  <v-container>

    <h5 class="text-center">Liczba wszystkich pytań: {{ allQUestionsNumber }} </h5>

    <v-form  @submit.prevent="searchQuestions">
      <v-row no-gutters class="mt-5">
        <v-col class="px-3" cols="12" sm="12" md="9">
          <v-text-field
              hide-details
              solo
              placeholder="Wpisz np. 'modlitwa'"
              prepend-icon="mdi-magnify"
              class="my-1"
              v-model="searchQuery"
              :disabled="isLoadingQuestions || isLoadingSearchDict"
            ></v-text-field>
        </v-col>
        <v-col class="px-3" cols="12" sm="12" md="3">
           <v-btn type="submit" :loading="isLoadingQuestions || isLoadingSearchDict || isSearching" large block color="primary" class="my-2">Szukaj</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-card v-for="result in searchResult" :key="result.id" class="my-5">
       <v-card-title><span v-html="result.question"></span></v-card-title>
       <v-card-subtitle>{{ result.date }}</v-card-subtitle>
      <v-card-text><span v-html="result.answer"></span></v-card-text>
    </v-card>

    <h5 class="text-center mt-5">{{ messageAtTheBottom }} </h5>

  </v-container>
</template>

<script>
import QuestionsData from '@/questions/questions-data';
import SearchHelper from '@/questions/search-helper';

export default {
  data() {
    return {
      searchQuery: "",
      questionsToLoad: ['2017','2020'],
      questions: QuestionsData,
      searchHelper: SearchHelper,
      isSearching: false,
      lastSearchNoResults: false,
      searchResult: []
    }
  },
  created() {
    this.questionsToLoad.forEach(questionsYear => {
      this.questions.loadYear(questionsYear);
    });
    this.searchHelper.init();
  },
  methods: {
    searchQuestions: function() {
      if(!this.isLoadingQuestions && !this.isLoadingSearchDict) {
        let regexps = this.searchHelper.searchQuestions(this.searchQuery);

        this.isSearching = true;
        this.searchResult = [];

        this.questionsToLoad.forEach(questionsYear => {
          this.questions.getQuestions(questionsYear)['livestreams'].forEach(livestream => {
            livestream['questions'].forEach((question, index) => {
              let id = livestream.date + "_" + index;
              regexps.forEach(regexp => {
                if(!this.searchResult.some(it => it.id == id)) {
                  let res = question.question.match(regexp);
                  if(res != null) {
                    let result = {};
                    result["id"] = id;
                    result['question'] = question.question.substr(0, res.index) +
                                          '<span class="highlightText">' +
                                          res[0] +
                                          '</span>' +
                                          question.question.substr(res.index + res[0].length);
                    result['answer'] = question.answer;
                    result['date'] = livestream.dateread + ' ' + questionsYear;

                    this.searchResult.push(result);
                  }
                }
              });
            });
          });

        });
        this.isSearching = false;
        if(this.searchResult.length == 0)
          this.lastSearchNoResults = true;
        else
          this.lastSearchNoResults = false;
      }
    }
  },
  computed: {
    isLoadingQuestions() {
      return this.questionsToLoad.reduce((isLoading, questionsYear) => {
        if(isLoading) return true;
        else return !this.questions.isLoaded(questionsYear)
       }, false)
    },
    isLoadingSearchDict() {
      return !this.searchHelper.isLoaded();
    },
    allQUestionsNumber() {
      if(this.isLoadingQuestions)
        return 0;
      else {
        let ret = 0;
        this.questionsToLoad.forEach(questionsYear => {
          this.questions.getQuestions(questionsYear)['livestreams'].forEach(livestream => {
            ret = ret + livestream['questions'].length;
          });
        });
        return ret;
      }
    },
    messageAtTheBottom() {
      if(this.isSearching)
        return "Szukam...";
      else if(this.isLoadingQuestions || this.isLoadingSearchDict)
        return "Ładowanie...";
      else if(this.lastSearchNoResults)
        return "Brak wyników";
      else if(this.searchResult.length > 0)
        return "Koniec wyników";
      else return "";
    }

  }
}
</script>
<style>
    .highlightText {
        background: yellow;
    }
</style>
