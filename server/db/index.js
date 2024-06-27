const {fetchUserByEmailDb, fetchUserByGoogleIdDb, createUserDb, addGoogleIdUserDb, modifyUserDb
        , fetchUsersDb, fetchUserByIdDb} = require("./users_db");
const {createCartDb, fetchCartsDb, fetchCartByIdDb, createProductInCartDb, modifyCartDb, 
        removeCartProductDb, removeCartDb} = require("./carts_db")
const {fetchProductsDb, fetchProductByIdDb, createProductDb, modifyProductDb, removeProductDb} = require("./products_db")
const {fetchOrdersDb,  fetchOrderByIdDb, fetchOrdersByUserDb, createOrderDb, createProductInOrderDb} = require("./orders_db")


module.exports = {
        fetchUserByEmailDb, fetchUserByGoogleIdDb, createUserDb, addGoogleIdUserDb, modifyUserDb, fetchUsersDb, fetchUserByIdDb,
        fetchCartsDb, fetchCartByIdDb, createCartDb, createProductInCartDb, modifyCartDb, removeCartProductDb, removeCartDb,
        fetchProductsDb, fetchProductByIdDb, createProductDb, modifyProductDb, removeProductDb,
        fetchOrdersDb,  fetchOrderByIdDb, fetchOrdersByUserDb, createOrderDb, createProductInOrderDb
}