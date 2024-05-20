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
        const {email, hashedPass, first_name, last_name, birthdate, user_role, street, street_number, post_code, city, province, state} = userdata;
      
        const personalData_formula =    `INSERT INTO userdata (first_name, last_name, birth_date, email, password, user_role) 
                                        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
        const personalData_input = [first_name, last_name, birthdate, email, hashedPass, user_role]
        const personalData_res = await pool.query(personalData_formula, personalData_input)
        console.log("createaUser 1a: ", personalData_res)

        const address_formula = `INSERT INTO address (street, street_number, post_code, city, province, state, userdata_id)
                                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`
        const address_input = [street, street_number, post_code, city, province, state, personalData_res.rows[0].id]
        const address_res = await pool.query(address_formula, address_input)
        console.log("createaUser 1b: ", address_res)

        if (personalData_res && address_res) {
                return {error: null, data: personalData_res.rows[0].id}
        } else {
                return {error: "Create new user failed.", data: null}
        }        
};

module.exports = {
        fetchUserByEmailDb,
        createUserDb,
};