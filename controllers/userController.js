const userService = require('./../services/userService')

module.exports = {
    addUser: (req, res) => {
        userService.addUser(req.body)
            .then(() =>
                res.status(201).send()
            )
            .catch(error =>
                res.status(400).send({ error })
            )
    }
}