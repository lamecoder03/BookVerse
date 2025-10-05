const express = require('express');
const wrapAsync = require('../utilities/wrapAsync');
const router = express.Router();
const authFuncs = require('../controllers/auth');
const { storeReturnTo } = require('../utilities/middleware');
const passport = require('passport');

router.route('/register')
    .get(authFuncs.renderRegister)
    .post(wrapAsync(authFuncs.register))

router.route('/login')    
    .get(authFuncs.renderLogin)
    .post(storeReturnTo, passport.authenticate('local',{failureFlash: true, failureRedirect: '/login'}), authFuncs.login)

router.get('/logout', authFuncs.logout); 

module.exports = router;