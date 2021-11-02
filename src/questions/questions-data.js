import todoLivestreams from "@/assets/questions/todo.json";
import topWords from "@/assets/questions/topWords.json";

var QuestionsData = {

  todos: todoLivestreams,
  topWords: topWords,
  loadYears: async function(years) {
    for (let i = 0; i < years.length; i++) {
      let year = years[i];
      if(!this.isLoaded(year)) {
        let qyear = 'q' + year;
        let importedQuestionsForYear = await import('@/assets/questions/' + year + '.json');
        this.setDerivedProperties(importedQuestionsForYear);
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
  setDerivedProperties: function(questionsObject) {
    questionsObject.livestreams.forEach(livestream => {
      livestream.hastimelinks = livestream.questions.every(q => q.timelink ? true : false);
      livestream.hasallanswers = livestream.questions.every(q => q.answer ? true : false);
      livestream.hassomeanswers = livestream.questions.some(q => q.answer ? true : false);
      livestream.platform = livestream.link.includes("facebook") ? "FB" : "YT";
    });

  },
  getQuestion: function(year, livestreamIndex, questionIndex) {
    return this.getQuestions(year).livestreams[livestreamIndex].questions[questionIndex];
  },
  getLivestream: function(year, livestreamIndex) {
    return this.getQuestions(year).livestreams[livestreamIndex];
  },
  getPreviousQuestion: function(year, livestreamIndex, questionIndex) {

    if(year == '2017' && livestreamIndex == 0 && questionIndex == 0)
      return {
        "year": null,
        "livestream": null,
        "question": null,
        "livestreamIndex": null,
        "questionIndex": null
      };

    let yearObject = this.getQuestions(year);

    let prevYear = year;
    let prevQuestionIndex = questionIndex - 1;
    let prevLivestreamIndex = livestreamIndex;

    if(prevQuestionIndex < 0) {
      prevLivestreamIndex = prevLivestreamIndex - 1;

      if(prevLivestreamIndex >= 0) {
        prevQuestionIndex = yearObject.livestreams[prevLivestreamIndex].questions.length - 1;
      }
      else {
        prevYear = this.getPreviousYear(year);
        let prevYearObject = this.getQuestions(prevYear);
        prevLivestreamIndex = prevYearObject.livestreams.length - 1;
        prevQuestionIndex = prevYearObject.livestreams[prevLivestreamIndex].questions.length - 1;
      }
    }

    return {
      "year": prevYear,
      "livestream": this.getLivestream(prevYear, prevLivestreamIndex),
      "question": this.getQuestion(prevYear, prevLivestreamIndex, prevQuestionIndex),
      "livestreamIndex": prevLivestreamIndex,
      "questionIndex": prevQuestionIndex
    };
  },
  getPreviousYear: function(year) {
    if(year == '2020')
      return '2017';
    if(year == '2021')
      return '2020';
    else return null;
  }
}

export default QuestionsData;
