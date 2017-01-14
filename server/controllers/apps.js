var mongoose = require('mongoose');
var App = mongoose.model('app');
function appsController(){
    // postApp is the function that allows users to create doctor appointments with all the required validation
    this.postApp = function(req, res){
        App.find({date: req.body[0].date}, function(error, data) {
            // first catch rejects all appointments on days that are fully booked (three appointments max)
            if(data.length > 2){
                res.json({err: 'That date is fully booked'})
            }
            // second catch only runs in the search returns at least 1 appointment it then makes sure that any single user does double book on one day
            else if(data.length > 0){
                for(var i = 0; i < data.length; i++){
                    if(data[i].userId == req.body[1]._id){
                        res.json({err: 'You cannot book 2 appointments on the same day'})
                    }
                }
                // if it finishes the loop above without finding a match it will then create the appointment for the user
                appData = {userId: req.body[1]._id, complaint: req.body[0].complaint, userName: req.body[1].name, time: req.body[0].time, date: req.body[0].date}
                var newApp = new App(appData);
                newApp.save(function(err){
                    // now that we know it is okay to book the appointment we need to validate the information sent
                    if(err){
                        var errors = [];
                        for (var key in err.errors){
                            errors.push(err.errors[key].message);
                        }
                        res.json({err: errors})
                    }
                    else{
                        res.json('message added')
                    }
                })
            }
            // the else statement only runs on days without any booked appointments
            else{
                appData = {userId: req.body[1]._id, complaint: req.body[0].complaint, userName: req.body[1].name, time: req.body[0].time, date: req.body[0].date}
                var newApp = new App(appData);
                newApp.save(function(err){
                    // same validation as above (line 22)
                    if(err){
                        var errors = [];
                        for (var key in err.errors){
                            errors.push(err.errors[key].message);
                        }
                        res.json({err: errors})
                    }
                    else{
                        res.json('message added')
                    };
                });
            };
        });
    };
    // popApp populates all future appointments for the homepage for all users to see
    this.popApp = function(req, res){
        App.find({})
        .exec(function(err, appointments) {
            if(err) {
                res.json({err: err});
            }
            else{
                res.json(appointments);
            };
        });
    };
    // cancelApp cancels an appointment
    this.cancelApp = function(req, res){
        App.remove({_id: req.params.id}, function(error) {
            if (error) {
                res.json({ error: 'No matching request found' })
            }
            else {
                App.find({})
                .exec(function(err, appointments) {
                    if (err){
                        res.json({err: err})
                    }
                    else {
                        res.json(appointments);
                    };
                });
            };
        });
    };
};
module.exports = new appsController();
