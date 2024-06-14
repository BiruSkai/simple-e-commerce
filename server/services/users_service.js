const {fetchUserByEmailDb, fetchUserByGoogleIdDb, createUserDb, addGoogleIdUserDb,
        modifyUserDb
} = require("../db");


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
};

const modifyUser = async (user) => {
        return await modifyUserDb(user)
};


module.exports = {
        fetchUserByEmail, 
        fetchUserByGoogleId,
        createUser,
        addGoogleIdUser,
        modifyUser
}