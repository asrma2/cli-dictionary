var readline = require('readline');
var api = require('../apis/api');
var getHint = require('./hint');

function play(word, definitions, synonyms, antnoyms) {
    console.log(word);
    var num = Math.floor(Math.random() * 3);
    if (num == 0) {
        var index = Math.floor(Math.random() * definitions.length);
        console.log('Here is the definition of the word. \n');
        console.log('Definition: ' + definitions[index]);
        definitions.splice(index, 1);
    } else if (num == 1) {
        if (synonyms.length == 0) {
            num = 0;
            var index = Math.floor(Math.random() * definitions.length);
            console.log('Here is the definition of the word. \n');
            console.log('Definition: ' + definitions[index]);
            definitions.splice(index, 1);
        } else {
            var index = Math.floor(Math.random() * synonyms.length);
            console.log('Here is the synonym of the word. \n');
            console.log('Synonym: ' + synonyms[index]);
            synonyms.splice(index, 1);
        }

    } else if (num == 2) {
        if (antnoyms.length == 0) {
            num = 0;
            var index = Math.floor(Math.random() * definitions.length);
            console.log('Here is the definition of the word. \n');
            console.log('Definition: ' + definitions[index]);
            definitions.splice(index, 1);
        } else {
            var index = Math.floor(Math.random() * antnoyms.length);
            console.log('Here is the antonym of the word. \n');
            console.log('Antonym: ' + antnoyms[index]);
            antnoyms.splice(index, 1);
        }
    }
    console.log('\nGuess the word!! \n');
    var userInput = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'INPUT>'
    });
    userInput.prompt();
    var wordGuess = true;
    userInput.on('line', (input1) => {
        var input = input1.toLowerCase();
        if (wordGuess) {
            if (input == word) {
                console.log('\nHURRAY!! You have guessed the word correctly. Congrats!! \n');
                process.exit(22);
            } else {
                console.log('\nOpps!! Incorrect answer\n');
                console.log('Enter 1 to Try Again');
                console.log('Enter 2 for a Hint');
                console.log('Enter 3 to Quit\n');
                wordGuess = !wordGuess;
                userInput.prompt();
            }
        } else {
            if (input == '1') {
                wordGuess = !wordGuess;
                console.log('\nGuess the word!! \n');
                userInput.prompt();
            } else if (input == '2') {
                var choice = Math.floor(Math.random() * 4);
                getHint(choice, word, definitions, synonyms, antnoyms);
                wordGuess = !wordGuess;
                console.log('\nNow guess the Word!! \n');
                userInput.prompt();
            } else if (input == '3') {
                getFullWord(word);
            } else {
                console.log('\nOpps!! Wrong Choice. Please try again.\n');
                userInput.prompt();
            }
        }
    });
}

async function getFullWord(word) {
    console.log('\nThe answer is ' + word + '.');
    console.log('Following is the full dictionary of ' + word + ':\n');
    var result = await api.getDefinition(word, 1);
    if(result.length > 0) {
        await api.getExample(word, 1);
        await api.getSynonym(word, 1);
        await api.getAntonym(word, 1);
    }
    process.exit(22);
}

module.exports = play;

