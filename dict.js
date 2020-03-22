#!/usr/bin/env node

var generalFeatures = require('./routes/generalFeatures');
var gameFeatures = require('./routes/gameFeatures');

const [,, ...args] = process.argv;

//console.log(args.length);

if(args.length == 0) {
    generalFeatures('randomWord', '');
} else if(args.length == 1) {
    var func = args[0].trim().toLowerCase();
    if(func == 'play') {
        gameFeatures();
    } else {
        generalFeatures('full', func);
    }
} else if(args.length == 2) {
    var func = args[0].trim().toLowerCase();
    var word = args[1].trim().toLowerCase()
    generalFeatures(func, word);
} else {
    console.log('Not a valid command!!');
}