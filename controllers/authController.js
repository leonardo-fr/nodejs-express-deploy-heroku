const eventService = require('./../services/eventService')

module.exports = {
    addEvent: (req, res) => {
        eventService.addEvent(req.body)
            .then(() =>
                res.status(201).send()
            )
            .catch(error =>
                res.status(400).send({ error })
            )
    },
    
    getEvents: (req, res) => {
        eventService.getEvents()
            .then(events =>
                res.status(200).send(events)
            )
            .catch(error =>
                res.status(500).send({ error })
            )
    },
    
    getEventReport: (req, res) => {
        eventService.getEventReport(req.params.id)
            .then(report =>
                res.status(200).send(report)
            )
            .catch(error =>
                res.status(400).send({ error })
            )
    }
}
