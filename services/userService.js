const bcrypt = require('bcrypt')
const userDao = require('./../database/userDao')

module.exports = {
    addUser: async req => {
        req.login = req.email
        const user = await userDao.getUserByLoginOrCPF(req)

        if (user) {
            throw 'Já existe um usuário cadastrado com esses dados.'
        }

        const saltRounds = 10
        req.password = await bcrypt.hash(req.password, saltRounds)

        try {
            await userDao.addUser(req)
        } catch (error) {
            throw 'O usuário contém informações inválidas.'
        }
    }
}