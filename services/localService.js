const localDao = require('./../database/localDao')

module.exports = {
    addLocal: async req => {
        try {
            await localDao.addLocal(req)
        } catch (error) {
            throw 'O local contém informações inválidas.'
        }
    },
    
    getLocals: async () => {
        try {
            return localDao.getLocals()
        } catch (error) {
            throw 'Ocorreu um erro inesperado ao buscar os locais.'
        }
    }
}