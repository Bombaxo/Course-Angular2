/**
 * Intermediate logic module.
 * @module middleware
 */

/**
 * @param {object} app     - To express application
 * @param {object} express - The express framework itself
 * @return                 - Configure the application
 */
module.exports.useMiddleware = app => {
    const cors       = require('cors');
    const bodyParser = require('body-parser')
    const security   = require('./security/security.js')
    
    // Allows calls from other domains or ports
    app.use(cors());

    // Allows to retrieve as JavaScript objects the content delivered by the client
    // both parameters
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    // like in the body
    app.use(bodyParser.json());

    // Another common use of middleware is monitoring the application
    // Call Interceptor
    app.use((req, res, next) =>{
        console.log(`Received request: ${req.url}`);
        // It is very important to continue the flow to the next function
        next();
        // If not, the call would hang
    });

    // This middleware will be responsible for monitoring the entry  
    //security.useSecurity(app, '/api/priv/');
}


