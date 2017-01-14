"use strict";

// console.log('Users Factory');
app.factory('userFactory', ['$http', function($http) {
    // PASSES ALL INFO ON TO SERVER
    var loggedInUser = {};

    function UserFactory(){
        var _this = this;
        var loggedInUser = {};
        this.populateApp = function(callback){
            $http.get('/populateapp').then(function(returned_data){
                if(typeof(callback) == 'function'){
                    callback(returned_data.data)
                }
            })
        }
        this.login = function(user,callback){

            $http.post('/login', user).then(function(returned_data){
                if (typeof(callback) == 'function'){
                    if(returned_data.data){
                        loggedInUser = returned_data.data;
                        callback(returned_data.data);
                    }
                    else{
                        callback(returned_data.data);
                    }
                };
            });
        };
        this.getLoginUser = function(){
            return loggedInUser;
        };
        this.remove = function(callback) {
            loggedInUser = null;
            callback();
        };
        // APPOINTMENT HANDLING BELOW
        this.newApp = function(app, user, callback){
            $http.post('/enterapp', [app, user]).then(function(returned_data){
                if (typeof(callback) == 'function'){
                    callback(returned_data.data);
                }
            });
        };
        this.cancel = function(id, callback){
            $http.post('/cancelapp/' + id).then(function(returned_data){
                callback(returned_data.data);
            });
        };
    };
    // console.log(new UserFactory());
    return new UserFactory();
}]);
