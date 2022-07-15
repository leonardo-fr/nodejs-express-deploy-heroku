const bcrypt = require('bcrypt')
const userDao = require('./../database/userDao')

module.exports = {
    login: async req => {
        const user = await userDao.getUserByLogin(req.login)

        if (!user) {
            throw 'Login inválido.'
        }

        const match = await bcrypt.compare(req.password, user['Password'])

        if (!match) {
            throw 'Senha incorreta.'
        }
        
        return user
    }
}