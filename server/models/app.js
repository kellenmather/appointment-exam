var mongoose = require('mongoose');

var appSchema = new mongoose.Schema({
   userId: {
       type: mongoose.Schema.Types.ObjectId,
       required: [true, 'You must be logged in to create an appointment']
   },

   complaint: {
       type: String,
       required: true,
       minLength: [10, 'Post requires at least 10 characters']
   },

   userName: {
       type: String,
       required: true
   },

   time: {
     type: String,
     required: [true, 'Select a Time'],
   },

   date: {
     type: Date,
     required: [true, 'Select a Date'],
     validate: {
       validator: function(value){
         return new Date(value) > new Date();
       },
       message: 'Date must be in the future'
     }
   },

  //  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}]
}, {timestamps: true});


mongoose.model('app', appSchema);
