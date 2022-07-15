const db = require('./connection')

module.exports = {
    addTicket: ticket => db.query(
        'INSERT INTO "Ticket" ("Price", "IdSession", "IdSale", "Type", "Seat") VALUES ($1, $2, $3, $4, $5)',
        [ticket.price, ticket.session, ticket.sale, ticket.type, ticket.seat]
    ),

    getTicketsBySession: session => db.manyOrNone(
        'SELECT * FROM "Ticket" WHERE "IdSession" = $1',
        [session]
    ),

    getTicketsByProtocolAndCPF: req => db.manyOrNone(
        'SELECT tc."Id", tc."Price", tc."IdSession", tc."IdSale", tc."Type", tc."Seat" FROM "Sale" s, "User" u, "Ticket" tc WHERE s."IdUser" = u."Id" AND s."Id" = tc."IdSale" AND u."CPF" = $1 AND s."Protocol" = $2',
        [req.cpf, req.protocol]
    ),

    getTicketsStatsBySession: session => db.oneOrNone(
        'SELECT SUM("Price") "TotalValue", COUNT("Id") "Tickets", COUNT(CASE "Type" when 1 then 1 else null end) "FullPrice", COUNT(CASE "Type" when 2 then 1 else null end) "HalfPrice" FROM "Ticket" WHERE "IdSession" = $1',
        [session]
    ),

    getTicketsStatsBySessions: sessions => db.oneOrNone(
        'SELECT SUM("Price") "TotalValue", COUNT("Id") "Tickets", COUNT(CASE "Type" when 1 then 1 else null end) "FullPrice", COUNT(CASE "Type" when 2 then 1 else null end) "HalfPrice" FROM "Ticket" WHERE "IdSession" IN ($1:list)',
        [sessions]
    ),

    getSeatsBySession: session => db.manyOrNone(
        'SELECT "Seat" FROM "Ticket" WHERE "IdSession" = $1',
        [session]
    )
}