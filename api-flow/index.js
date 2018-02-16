/** Load of modules from standar libreries */

// express
const express = require('express');

// Express application
const app = express();

/** Load of own modules */
const middleware = require('./middleware');
middleware.useMiddleware(app);

// Routes config
require('./api/index')(app);

/** Server starts */
app.listen(3030);
console.log('listening on port 3030');

