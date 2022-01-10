const emailValidator = require('email-validator');

function name (name) {
    if (name.replace(/\s/g, '').length < 3 || name.replace(/\s/g, '').length > 30) return false;
    if (/\d/.test(name)) return false;
    return true;
}

email = (email) => emailValidator.validate(email);

module.exports = {
    name,
    email
}