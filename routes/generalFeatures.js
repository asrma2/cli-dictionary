const api = require('../apis/api');

function generalFeatures(func, word) {
    switch (func) {
        case "defn":
            {
                if (word && typeof word == 'string') {
                    console.log('\nGetting "Definitions" of the word: "%s" \n', word);
                    api.getDefinition(word);
                } else {
                    console.log('Please enter a valid word.');
                }
                break;
            }
        case "syn":
            {
                if (word && typeof word == 'string') {
                    console.log('\nGetting "Synonyms" of the word: "%s" \n', word);
                    api.getSynonym(word);
                } else {
                    console.log('Please enter a valid word.');
                }
                break;
            }
        case "ant":
            {
                if (word && typeof word == 'string') {
                    console.log('\nGetting "Antonyms" of the word: "%s" \n', word);
                    api.getAntonym(word);
                } else {
                    console.log('Please enter a valid word.');
                }
                break;
            }
        case "ex":
            {
                if (word && typeof word == 'string') {
                    console.log('\nGetting "Examples" of the word: "%s" \n', word);
                    api.getExample(word);
                } else {
                    console.log('Please enter a valid word.');
                }
                break;
            }
        case "randomWord":
            {
                //TODO
                break;
            }
        default:
            {
                //TODO
            }
    }
}

module.exports = generalFeatures;

