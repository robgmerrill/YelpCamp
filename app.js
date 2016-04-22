var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require('method-override'),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds") 

// Requiring Routes
var commentRoutes     = require('./routes/comments'),
    campgroundRoutes  = require('./routes/campgrounds'),
    indexRoutes        = require('./routes/index')   

// mongoose.connect("mongodb://localhost/yelp_camp_v3");
mongoose.connect("mongodb://robgmerrill:giants11dodgers11@ds013941.mlab.com:13941/yelpcamper");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
// seedDB();

// Passport Configuration
app.use(require("express-session")({
  secret: "Once again Oso wins cutest dog!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});



app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);


app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started!");
});
