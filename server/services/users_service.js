const {fetchUserByEmailDb, createUserDb} = require("../db");


const fetchUserByEmail = async (email) => {
        return await fetchUserByEmailDb(email)
};

const createUser = async (userdata) => {
        return await createUserDb(userdata)
};


module.exports = {
        fetchUserByEmail, 
        createUser,
}