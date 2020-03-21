const rp = require('request-promise');

var config = require('../config');

const baseUrl = config.url;
const apiKey = config.api_key;

module.exports = {
    getDefinition: async (word) => {
        var url = baseUrl + '/word/' + word + '/definitions?api_key=' + apiKey;
        var flag = 0;
        await rp(url)
            .then(function(response) {
                if (response) {
                    var defArray = JSON.parse(response);
                    if (defArray && Array.isArray(defArray) && defArray.length > 0) {
                        var def = "";
                        var i = 1;
                        defArray.forEach((obj) => {
                            def += "(" + i + ") " + obj.text + "\n \n";
                            i++;
                        })
                        console.log('\nDefinition: \n \n', def);
                        flag = 1;
                    } else {
                        console.warn('The word doesn\'t exist');
                    }
                } else {
                    console.warn('Oops! Something went wrong!!!\n Error :', response);
                }
            })
            .catch(function(error) {
                console.warn('Oops! Something went wrong!!!\n Error :', error.error);
                flag = 0;
            });
            if(flag == 1) {
                return 'OK';
            }
    },
    getSynonym: async (word) => {
        var url = baseUrl + '/word/' + word + '/relatedWords?api_key=' + apiKey;
        await rp(url)
            .then(function(response) {
                if (response) {
                    var res = JSON.parse(response);
                    var synArray;
                    if(res.length == 1) {
                        if(res[0].relationshipType == 'synonym') {
                            synArray = res[0].words;
                        } else {
                            console.warn('No synonym present for this word.');
                            console.log('\n');
                        }
                    } else if(res.length == 2) {
                        if(res[0].relationshipType == 'synonym') {
                            synArray = res[0].words;
                        } else if(res[1].relationshipType == 'synonym') {
                            synArray = res[1].words;
                        } else {
                            console.warn('No synonym present for this word.');
                            console.log('\n');
                        }
                    } else {
                        console.warn('No synonym present for this word.');
                        console.log('\n');
                    }
                    if (synArray && Array.isArray(synArray) && synArray.length > 0) {
                        console.log("\nSynonyms: " + (synArray ? synArray.join(",") : ''));
                        console.log('\n');
                    }
                } else {
                    console.warn('Oops! Something went wrong!!!\n Error :', response);
                }
            })
            .catch(function(error) {
                console.warn('Oops! Something went wrong!!!\n Error :', error.error);
            });
    },
    getAntonym: async (word) => {
        var url = baseUrl + '/word/' + word + '/relatedWords?api_key=' + apiKey;
        await rp(url)
            .then(function(response) {
                if (response) {
                    var res = JSON.parse(response);
                    var antArray;
                    if(res.length == 1) {
                        if(res[0].relationshipType == 'antonym') {
                            antArray = res[0].words;
                        } else {
                            console.warn('No antonym present for this word.');
                            console.log('\n');
                        }
                    } else if(res.length == 2) {
                        if(res[0].relationshipType == 'antonym') {
                            antArray = res[0].words;
                        } else if(res[1].relationshipType == 'antonym') {
                            antArray = res[1].words;
                        } else {
                            console.warn('No antonym present for this word.');
                            console.log('\n');
                        }
                    } else {
                        console.warn('No antonym present for this word.');
                        console.log('\n');
                    }
                    if (antArray && Array.isArray(antArray) && antArray.length > 0) {
                        console.log("\n Antonyms: " + (antArray ? antArray.join(",") : ''));
                        console.log('\n');
                    }
                } else {
                    console.warn('Oops! Something went wrong!!!\n Error :', response);
                }
            })
            .catch(function(error) {
                console.warn('Oops! Something went wrong!!!\n Error :', error.error);
            });
    },
    getExample: async (word) => {
        var url = baseUrl + '/word/' + word + '/examples?api_key=' + apiKey;
        await rp(url)
            .then(function(response) {
                if (response) {
                    var res = JSON.parse(response);
                    var defArray = res.examples;
                    if (defArray && Array.isArray(defArray) && defArray.length > 0) {
                        var def = "";
                        var i = 1;
                        defArray.forEach((obj) => {
                            def += "(" + i + ") " + obj.text + "\n \n";
                            i++;
                        })
                        console.log('\Examples: \n \n', def);
                    } else {
                        console.warn('The word doesn\'t exist');
                    }
                } else {
                    console.warn('Oops! Something went wrong!!!\n Error :', response);
                }
            })
            .catch(function(error) {
                console.warn('Oops! Something went wrong!!!\n Error :', error.error);
            });
    },
    getRandomWord: async () => {
        var url = baseUrl + '/words/randomWord?api_key=' + apiKey;
        rp(url)
            .then(function(response) {
                if (response) {
                    var res = JSON.parse(response);
                    var randomWord = res.word;
                    return randomWord;
                } else {
                    console.warn('Oops! Something went wrong!!!\n Error :', body);
                }
            })
            .then( async function(word) {
                if (word) {
                    console.log("\n Word of the Day: " + word);
                    await module.exports.getDefinition(word);
                    await module.exports.getExample(word);
                    await module.exports.getSynonym(word);
                    await module.exports.getAntonym(word);
                } else {
                    console.warn('Oops! Something went wrong!!!\n Error :', body);
                }
            })
            .catch(function(error) {
                console.warn('Oops! Something went wrong!!!\n Error :', error.error);
            });
    }
}

