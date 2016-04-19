var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs')

app.get('/', function(req, res) {
  res.render('landing');
})

var campgrounds = [
    {name: 'Salmon Creek', image: 'https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg'},
    {name: 'Granite Hill', image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg'},
    {name: 'Goat Point', image: 'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg'}
  ]

app.get('/campgrounds', function(req, res) {
  res.render('campgrounds', {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image}
  campgrounds.push(newCampground);// get data from form and add to campgrounds array
  // redirect back to campgrounds page
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res) {
  res.render('new.ejs');
});

app.listen(3000, function() {
  console.log('The YelpCamp Server has started!')
});
