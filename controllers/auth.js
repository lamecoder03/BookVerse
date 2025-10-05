const User = require('../Model/user');

module.exports.renderRegister = (req,res)=>{
    res.render('users/register');
}

module.exports.register = async(req, res, next) => {
    try {
        const { email, username, password } = req.body;
        if (!email || email.trim() === '') {
            req.flash('error', 'Email is required!');
            return res.redirect('/register');
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailPattern.test(email)) {
            req.flash('error', 'Invalid email format!');
            return res.redirect('/register');
        }
       
        const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
        if (existingUser) {
            req.flash('error', 'Email already in use!');
            return res.redirect('/register');
        }

        const user = new User({ email: email.trim().toLowerCase(), username });
        const registeredUser = await User.register(user, password);

        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to BookVerse!');
            res.redirect('/books');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req,res)=>{
    res.render('users/login');
}

module.exports.login = (req,res)=>{
    req.flash('success','Welcome Back');
    const redirectUrl = res.locals.returnTo || '/'; 
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/login');
    });
}