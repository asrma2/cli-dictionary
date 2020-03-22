const rp = require('request-promise');

var config = require('../config');

const baseUrl = config.url;
const apiKey = config.api_key;

module.exports = {
    getDefinition: async (word, printFlag) => {
        var url = baseUrl + '/word/' + word + '/definitions?api_key=' + apiKey;
        var result = [];
        await rp(url)
            .then(function(response) {
                if (response) {
                    var defArray = JSON.parse(response);
                    if (defArray && Array.isArray(defArray) && defArray.length > 0) {
                        var def = "";
                        var i = 1;
                        defArray.forEach((obj) => {
                            result.push(obj.text);
                            def += "(" + i + ") " + obj.text + "\n \n";
                            i++;
                        });
                        if(printFlag == 1) {
                            console.log('\nDefinition: \n \n', def);
                        }
                        
                    } else {
                        if(printFlag == 1) {
                            console.warn('The word doesn\'t exist');
                        }
                        
                    }
                } else {
                    if(printFlag == 1) {
                        console.warn('Oops! Something went wrong!!!\n Error :', response);
                    }
                    
                }
            })
            .catch(function(error) {
                if(printFlag == 1) {
                    console.warn('Oops! Something went wrong!!!\n Error :', error.error);
                }
            });
            return result;
    },
    getSynonym: async (word, printFlag) => {
        var url = baseUrl + '/word/' + word + '/relatedWords?api_key=' + apiKey;
        var result = [];
        await rp(url)
            .then(function(response) {
                if (response) {
                    var res = JSON.parse(response);
                    var synArray;
                    if(res.length == 1) {
                        if(res[0].relationshipType == 'synonym') {
                            synArray = res[0].words;
                        } else {
                            if(printFlag == 1) {
                                console.warn('No synonym present for this word.');
                                console.log('\n');
                            }
                        }
                    } else if(res.length == 2) {
                        if(res[0].relationshipType == 'synonym') {
                            synArray = res[0].words;
                        } else if(res[1].relationshipType == 'synonym') {
                            synArray = res[1].words;
                        } else {
                            if(printFlag == 1) {
                                console.warn('No synonym present for this word.');
                                console.log('\n');
                            }
                        }
                    } else {
                        if(printFlag == 1) {
                            console.warn('No synonym present for this word.');
                            console.log('\n');
                        }
                    }
                    if (synArray && Array.isArray(synArray) && synArray.length > 0) {
                        result = synArray;
                        if(printFlag == 1) {
                            console.log("\nSynonyms: " + (synArray ? synArray.join(",") : ''));
                            console.log('\n');
                        }
                    }
                } else {
                    if(printFlag == 1) {
                        console.warn('Oops! Something went wrong!!!\n Error :', response);
                    }
                    
                }
            })
            .catch(function(error) {
                if(printFlag == 1) {
                    console.warn('Oops! Something went wrong!!!\n Error :', error.error);
                }
                
            });
            return result;
    },
    getAntonym: async (word, printFlag) => {
        var url = baseUrl + '/word/' + word + '/relatedWords?api_key=' + apiKey;
        var result = [];
        await rp(url)
            .then(function(response) {
                if (response) {
                    var res = JSON.parse(response);
                    var antArray;
                    if(res.length == 1) {
                        if(res[0].relationshipType == 'antonym') {
                            antArray = res[0].words;
                        } else {
                            if(printFlag == 1) {
                                console.warn('No antonym present for this word.');
                                console.log('\n');
                            }
                            
                        }
                    } else if(res.length == 2) {
                        if(res[0].relationshipType == 'antonym') {
                            antArray = res[0].words;
                        } else if(res[1].relationshipType == 'antonym') {
                            antArray = res[1].words;
                        } else {
                            if(printFlag == 1) {
                                console.warn('No antonym present for this word.');
                                console.log('\n');
                            }
                        }
                    } else {
                        if(printFlag == 1) {
                            console.warn('No antonym present for this word.');
                            console.log('\n');
                        }
                    }
                    if (antArray && Array.isArray(antArray) && antArray.length > 0) {
                        result = antArray;
                        if(printFlag == 1) {
                            console.log("\nAntonyms: " + (antArray ? antArray.join(",") : ''));
                            console.log('\n');
                        }
                        
                    }
                } else {
                    if(printFlag == 1) {
                        console.warn('Oops! Something went wrong!!!\n Error :', response);
                    }
                    
                }
            })
            .catch(function(error) {
                if(printFlag == 1) {
                    console.warn('Oops! Something went wrong!!!\n Error :', error.error);
                }
                
            });
            return result;
    },
    getExample: async (word, printFlag) => {
        var url = baseUrl + '/word/' + word + '/examples?api_key=' + apiKey;
        var result = [];
        await rp(url)
            .then(function(response) {
                if (response) {
                    var res = JSON.parse(response);
                    var defArray = res.examples;
                    if (defArray && Array.isArray(defArray) && defArray.length > 0) {
                        var def = "";
                        var i = 1;
                        defArray.forEach((obj) => {
                            result.push(obj.text);
                            def += "(" + i + ") " + obj.text + "\n \n";
                            i++;
                        });
                        if(printFlag == 1) {
                            console.log('\nExamples: \n \n', def);
                        }
                        
                    } else {
                        if(printFlag == 1) {
                            console.warn('The word doesn\'t exist');
                        }
                        
                    }
                } else {
                    if(printFlag == 1) {
                        console.warn('Oops! Something went wrong!!!\n Error :', response);
                    }
                    
                }
            })
            .catch(function(error) {
                if(printFlag == 1) {
                    console.warn('Oops! Something went wrong!!!\n Error :', error.error);
                }
                
            });
            return result;
    },
    getRandomWord: async () => {
        var url = baseUrl + '/words/randomWord?api_key=' + apiKey;
        var result = [];
        await rp(url)
            .then(function(response) {
                if (response) {
                    var res = JSON.parse(response);
                    var randomWord = res.word;
                    result.push(randomWord);
                    return randomWord;
                } else {
                    console.warn('Oops! Something went wrong!!!\n Error :', body);
                }
            })
            .then( async function(word) {
                if (word) {
                    console.log("\n Word of the Day: " + word);
                    result.push(await module.exports.getDefinition(word, 1));
                    result.push(await module.exports.getExample(word, 1));
                    result.push(await module.exports.getSynonym(word, 1));
                    result.push(await module.exports.getAntonym(word, 1));
                } else {
                    console.warn('Oops! Something went wrong!!!\n Error :', body);
                }
            })
            .catch(function(error) {
                console.warn('Oops! Something went wrong!!!\n Error :', error.error);
            });
            return result;
    },
    play: async () => {
        var url = baseUrl + '/words/randomWord?api_key=' + apiKey;
        var result = [];
        await rp(url)
            .then(function(response) {
                if (response) {
                    var res = JSON.parse(response);
                    var randomWord = res.word;
                    result.push(randomWord);
                    return randomWord;
                } else {
                    console.warn('Oops! Something went wrong!!!\n Error :', body);
                }
            })
            .then( async function(word) {
                if (word) {
                    result.push(await module.exports.getDefinition(word, 0));
                    result.push(await module.exports.getExample(word, 0));
                    result.push(await module.exports.getSynonym(word, 0));
                    result.push(await module.exports.getAntonym(word, 0));
                } else {
                    console.warn('Oops! Something went wrong!!!\n Error :', body);
                }
            })
            .catch(function(error) {
                console.warn('Oops! Something went wrong!!!\n Error :', error.error);
            });
            return result;
    }
}

