const {fetchUserByEmailDb, createUserDb} = require("../db");


const fetchUserByEmail = async (email) => {
        return await fetchUserByEmailDb(email)
};

const createUser = async (email, hashedPass, first_name, last_name, birthdate, street_name, street_number, city, post_code, province, state) => {
        const personalData_formula =    `INSERT INTO userdata (first_name, last_name, birth_data, email, password) 
                                        VALUES ($1, $2, $3, $4, $5) RETURNING *`
        const personalData_input = [first_name, last_name, birthdate, email, hashedPass]
        
        const personalData_res = await pool.query(personalData_formula, personalData_input)
        console.log(personalData_res-rows[0])
        return personalData_res.rows[0]
};


module.exports = {
        fetchUserByEmail, 
        createUser,
}