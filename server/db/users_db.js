const {pool} = require("../config");

const fetchUserByEmailDb = async (email) => {
        // const res = await pool.query(
        //         `SELECT userdata.id, userdata.email, userdata.password, cart.id as cart_id, userdata.user_role
        //         FROM userdata INNER JOIN cart ON userdata.id = cart.userdata_id WHERE email = $1`, [email]
        // );
        const res = await pool.query(`SELECT * FROM userdata WHERE email = $1`, [email])
        return res.rows[0];
};

const createUserDb = async (userdata) => {
        const {email, hashedPass, first_name, last_name, birthdate, user_role} = userdata;
      
        const personalData_formula =    `INSERT INTO userdata (first_name, last_name, birth_date, email, password, user_role) 
                                        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
        const personalData_input = [first_name, last_name, birthdate, email, hashedPass, user_role]
        const personalData_res = await pool.query(personalData_formula, personalData_input)
        return personalData_res.rows[0]
};

module.exports = {
        fetchUserByEmailDb,
        createUserDb,
};