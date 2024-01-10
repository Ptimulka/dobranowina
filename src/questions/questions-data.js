import todoLivestreams from "@/assets/questions/todo.json";
import topWords from "@/assets/questions/topWords.json";

const firstYear = 2017;
const lastYear = 2024;

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
    'q2021': null,
    'q2022': null,
    'q2023': null,
    'q2024': null
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
  getEmptyQuestionObject: function() {
    return {
      "year": null,
      "livestream": null,
      "question": null,
      "livestreamIndex": null,
      "questionIndex": null
    };
  },
  getPreviousQuestion: function(year, livestreamIndex, questionIndex) {

    if(year == firstYear && livestreamIndex == 0 && questionIndex == 0)
      return this.getEmptyQuestionObject();

    let yearObject = this.getQuestions(year);

    let prevYear = year;
    let prevLivestreamIndex = livestreamIndex;
    let prevQuestionIndex = questionIndex - 1;

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
  getNextQuestion: function(year, livestreamIndex, questionIndex) {

    let yearObject = this.getQuestions(year);
    let livestreamObject = this.getLivestream(year, livestreamIndex);

    if(year == lastYear && livestreamIndex == yearObject.livestreams.length - 1
                      && questionIndex == livestreamObject.questions.length - 1)
      return this.getEmptyQuestionObject();


    let nextYear = year;
    let nextLivestreamIndex = livestreamIndex;
    let nextQuestionIndex = questionIndex + 1;

    if(nextQuestionIndex > livestreamObject.questions.length - 1) {
      nextLivestreamIndex = nextLivestreamIndex + 1;

      if(nextLivestreamIndex <= yearObject.livestreams.length - 1) {
        nextQuestionIndex = 0;
      }
      else {
        nextYear = this.getNextYear(year);
        nextLivestreamIndex = 0;
        nextQuestionIndex = 0;
      }
    }

    return {
      "year": nextYear,
      "livestream": this.getLivestream(nextYear, nextLivestreamIndex),
      "question": this.getQuestion(nextYear, nextLivestreamIndex, nextQuestionIndex),
      "livestreamIndex": nextLivestreamIndex,
      "questionIndex": nextQuestionIndex
    };
  },
  getPreviousYear: function(year) {
    if(year == '2020')
      return '2017';
    else if(year > firstYear)
      return (parseInt(year) - 1).toString();
    else return null;
  },
  getNextYear: function(year) {
    if(year == '2017')
      return '2020';
    else if(year < lastYear)
        return (parseInt(year) + 1).toString();
    else return null;
  }
}

export default QuestionsData;
