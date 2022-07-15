const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", function (req, res) {
    res.send("Aplicação de compra de ingresso do cinema");
});

const session = require('express-session')

const authController = require('./controllers/authController')
const eventController = require('./controllers/eventController')
const localController = require('./controllers/localController')
const sessionController = require('./controllers/sessionController')
const ticketController = require('./controllers/ticketController')
const userController = require('./controllers/userController')

const { isIntegerId } = require('./middlewares/apiMiddleware')
const { isAuthenticated } = require('./middlewares/authMiddleware')
const { isAdmin, isEmployee } = require('./middlewares/userMiddleware')


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}))
app.use(express.json())

app.post('/auth/login', authController.login)
app.post('/auth/logout', isAuthenticated, authController.logout)

app.post('/event', isAuthenticated, isAdmin, eventController.addEvent)
app.get('/event', isAuthenticated, eventController.getEvents)
app.get('/event/:id', isAuthenticated, isEmployee, isIntegerId, eventController.getEventReport)

app.post('/local', isAuthenticated, isAdmin, localController.addLocal)
app.get('/local', isAuthenticated, localController.getLocals)

app.post('/session', isAuthenticated, isAdmin, sessionController.addSession)
app.get('/session', isAuthenticated, sessionController.getSessions)
app.get('/session/seats', isAuthenticated, sessionController.getSoldSeats)
app.get('/session/:id', isAuthenticated, isEmployee, isIntegerId, sessionController.getSessionReport)

app.post('/ticket/buy', isAuthenticated, ticketController.buyTickets)
app.post('/ticket/get', isAuthenticated, ticketController.getTicketsByProtocolAndCPF)

app.post('/user', userController.addUser)

app.listen(port, () => {
    console.info("Aplicação rodando em http://localhost:");
});
