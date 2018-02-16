// RAML Swagger documentar REST

/** Load of own modules that manage each api route */
const users     = require('./users.js');
const sessions  = require('./sessions.js');
const masters   = require('./masters.js');
const movements = require('./movements.js');

/** Config the app routes */
module.exports = app => {
    users(app, '/api/pub/users');
    sessions(app, '/api/pub/sessions');
    masters(app, '/api/pub/masters');
    movements(app, '/api/priv/movements');
}