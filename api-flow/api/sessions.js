/**
 * Allow user to login
 * It is an insertion of an object in the session resource
 */
// Use the security library
const security = require('./../security/security.js')
module.exports = (app, path) => {
    // Session management: login
    app.route(path)
        .post((req, res) => {
            // Insertion of a session record
            let session = req.body
            security.isUserValid(session)
                .then(result => {
                    if (result.length > 0) {
                        console.log(`Accepted: ${session.email}`)
                        let newSessionId = security.newSession(session)
                        res.status(201).json(newSessionId)
                    } else {
                        console.log(`Invalid Credential: ${session.email}`)
                        res.status(401).send('Invalid Credential')
                        res.send()
                    }
                })

        })

}
