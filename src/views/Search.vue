<template>
  <v-container>

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
            ></v-text-field>
        </v-col>
        <v-col class="px-3" cols="12" sm="12" md="3">
           <v-btn type="submit" :loading="isLoadingQuestions || isLoadingSearchDict || isSearching" large block color="primary" class="my-2">Szukaj</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-card v-for="question in searchResult" :key="question.question" class="my-5">
      <v-card-title>{{ question.question }}</v-card-title>
      <v-card-subtitle>{{ question.date }}</v-card-subtitle>
      <v-card-text><span v-html="question.answer"></span></v-card-text>
    </v-card>

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
            livestream['questions'].forEach(question => {

              regexps.forEach(regexp => {
                let res = question.question.match(regexp);
                if(res != null) {

                  var item = {}
                  item['question'] = question['question'];
                  item['answer'] = question['answer'];
                  item['date'] = livestream['dateread'] + ' ' + questionsYear;
                  if(!this.searchResult.some(it => it.question == item.question)) {
                    this.searchResult.push(item);
                    console.log(res);
                  }
                }
              });
            });
          });

        });
        this.isSearching = false;
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
    }

  }
}
</script>
