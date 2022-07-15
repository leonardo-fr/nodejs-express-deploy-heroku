module.exports = {
    isIntegerId: (req, res, next) => {
        if (Number.isInteger(parseInt(req.params.id))) {
            next()
        } else {
            res.status(400).send({
                error: 'O Id da sessão deve ser um número inteiro.'
            })
        }
    }
}
