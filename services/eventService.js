const eventDao = require('./../database/eventDao')
const sessionDao = require('./../database/sessionDao')
const ticketDao = require('./../database/ticketDao')

module.exports = {
    addEvent: async req => {
        try {
            await eventDao.addEvent(req)
        } catch (error) {
            throw 'O evento contém informações inválidas.'
        }
    },

    getEvents: async () => {
        try {
            return eventDao.getEvents()
        } catch (error) {
            throw 'Ocorreu um erro inesperado ao buscar os eventos.'
        }
    },

    getEventReport: async id => {
        const event = await eventDao.getEventById(id)

        if (!event) {
            throw 'Esse evento não existe.'
        }

        const sessions = await sessionDao.getSessionsByEventId(event['Id'])

        if (sessions.length < 1) {
            throw 'Esse evento não tem sessões.'
        }

        const sessionIds = sessions.map(session => session['Id'])

        const ticketsStats = await ticketDao.getTicketsStatsBySessions(sessionIds)

        return { ...event, 'Sessions': sessionIds, ...ticketsStats }
    }
}