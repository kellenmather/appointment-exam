"use strict"

console.log('users controller');

var mongoose = require('mongoose');
var User = mongoose.model('User');
// var session = require('express-session');

function UsersController(){
    // when a user logs in it first looks for that user in the db
    this.login = function(req,res){
        User.findOne({name: req.body.name}, function(err, user){
            console.log('-------------------NOTE HERE:', user)
            if(user < 1) { // if the user is NOT found, it does this:
                console.log('name not found');
                var newUser = new User(req.body);
                console.log(newUser);
                newUser.save(function(err){
                    if(err) {
                        res.json({err: 'Enter your name'});
                    }
                    else{
                        // now that the user has been created we find it and pass it back in a JSON object
                        User.findOne({name: req.body.name}, function(err, user){
                            res.json(user)
                        })
                    }
                })
            }
            else{ // if the user IS found, it does this:
                console.log('name was found', user);
                res.json(user);
            };
        });
    };
};
module.exports = new UsersController();
