var express = require('express');
var app = express();

app.set('view engine', 'ejs')

app.get('/', function(req, res) {
  res.render('landing');
})

app.get('/campgrounds', function(req, res) {
  var campgrounds = [
    {name: 'Salmon Creek', image: 'https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg'},
    {name: 'Granite Hill', image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg'},
    {name: 'Goat Point', image: 'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg'}
  ]
  res.render('campgrounds', {campgrounds:campgrounds});
});

app.listen(3000, function() {
  console.log('The YelpCamp Server has started!')
});
