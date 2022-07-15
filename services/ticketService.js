const localDao = require('./../database/localDao')
const saleDao = require('./../database/saleDao')
const sessionDao = require('./../database/sessionDao')
const ticketDao = require('./../database/ticketDao')
const userDao = require('./../database/userDao')

const isSessionExpired = sessionDate => {
    const currentDate = new Date()
    
    return currentDate.getTime() > sessionDate.getTime()
}

const isTicketsValid = (saleTickets, dbTickets, capacity) => {
    for (let i in saleTickets) {
        if (saleTickets[i].seat < 1 || saleTickets[i].seat > capacity) {
            return false
        }

        for (let j in saleTickets) {
            if (i !== j && saleTickets[i].seat === saleTickets[j].seat) {
                return false
            }
        }

        for (let dbt of dbTickets) {
            if (saleTickets[i].seat === dbt['Seat']) {
                return false
            }
        }
    }

    return true
}

const mapTicketsPrice = (tickets, price, saleType) => tickets.map(ticket => {
    ticket.price = price

    if (ticket.type === 2) {
        ticket.price /= 2
    }

    if (saleType === 2) {
        ticket.price *= 1.05
    }

    ticket.price = Math.round(ticket.price * 100) / 100

    return ticket
})

const getTotalValue = tickets => tickets.reduce(
    (acc, ticket) => acc + ticket.price,
    0
)

const setSaleData = (sale, session, user) => {
    sale.tickets = mapTicketsPrice(sale.tickets, session['Price'], sale.type)
    sale.totalValue = getTotalValue(sale.tickets)
    sale.date = new Date()
    sale.protocol = sale.date.getTime() % 1000000

    sale.userName = user['Name']
    sale.userCPF = user['CPF']
    sale.userEmail = user['Email']
    sale.userPhone = user['PhoneNumber']
    sale.userBirthdate = user['Birthdate']

    return sale
}

const mapTicketsData = (tickets, sale) => tickets.map(ticket => {
    ticket.session = sale.session
    ticket.sale = sale.id

    return ticket
})

module.exports = {
    buyTickets: async req => {
        const session = await sessionDao.getSessionById(req.session)

        if (!session) {
            throw 'A sessão informada não existe.'
        } else if (isSessionExpired(session['Date'])) {
            throw 'A sessão já aconteceu.'
        }

        const user = await userDao.getUserById(req.user)

        if (!user) {
            throw 'O usuário informado não existe.'
        }

        const tickets = await ticketDao.getTicketsBySession(req.session)
        const local = await localDao.getLocalById(session['IdLocal'])

        if (!isTicketsValid(req.tickets, tickets, local['Capacity'])) {
            throw 'Os assentos são inválidos.'
        }

        req = setSaleData(req, session, user)

        try {
            const id = await saleDao.addSale(req)
            req.id = id['Id']
        } catch (error) {
            throw 'A venda contém informações inválidas.'
        }

        req.tickets = mapTicketsData(req.tickets, req)

        try {
            req.tickets.forEach(ticket => ticketDao.addTicket(ticket))
        } catch (error) {
            throw 'Os ingressos contém informações inválidas.'
        }

        return req
    },

    getTicketsByProtocolAndCPF: async req => {
        try {
            return ticketDao.getTicketsByProtocolAndCPF(req)
        } catch (error) {
            throw 'A busca contém informações inválidas.'
        }
    }
}