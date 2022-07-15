const db = require('./connection')

module.exports = {
    addSale: sale => db.one(
        'INSERT INTO "Sale" ("Protocol", "Value", "Date", "IdUser", "PaymentMethod", "Type") VALUES ($1, $2, $3, $4, $5, $6) RETURNING "Id"',
        [sale.protocol, sale.totalValue, sale.date, sale.user, sale.paymentMethod, sale.type]
    )
}