#!/usr/bin/env node

var generalFeatures = require('./routes/generalFeatures');
var gameFeatures = require('./routes/gameFeatures');

const [,, ...args] = process.argv;

//console.log(args.length);

if(args.length == 0) {
    generalFeatures('randomWord', '');
} else if(args.length == 1) {
    if(args[0].trim() == 'play') {
        gameFeatures();
    } else {
        generalFeatures('full', args[0].trim());
    }
} else if(args.length == 2) {
    generalFeatures(args[0].trim(), args[1].trim());
} else {
    console.log('Not a valid command!!');
}