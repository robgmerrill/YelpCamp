var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

// Schema setup

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String, 
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

    // Campground.create( 
    //   {
    //     name: 'Goat Point', 
    //     image: 'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg',
    //     description: 'This is Goat Point Pass'
    //     }, function(err, campground) {
    //     if(err) {
    //       console.log(err);
    //     } else {
    //       console.log("Newly created campground: ");
    //       console.log(campground);
    //     }
    //   });


app.get('/', function(req, res) {
  res.render('landing');
});


// Index - show all campgrounds
app.get('/campgrounds', function(req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds:allCampgrounds});
    }
  });
});

// Create - add new campground to DB
app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;

  var newCampground = {name: name, image: image, description: desc}
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if(err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
      res.redirect('/campgrounds');
    }
  });
  
});

// New - show form to create campground
app.get('/campgrounds/new', function(req, res) {
  res.render('new.ejs');
});

// Show - shows more info about one campground
app.get('/campgrounds/:id', function(req, res) {
  // find the campgournd with provided id
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      //render show template with that campground
      res.render('show', {campground: foundCampground});
    }
  });
  req.params.id;
});

app.listen(3000, function() {
  console.log('The YelpCamp Server has started!')
});
