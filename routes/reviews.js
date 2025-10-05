const express = require('express');
const wrapAsync = require('../utilities/wrapAsync');
const router = express.Router({ mergeParams: true });
const reviewFuncs = require('../controllers/review');

const {validateReview, isLoggedIn, isReviewAuthor}= require('../utilities/middleware.js');

router.post('/' , isLoggedIn, validateReview ,wrapAsync(reviewFuncs.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviewFuncs.deleteReview));

module.exports = router;