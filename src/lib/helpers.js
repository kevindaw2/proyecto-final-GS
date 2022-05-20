const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcryp.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async(password, savedPassword) => {
    try {
        await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log('Error crypting: ' + e);
    }
}

module.exports = helpers;