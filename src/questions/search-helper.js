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
            arr.map(suf => prefix + suf).forEach(word => ret.push(word));
          }
        });
      }
      if(ret.length > 0)
        break;
    }
    if(ret.length == 0)
      return [word];
    else {
      ret.push(word);
      let uniq = Array.from(new Set(ret));
      return uniq;
    }
  },
  searchQuestions: function(query, questions) {

    console.log(typeof questions);

    if(!this.isLoaded())
      return;

    let words = query.toLowerCase().split(/[\s,.;]+/);
    words.forEach(word => {
      let res = this.searchWord(word);
      console.log(word + "  |  " + res);
    });

  },
  isLoaded: function() {
    return this.searchDict != null;
  },
}

export default SearchHelper;
