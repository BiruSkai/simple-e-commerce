const {fetchUserByEmailDb, fetchUserByGoogleIdDb, createUserDb, addGoogleIdUserDb} = require("../db");


const fetchUserByEmail = async (email) => {
        return await fetchUserByEmailDb(email)
};

const fetchUserByGoogleId = async (id) => {
        return await fetchUserByGoogleIdDb(id)
};

const createUser = async (userdata) => {
        return await createUserDb(userdata)
};

const addGoogleIdUser = async (user) => {
        return await addGoogleIdUserDb(user)
}

const modifyUser = async ()


module.exports = {
        fetchUserByEmail, 
        fetchUserByGoogleId,
        createUser,
        addGoogleIdUser
}