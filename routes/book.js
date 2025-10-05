const express = require('express');
const wrapAsync = require('../utilities/wrapAsync.js');
const router = express.Router();
const bookFuncs = require('../controllers/book.js');
const {isLoggedIn, isAuthor, validateBook} = require('../utilities/middleware.js');
const multer = require('multer');
const { storage } = require('../cloudinary/index.js');
const upload = multer({storage});


router.route('/')
    .get(isLoggedIn, wrapAsync(bookFuncs.index))
    .post( isLoggedIn, upload.array('book[images]'), validateBook, wrapAsync(bookFuncs.addBook))
    
router.get('/new',isLoggedIn, bookFuncs.newForm)

router.route('/search')
    .get(isLoggedIn, wrapAsync(bookFuncs.searchBooks));

router.route('/:id')
    .get(isLoggedIn, wrapAsync(bookFuncs.showBook))
    .put(isLoggedIn, isAuthor, validateBook, upload.array('book[images]'), wrapAsync(bookFuncs.updateBook))
    .delete(isLoggedIn, isAuthor, wrapAsync(bookFuncs.deleteBook))


router.get('/:id/edit',isLoggedIn, isAuthor, wrapAsync(bookFuncs.renderEditForm))

module.exports = router;