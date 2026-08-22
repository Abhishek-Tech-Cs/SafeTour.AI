const crypto = require('crypto')

function hashRandomToken(token){
    return crypto
        .createHash('sha256')
        .update(token)
        .digest('hex')
}

module.exports = hashRandomToken