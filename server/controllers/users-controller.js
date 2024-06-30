const { usersService, cartService } = require("../services");
const { modifyUser, fetchAllUsers, fetchUserById, removeUser } = usersService;
const { removeCart, fetchCartById } = cartService;


const getAllUsers = async (req, res, next) => {
        const users = await fetchAllUsers()
}

const getUserSelf = async (req, res, next) => {
      const id = req.user.id //Extract id from passport user object
      const user = fetchUserById(id)
      res.status(200).json(user)
      next()  
}

const putUserSelf = async (req, res, next) => {
        const id = req.user.id //Extract self user id from passport user object
        const { email, password, street, street_number, post_code, city, province, state } = req.body
        const user = {
                id, email, password, street, street_number, post_code, 
                city, province, state       
        } 

        await modifyUser(user)
        res.sendStatus(200)
        next()
};

const deleteUser = async (req, res, next) => {
        const { id } = req.params
        const cart = await fetchCartById(id)
        const user = await fetchUserById(id)
        if (cart.length || !user) {
                const error = new Error("Incorrect user or cart not empty.")
                return next(error);
        }
        await removeCart(id)
        await removeUser(id)
        res.status(200).json({msg: "User and cart deleted."})
        next()
};


module.exports = {
        getAllUsers,
        getUserSelf,
        putUserSelf,
        deleteUser
}