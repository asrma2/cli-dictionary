var readline = require('readline');
var api = require('../apis/api');
var play = require('../utils/game');

async function gameFeatures() {
    console.log('Game Loading ... \n');
    var result = await api.play();
    var word = result[0];
    var definitions = result[1];
    var synonyms = result[3];
    var antnoyms = result[4];

    play(word, definitions, synonyms, antnoyms);

}



module.exports = gameFeatures;