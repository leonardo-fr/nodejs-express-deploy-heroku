const db = require('./connection')

module.exports = {
    addEvent: newEvent => db.query(
        'INSERT INTO "Event" ("Name", "Type") VALUES ($1, $2)',
        [newEvent.name, newEvent.type]
    ),
    
    getEvents: () => db.manyOrNone(
        'SELECT * FROM "Event"'
    ),
    
    getEventById: id => db.oneOrNone(
        'SELECT * FROM "Event" WHERE "Id" = $1',
        [id]
    )
}