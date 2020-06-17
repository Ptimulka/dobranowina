const https = require('https');

const familiesUrl = 'https://polishwordfamilies.herokuapp.com/wordfamilies/';

var SearchHelper = {

  getRegexpsForQuery: function(query, searchExactPhase, continueSearchingCallback) {

    if(searchExactPhase) {
        continueSearchingCallback(new RegExp(query, "ig"));
        return;
    }

    let stopwords = ["czy", "kto", "jak"];

    let words = query.toLowerCase().split(/[\s,.;]+/).
      filter(word => word.length>2).
      filter(word => !stopwords.includes(word));
    if(words.length == 0) {
      continueSearchingCallback(null);
      return;
    }
    let allWordsStringWithCommas = words.join(',');

     https.get(familiesUrl + allWordsStringWithCommas, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        let answer = JSON.parse(data);

        let allWordsResults = Object.values(answer).flatMap(arr => {
          return arr;
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

        let regexps = Object.keys(allWordsResultsReduced).map(key => {
          let suffices = allWordsResultsReduced[key];
          let sufficesSortedFromLongest = suffices.sort((a, b) => b.length - a.length);
          let sufficesJoined = sufficesSortedFromLongest.join('|');
          let regexp = key +"(" + sufficesJoined + ")";
          return new RegExp(regexp, "ig");
        });

        let regexpsMerged = regexps.reduce(function(previousValue, currentValue) {
          return new RegExp(previousValue.source + "|" + currentValue.source, "ig");
        });
        continueSearchingCallback(regexpsMerged);
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
      let regexps = words.map(word => {
        return new RegExp(word, "ig");
      })
      continueSearchingCallback(regexps);
    });
  }
}

export default SearchHelper;
