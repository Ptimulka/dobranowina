var QuestionsData = {
  imports: {
    q2017: () => import('@/assets/questions/2017.json')
  },
  loadQYear: function(qyear) {
    if(!this.isLoaded(qyear)) {
      if(qyear in this.imports) {
        this.imports[qyear]().then(x => {
          this.allQuestions[qyear] = x;
           console.log(this.allQuestions['q2017']['livestreams'])
      });
      }
    }
  },
  allQuestions: {
    'q2017': null
  },
  isLoaded: function(qyear) {
    return this.allQuestions[qyear] != null;
  },
}

export default QuestionsData;
