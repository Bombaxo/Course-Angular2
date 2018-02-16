/** Help Modules */
const mongodb = require('./../mongodb')
const jwt     = require('./jwt')
const colName = 'users'
/**
 * Module with useful functions for application security
 */
module.exports = {
    /** Determines whether a route should use security or not */
    useSecurity: useSecurity,
    /** Check if a user exists */
    existUser: existUser,
    /** Create a new user */
    createUser: creatingUser,
    /** Determines whether credentials are valid */
    isUserValid: isUserValid,
    /** Create a new session token */
    newSession: (user) => jwt.generateToken(user)
}

function useSecurity(app, path) {
    app.use(path, (req, res, next) => {
        // The validation of the session is in memory
        // jwt decrypts and validates a token
        let sessionId  = req.get('sessionId')
        let session    = jwt.verify(sessionId)
        if (session) {
            req.user = session.email
            next()
        } else {
            res.status(401).send('Invalid Credential')
        }
    })
}

/**
 * User records are physically created in database
 */

function existUser(user) {
    return mongodb.finding(colName, { email: user.email })
}

function creatingUser(user) {
    return mongodb.inserting(colName, user)
}

function isUserValid(user) {
    return mongodb.finding(colName, { email: user.email, password: user.password })
}




