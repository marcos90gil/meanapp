'use strict';

// models
let TextItem = require('../models/textItem_model.js');
// files library
let fs = require('fs');

// db text item init
TextItem.remove(function(err) {

    if (err) {
        return console.log('ERROR', err);
    }

    console.log('textItems db empty');
    fs.readFile('./textItems.json', { encoding: 'utf8' }, function(err, data) {

        if (err) {
            return console.log(err);
        }

        let pack = JSON.parse(data);

        for (let i = 0; i < pack.textItems.length; i++) {
            
            let textItem = new TextItem(pack.textItems[i]);
            
            textItem.save(function(err, row) {
                if (err) {
                    return console.log('ERROR', err);
                }
                return;               
            });

        }
        console.log('textItems db init completed');

    });

});
