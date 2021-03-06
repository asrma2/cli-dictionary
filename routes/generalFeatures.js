const api = require('../apis/api');

async function generalFeatures(func, word) {
    switch (func) {
        case "defn":
            {
                if (word && typeof word == 'string') {
                    console.log('\nGetting "Definitions" of the word: "%s" \n', word);
                    api.getDefinition(word, 1);
                } else {
                    console.log('Please enter a valid word.');
                }
                break;
            }
        case "syn":
            {
                if (word && typeof word == 'string') {
                    console.log('\nGetting "Synonyms" of the word: "%s" \n', word);
                    api.getSynonym(word, 1);
                } else {
                    console.log('Please enter a valid word.');
                }
                break;
            }
        case "ant":
            {
                if (word && typeof word == 'string') {
                    console.log('\nGetting "Antonyms" of the word: "%s" \n', word);
                    api.getAntonym(word, 1);
                } else {
                    console.log('Please enter a valid word.');
                }
                break;
            }
        case "ex":
            {
                if (word && typeof word == 'string') {
                    console.log('\nGetting "Examples" of the word: "%s" \n', word);
                    api.getExample(word, 1);
                } else {
                    console.log('Please enter a valid word.');
                }
                break;
            }
        case "randomWord":
            {
                console.log('Your word of the day...');
                api.getRandomWord();
                break;
            }
        case "full":
            {
                var result = await api.getDefinition(word, 1);
                if(result.length > 0) {
                    await api.getExample(word, 1);
                    await api.getSynonym(word, 1);
                    await api.getAntonym(word, 1);
                }
                break;
            }
        default:
            {
                console.log('No such command...');
                break;
            }    
    }
}

module.exports = generalFeatures;

