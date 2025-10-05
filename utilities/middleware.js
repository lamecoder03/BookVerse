const {campgroundSchema, reviewSchema, bookSchema} = require('../schema.js');
const ExpressError = require('../utilities/ExpressError');
const Book = require('../Model/book.js');
const Review = require('../Model/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validateBook = (req,res,next)=>{
    const { error } = bookSchema.validate(req.body);
    if(error){
        const message = error.details.map(el=>el.message).join(',')
        throw new ExpressError(message,400)
    }
    else{
        next();
    }
}

module.exports.isAuthor = async(req,res,next)=>{
    const { id } = req.params;
    const book = await Book.findById(id);
    if(! book.author.equals(req.user._id)){
        req.flash('error','You don\'t have permission to do that.' );
        return res.redirect(`/books/${id}`);
    }
    next();
}

module.exports.validateReview= (req,res,next)=>{
    const { error } = reviewSchema.validate(req.body);
    if(error){
        const message = error.details.map(el=>el.message).join(',')
        throw new ExpressError(message,400)
    }
    else{
        next();
    }
}

module.exports.isReviewAuthor = async(req,res,next)=>{
    const { id , reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(! review.author.equals(req.user._id)){
        req.flash('error','You don\'t have permission to do that.' );
        return res.redirect(`/books/${id}`);
    }
    next();
}
