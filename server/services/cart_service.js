const {createCartDb} = require("../db")

const createCart = async(userId) => {
        return await createCartDb(userId)
}

module.exports = {
        createCart
}