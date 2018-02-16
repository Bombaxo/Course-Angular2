/** Encryption library */
const jwt = require('jsonwebtoken')

const secret = 'EscuelaIT'

/** Encrypts the user for a period of time */
exports.generateToken = (user) => jwt.sign(user, secret, { expiresIn: 600 })

/** Verifies the user from the token  */
exports.verify = (token) => {
    try {
        return jwt.verify(token, secret)
    }
    catch(err){
        return false
    }
}

