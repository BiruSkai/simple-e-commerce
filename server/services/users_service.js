const {fetchUserByEmailDb, fetchUserByGoogleIdDb, createUserDb, addGoogleIdUserDb,
        modifyUserDb, fetchUsersDb, fetchUserByIdDb
} = require("../db");


const fetchAllUsers = async () => {
        return await fetchUsersDb()
}

const fetchUserById = async () => {
        return await fetchUserByIdDb()
}

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
        fetchAllUsers,
        fetchUserById,
        fetchUserByEmail, 
        fetchUserByGoogleId,
        createUser,
        addGoogleIdUser,
        modifyUser
}