module.exports = {
    isAuthenticated: (req, res, next) => {
        if (req.session.user) {
            next()
        } else {
            res.status(401).send({
                error: 'Usuário não autenticado.'
            })
        }
    }
}