var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    bp       = require('body-parser'),
    bcrypt   = require('bcryptjs'),
    // session  = require('express-session'),
    path     = require( 'path' ),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();
app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
// app.use(session({secret: 'anything'}));
require('./server/config/mongoose.js');
var routes = require('./server/config/routes.js');
routes(app);

app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});
