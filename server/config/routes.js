console.log('routes');
var path = require('path');
var users = require('../controllers/users.js');
var apps = require('../controllers/apps.js')

module.exports = function(app) {
    // app.post('/newUser', users.create);
    app.post('/login', users.login);
    app.post('/enterapp', apps.postApp);
    app.get('/populateapp', apps.popApp);
    app.post('/cancelapp/:id', apps.cancelApp)
};
// this adds route listeners to users for 5 of the 7 RESTful routes, excluding new and edit.
