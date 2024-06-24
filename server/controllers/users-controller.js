const { usersService } = require("../services");
const { modifyUser, fetchAllUsers, fetchUserById } = usersService;


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

const getAllUsers = async (req, res, next) => {
        const users = await fetchAllUsers()
}

const getUserSelf = async (req, res, next) => {
      const id = req.user.id //Extract id from passport user object
      const user = fetchUserById(id)
      res.status(200).json(user)
      next()  
}


module.exports = {
        putUserSelf,
        getAllUsers,
        getUserSelf
}