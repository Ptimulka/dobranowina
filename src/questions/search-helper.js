const https = require('https');

const familiesUrl = 'https://polishwordfamilies.herokuapp.com/wordfamilies/';

var SearchHelper = {

  getRegexpsForQuery: function(query, continueSearchingCallback) {

    let words = query.toLowerCase().split(/[\s,.;]+/).filter(word => word.length>2);
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
          let sufficesJoined = suffices.join('|');
          let regexp = key +"(" + sufficesJoined + ")";
          return new RegExp(regexp, "i");
        });

        continueSearchingCallback(regexps);
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
      let regexps = words.map(word => {
        return new RegExp(word, "i");
      })
      continueSearchingCallback(regexps);
    });
  }
}

export default SearchHelper;
