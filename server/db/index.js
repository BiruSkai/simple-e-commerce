const {fetchUserByEmailDb, fetchUserByGoogleIdDb, createUserDb, addGoogleIdUserDb, modifyUserDb
        , fetchUsersDb, fetchUserByIdDb} = require("./users_db");
const {createCartDb, fetchCartsDb, fetchCartByIdDb, createProductInCartDb, modifyCartDb, 
        removeCartProductDb, removeCartDb} = require("./carts_db")


module.exports = {
        fetchUserByEmailDb, fetchUserByGoogleIdDb, createUserDb, addGoogleIdUserDb,
        modifyUserDb, fetchUsersDb, fetchUserByIdDb,
        fetchCartsDb, fetchCartByIdDb, createCartDb, createProductInCartDb, modifyCartDb, removeCartProductDb, removeCartDb
}