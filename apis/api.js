const request = require('request');

var config = require('../config');

const baseUrl = config.url;
const apiKey = config.api_key;

module.exports = {
    getDefinition: async (word) => {
        var url = baseUrl + '/word/' + word + '/definitions?api_key=' + apiKey;
        request(url, async (error, response, body) => {
            if (error)
                console.warn('Oops! Something went wrong!!!\n Error :', error);
            if (response && response.statusCode == 200) {
                var defArray = JSON.parse(body);
                if (defArray && Array.isArray(defArray) && defArray.length > 0) {
                    var def = "";
                    var i = 1;
                    defArray.forEach((obj) => {
                        def += "(" + i + ") " + obj.text + "\n \n";
                        i++;
                    })
                    console.log('\nDefinition: \n \n', def);
                } else {
                    console.warn('The word doesn\'t exist');
                }
            } else {
                console.warn('Oops! Something went wrong!!!\n Error :', body);
            }
        });
    },
    getSynonym: async (word) => {
        var url = baseUrl + '/word/' + word + '/relatedWords?api_key=' + apiKey;
        request(url, async (error, response, body) => {
            if (error)
                console.warn('Oops! Something went wrong!!!\n Error :', error);
            if (response && response.statusCode == 200) {
                var res = JSON.parse(body);
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
                console.warn('Oops! Something went wrong!!!\n Error :', body);
            }
        });
    },
    getAntonym: async (word) => {
        var url = baseUrl + '/word/' + word + '/relatedWords?api_key=' + apiKey;
        request(url, async (error, response, body) => {
            if (error)
                console.warn('Oops! Something went wrong!!!\n Error :', error);
            if (response && response.statusCode == 200) {
                var res = JSON.parse(body);
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
                console.warn('Oops! Something went wrong!!!\n Error :', body);
            }
        });
    },
    getExample: async (word) => {
        var url = baseUrl + '/word/' + word + '/examples?api_key=' + apiKey;
        request(url, async (error, response, body) => {
            if (error)
                console.warn('Oops! Something went wrong!!!\n Error :', error);
            if (response && response.statusCode == 200) {
                var res = JSON.parse(body);
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
                console.warn('Oops! Something went wrong!!!\n Error :', body);
            }
        });
    },
    getRandomWord: async (word) => {
        //TODO
    }
}

