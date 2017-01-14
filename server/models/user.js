console.log('users model');
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

    name: {
      type: String,
      required: [true, 'Please enter your full name'],
      minlength: [2, 'Full name must be at least 5 characters'],
      trim: true
    }
}, {timestamps: true});

var User = mongoose.model('User', UserSchema);
