const localService = require('./../services/localService')

module.exports = {
    addLocal: (req, res) => {
        localService.addLocal(req.body)
            .then(() =>
                res.status(201).send()
            )
            .catch(error =>
                res.status(400).send({ error })
            )
    },
    
    getLocals: (req, res) => {
        localService.getLocals()
            .then(locals =>
                res.status(200).send(locals)
            )
            .catch(error =>
                res.status(500).send({ error })
            )
    }
}