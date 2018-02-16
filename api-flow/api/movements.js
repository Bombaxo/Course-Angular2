/** Module for reading and writing movements in mongodb */

const mongodb = require('./../mongodb')
const colName = 'movements'

module.exports = (app, routeMovements) => {
       
    // We will have two mega-routes per resource
    // one to go to the collection
    // api / priv / moves
    app.route(routeMovements)
        .get((req, res) => {
            // Reading all movements
            mongodb.finding(colName, { user: req.user })
                .then(result => result.length > 0 ? res.json(result) : res.status(204).send())
                .catch(err => resError(err, res))
        })
        .post((req, res) => {
            // Insertion of a movement
            let newMovememt  = req.body
            newMovememt.user = req.user
            console.log(newMovememt.user)
            mongodb.inserting(colName, newMovememt)
                .then(result => res.status(201).json(result.ops[0]))
                .catch(err => resError(err, res))
        });
    // This another route goes at the level of a particular element
    // /api/priv/movements/159
    app.route(`${routeMovements}/:id`)
        .get((req, res) => {
            // Reading a movement by id
            mongodb.finding(colName, { user: req.user}, req.params.id)
                .then(result => result.length > 0 ? res.json(result) : res.status(404).send())
                .catch(err => resError(err, res))
        })
        .put((req, res) => {
            // Update a move by id
            delete req.body._id;
            mongodb.updating(colName, { user: req.user }, req.params.id, req.body)
                .then(result => result.result.n > 0 ? res.status(200).json(result) : res.status(404).send())
                .catch(err => resError(err, res))

        })
        .delete((req, res) => {
            // Deletion of a movement by id
            mongodb.deleting(colName, { user: req.user }, req.params.id)
                .then(result => res.status(204).json(result))
                .catch(err => resError(err, res))
        })

    /** Common error response */    
    var resError = (err, res) => {
        console.error(err);
        res.status(500).send(err);
    }    
}
