var mongoose = require('mongoose');
var Campground = require('./models/campgrounds');

function seedDB() {
  Campground.remove({}, function(err) {
    if(err) {
      console.log(err);
    }
    console.log('removed campgrounds!');
  });
}

module.exports = seedDB;
