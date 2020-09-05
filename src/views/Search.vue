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
              :disabled="isLoadingQuestions || isSearching"
            ></v-text-field>
        </v-col>
        <v-col class="px-3" cols="12" sm="12" md="3">
           <v-btn
            type="submit"
            :loading="isLoadingQuestions"
            large block color="primary"
            class="my-2">
            {{ buttonText }}</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters class="mt-1">
        <v-col class="px-3" cols="12" sm="6" md="4">
          <v-checkbox v-model="searchAlsoInAnswers" label="Szukaj także w odpowiedziach"></v-checkbox>
        </v-col>
        <v-col class="px-3" cols="12" sm="6" md="4">
          <v-checkbox v-model="searchExactPhase" label="Szukaj dokładnej frazy"></v-checkbox>
        </v-col>
        <v-col cols="12" sm="3" md="3"></v-col>
      </v-row>
    </v-form>

    <v-card v-for="result in searchResultSorted" :key="result.id" class="my-5">
       <v-card-title><span v-html="result.question"></span></v-card-title>
        <v-card-subtitle>
          {{ result.date }}
          <a :href="result.timelink" v-if="result.timelink">{{ result.timelink }}</a>
          <a :href="result.link" v-else>{{ result.link }}</a>
        </v-card-subtitle>
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
      searchAlsoInAnswers: false,
      searchExactPhase: false,
      questionsToLoad: ['2017','2020'],
      questions: QuestionsData,
      searchHelper: SearchHelper,
      isSearching: false,
      lastSearchNoResults: false,
      lastSearchCanceled: false,
      searchResult: []
    }
  },
  created() {
    this.questionsToLoad.forEach(questionsYear => {
      this.questions.loadYear(questionsYear);
    });
  },
  methods: {
    searchQuestions: function() {
      if(this.isSearching) {
        this.isSearching = false;
        this.searchResult = [];
        this.lastSearchCanceled = true;
      }
      else if(!this.isLoadingQuestions) {
        this.isSearching = true;
        this.searchResult = [];
        this.lastSearchCanceled = false;
        this.searchHelper.getRegexpsForQuery(this.searchQuery, this.searchExactPhase, this.continueSearching);
      }
    },
    makeHighlightedTextFromTextAndMatches: function(text, matches) {
      var position = 0;
      let ret = "";
      for (let match of matches) {
        ret += text.substr(position, match.index - position) +
              '<span class="highlightText">' +
              match[0] +
              '</span>';
        position = match.index + match[0].length;
      }
      ret += text.substr(position);
      return ret;
    },
    continueSearching: function(regexp) {
      if(this.lastSearchCanceled) {
        this.isSearching = false;
        return;
      }
      this.searchResult = [];
      this.questionsToLoad.forEach(questionsYear => {
        this.questions.getQuestions(questionsYear)['livestreams'].forEach(livestream => {
          livestream['questions'].forEach((question, index) => {
            let id = livestream.date + "_" + index;

            let matches = [...question.question.matchAll(regexp)];
            var matchesAnswer = []
            if(this.searchAlsoInAnswers) {
              matchesAnswer = [...question.answer.matchAll(regexp)];
            }
            if(matches.length > 0 || (this.searchAlsoInAnswers && matchesAnswer.length > 0)) {
              let score = matches.reduce((score, match) => {
                return score += match[0].length;
              },0);
              let scoreAnswer = matchesAnswer.reduce((score, match) => {
                return score += match[0].length;
              },0) / 2;
              let result = {
                id: id,
                question: this.makeHighlightedTextFromTextAndMatches(question.question, matches),
                answer: this.makeHighlightedTextFromTextAndMatches(question.answer, matchesAnswer),
                timelink: question.timelink,
                link: livestream.link,
                date: livestream.dateread + ' ' + questionsYear,
                score: score + scoreAnswer
              }
              this.searchResult.push(result);
            }
          });
        });
      });
      this.isSearching = false;
      if(this.searchResult.length == 0)
        this.lastSearchNoResults = true;
      else
        this.lastSearchNoResults = false;
    }
  },
  computed: {
    isLoadingQuestions() {
      return this.questionsToLoad.reduce((isLoading, questionsYear) => {
        if(isLoading) return true;
        else return !this.questions.isLoaded(questionsYear)
       }, false)
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
    searchResultSorted() {
      let ret = [...this.searchResult];
      return ret.sort((a, b) => b.score - a.score);
    },
    messageAtTheBottom() {
      if(this.isSearching)
        return "Szukam...";
      else if(this.lastSearchCanceled)
        return "Szukanie anulowane"
      else if(this.isLoadingQuestions)
        return "Ładowanie...";
      else if(this.lastSearchNoResults)
        return "Brak wyników";
      else if(this.searchResult.length > 0)
        return "Koniec, znaleziono wyników: " + this.searchResult.length;
      else return "";
    },
    buttonText() {
      if(this.isSearching)
        return "Anuluj";
      else return "Szukaj"
    }

  }
}
</script>
<style>
    .highlightText {
        background: yellow;
    }
    .v-card__text, .v-card__title {
        word-break: normal !important;
    }
</style>
