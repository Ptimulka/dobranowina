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
  getPreviousQuestion: function(year, livestreamIndex, questionIndex) {

    if(year == '2017' && livestreamIndex == 1 && questionIndex == 0)
      return null;

    let yearObject = this.getQuestions(year);

    let prevYear = year;
    let prevQuestionIndex = questionIndex - 1;
    let prevLivestremIndex = livestreamIndex;

    if(prevQuestionIndex < 0) {
      prevLivestremIndex = prevLivestremIndex - 1;

      if(prevLivestremIndex >= 0) {
        prevQuestionIndex = yearObject.livestreams[prevLivestremIndex].length - 1;
      }
      else {
        prevYear = this.getPreviousYear(year);
        let prevYearObject = this.getQuestions(prevYear);
        prevLivestremIndex = prevYearObject.livestreams.length - 1;
        prevQuestionIndex = prevYearObject.livestreams[prevLivestremIndex].questions.length - 1;
      }

    }

    return {
      "year": prevYear,
      "livestreamIndex": prevLivestremIndex,
      "questionIndex": prevQuestionIndex
    }

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
