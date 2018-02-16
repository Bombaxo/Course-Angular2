/**
 * Allows a user to register
 * Insertion of an object in the user resource
 */
// Use the security library
const security = require('./../security/security.js')
module.exports = (app, path) => {
    // User management: registration
    app.route(path)
        .post((req, res) => {
            // Insertion of a user record
            let user = req.body
            security.existUser(user)
                .then(result => {
                    if (result.length > 0) {
                        console.log(`Email already registered: ${user.email}`)
                        res.status(409).send(`Email ${user.email} already registered`)
                    }
                    else {
                        console.log(`Ok registering: ${user.email}`)
                        security.createUser(user)
                            .then(() => {
                                let newSessionId = security.newSession(user)
                                res.status(201).json(newSessionId)
                            })
                    }
                })
        })
}
