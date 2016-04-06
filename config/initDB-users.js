'use strict';

// models
let User = require('../models/users_model.js');
// files library
let fs = require('fs');

// db user init
User.remove(function(err) {

    if (err) {
        return console.log('ERROR', err);
    }

    console.log('user db empty');
    fs.readFile('./users.json', { encoding: 'utf8' }, function(err, data) {

        if (err) {
            return console.log(err);
        }

        let pack = JSON.parse(data);

        for (let i = 0; i < pack.users.length; i++) {
            
            let user = new User(pack.users[i]);
            
            user.save(function(err, row) {
                if (err) {
                    return console.log('ERROR', err);
                }
                return;              
            });

        }
        
        console.log('user db init completed');

    });

});
