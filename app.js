if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongo'); // Updated connect-mongo
const ExpressError = require('./utilities/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./Model/user');

const bookRoutes = require('./routes/book');
const reviewRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');

const dbURl = 'mongodb://localhost:27017/BookVerse'
mongoose.connect(dbURl, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error: 1234"));
db.once("open", () => {
    console.log("Database Connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


const store = MongoDBStore.create({
    mongoUrl: dbURl, 
    touchAfter: 24 * 60 * 60, 
    crypto: {
        secret: 'thisshouldbeabettersecret!' 
    }
});
store.on("error",function(e){
    console.log("Session Store Error",e)
})

const sessionConfig = {
    store: store,
    name: 'session',
    secret: 'thisisasecret',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    } 
};
app.use(session(sessionConfig));
app.use(flash());

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash messages & current user for all templates
app.use((req, res, next) => {
    res.locals.currUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', authRoutes);
app.use('/books', bookRoutes);
app.use('/books/:id/reviews', reviewRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('home');
});

// 404 handler
app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

// Global error handler
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'Something Went Wrong!!';
    res.status(statusCode);
    res.render('error', { err });
});

// Start server
app.listen(3000, () => {
    console.log('On port 3000');
});
