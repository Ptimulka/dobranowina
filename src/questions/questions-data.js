import todoLivestreams from "@/assets/questions/todo.json";

var QuestionsData = {
  imports: {
    q2017: () => import('@/assets/questions/2017.json'),
    q2020: () => import('@/assets/questions/2020.json'),
  },
  todos: todoLivestreams,
  loadYear: function(year) {
    let qyear = 'q' + year;
    if(!this.isLoaded(year)) {
      if(qyear in this.imports) {
        this.imports[qyear]().then(x => {
          this.allQuestions[qyear] = x;
      });
      }
    }
  },
  allQuestions: {
    'q2017': null,
    'q2020': null
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
