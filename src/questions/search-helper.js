var SearchHelper = {
  dictImport: () => import('@/assets/searchDict.json'),
  init: function() {
    if(!this.isLoaded()) {
      this.dictImport().then(x => {
        // this.searchDict = this.prepareDict(x);
        this.searchDict = x;
      });
    }
  },
  prepareDict: function(dict) {
    var ret = {};
    Object.keys(dict).forEach(key => {
      let value = dict[key]
      ret[key] = value;
      if(value.length > 2) {
        let root = value[0];
        for(var i = 2; i < value.length; i=i+1) {
            ret[root+value[i]] = key;
        }
      }
    });
    return ret;
  },
  searchDict: null,
  searchWord: function(word) {
    var ret = [];

    for(var i=word.length; i>0; i=i-1) {

      let prefix = word.substring(0,i);
      let suffix = word.substring(i);

      let arrOfArrs = this.searchDict[prefix];
      if(typeof arrOfArrs != 'undefined') {
        arrOfArrs.forEach(arr => {
          if(arr.includes(suffix)) {
            let resItem = { prefix: prefix, suffices: arr };
            ret.push(resItem);
          }
        });
      }
      if(ret.length > 0)
        break;
    }
    if(ret.length == 0)
      return [{ prefix: word, suffices: [""] }];
    else {
      return ret;
    }
  },
  searchQuestions: function(query) {

    if(!this.isLoaded())
      return;

    let words = query.toLowerCase().split(/[\s,.;]+/);
    let allWordsResults = words.flatMap(word => {
      return this.searchWord(word);
    });

    let allWordsResultsReduced = allWordsResults.reduce(function(accumulator, currentValue) {

      if(currentValue.prefix in accumulator) {
          let existingSuffices = accumulator[currentValue.prefix];
          let currentSuffices = currentValue.suffices;
          let allSuffices = Array.from(new Set(existingSuffices.concat(currentSuffices)));
          accumulator[currentValue.prefix] = allSuffices;
      }
      else {
        accumulator[currentValue.prefix] = currentValue.suffices
      }
      return accumulator;
    }, {});

    console.log(JSON.stringify(allWordsResultsReduced));

    let regexps = Object.keys(allWordsResultsReduced).map(key => {
      let suffices = allWordsResultsReduced[key];
      let sufficesJoined = suffices.join('|');
      let regexp = key +"(" + sufficesJoined + ")";
      return new RegExp(regexp, "i");
    });

    console.log(regexps);
    return regexps;
  },
  isLoaded: function() {
    return this.searchDict != null;
  },
}

export default SearchHelper;
