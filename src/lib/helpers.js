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

module.exports = helpers;
module.exports = function isLoggedIn (req, res, next) { //comprueva si el usuario esta loggeado
    if(req.isAuthenticated()) {
        return next(); 
    }
    return res.redirect('/login');
};