const db = require('./connection')

module.exports = {
    addLocal: local => db.query(
        'INSERT INTO "Local" ("Name", "Capacity") VALUES ($1, $2)',
        [local.name, local.capacity]
    ),

    getLocalById: id => db.oneOrNone(
        'SELECT * FROM "Local" WHERE "Id" = $1',
        [id]
    ),

    getLocals: () => db.manyOrNone(
        'SELECT * FROM "Local"'
    )
}