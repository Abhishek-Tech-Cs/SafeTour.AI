const generateRandomToken = require('./generateRandomToken');

function generateEmailVerificationToken() {
    return generateRandomToken(); 
}

module.exports = generateEmailVerificationToken;