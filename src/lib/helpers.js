const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async(password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log('Error crypting: ' + e);
    }
};

//comprueva si el usuario esta loggeado
helpers.isLoggedin = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next(); 
    }
    return res.redirect('/login');
};

module.exports = helpers;