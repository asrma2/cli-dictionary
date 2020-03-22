
function getHint(choice, word, definitions, synonyms, antnoyms) {
    switch (choice) {
        case 0:
            {
                var shuffledWord = shuffle(word);
                console.log('\nHere is the aswer but shuffled. Now try again.\n');
                console.log('Shuffled Word: ' + shuffledWord);
                break;
            }
        case 1:
            {
                if (definitions.length == 0) {
                    var shuffledWord = shuffle(word);
                    console.log('\nHere is the aswer but shuffled. Now try again.\n');
                    console.log('Shuffled Word: ' + shuffledWord);
                } else {
                    var index = Math.floor(Math.random() * definitions.length);
                    console.log('Here is another definition of the word. \n');
                    console.log('Definition: ' + definitions[index]);
                    definitions.splice(index, 1);
                }
                break;
            }
        case 2:
            {
                if (synonyms.length == 0) {
                    var shuffledWord = shuffle(word);
                    console.log('\nHere is the aswer but shuffled. Now try again.\n');
                    console.log('Shuffled Word: ' + shuffledWord);
                } else {
                    var index = Math.floor(Math.random() * synonyms.length);
                    console.log('Here is another synonym of the word. \n');
                    console.log('Synonym: ' + synonyms[index]);
                    synonyms.splice(index, 1);
                }
                break;
            }
        case 3:
            {
                if (antnoyms.length == 0) {
                    var shuffledWord = shuffle(word);
                    console.log('\nHere is the aswer but shuffled. Now try again.\n');
                    console.log('Shuffled Word: ' + shuffledWord);
                } else {
                    var index = Math.floor(Math.random() * antnoyms.length);
                    console.log('Here is another antonym of the word. \n');
                    console.log('Antonym: ' + antnoyms[index]);
                    antnoyms.splice(index, 1);
                }
                break;
            }
        default:
            {
                var shuffledWord = shuffle(word);
                console.log('\nHere is the aswer but shuffled. Now try again.\n');
                console.log('Shuffled Word: ' + shuffledWord);
                break;
            }
    }
}

function shuffle(word) {
    var a = word.split("");
    var n = a.length;
    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    return a.join("");
}

module.exports = getHint;