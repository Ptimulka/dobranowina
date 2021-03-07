import todoLivestreams from "@/assets/questions/todo.json";
import topWords from "@/assets/questions/topWords.json";

var QuestionsData = {

  todos: todoLivestreams,
  topWords: topWords,
  loadYears: async function(years) {
    for (let i = 0; i < years.length; i++) {
      let year = years[i];
      if(!this.isLoaded[year]) {
        let qyear = 'q' + year;
        let importedQuestionsForYear = await import('@/assets/questions/' + year + '.json');
        this.allQuestions[qyear] = importedQuestionsForYear;
      }
    }
  },
  allQuestions: {
    'q2017': null,
    'q2020': null,
    'q2021': null
  },
  getQuestions: function(year) {
    let qyear = 'q' + year;
    return this.allQuestions[qyear];
  },
  isLoaded: function(year) {
    let qyear = 'q' + year;
    return this.allQuestions[qyear] != null;
  },
}

export default QuestionsData;
