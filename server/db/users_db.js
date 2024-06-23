const {pool} = require("../config");
const { datetime } = require("../config/date_time");


const fetchUsersDb = async () => {
        const res = await pool.query(
                `SELECT userdata.id, first_name, last_name, birth_date, user_role, created_on,
                street, street_number, post_code, city, province, state, cart.id AS cart_id
                FROM userdata INNER JOIN address ON userdata.id = address.userdata_id
                FROM userdata INNER JOIN cart ON userdata.id = cart.user_id `
        )
        return res.rows[0];
}

const fetchUserByIdDb = async (id) => {
        const res = await populate.query(
                `SELECT userdata.id, first_name, last_name, birth_date,
                street, street_number, post_code, city, province, state, cart.id AS cart_id
                FROM userdata INNER JOIN address ON userdata.id = address.userdata_id
                FROM userdata INNER JOIN cart ON userdata.id = cart.user_id 
                WHERE userdata.id = $1`,
                 [id])
        return res.rows[0];
}

const fetchUserByEmailDb = async (email) => {
        const res = await pool.query(`SELECT * FROM userdata WHERE email = $1`, [email])
        return res.rows[0];
};

const fetchUserByGoogleIdDb = async (id) => {
        const res = await pool.query(`SELECT userdata.id, email, password, user_role, cart.id AS cart_id
                                        INNER JOIN cart ON userdata.id = cart.id WHERE google_id = $1`, [id]);
        return res.rows[0];
};

const createUserDb = async (userdata) => {
        const {email, hashedPass, first_name, last_name, birthdate, user_role, street, street_number, post_code, city, province, state} = userdata;
      
        const personalData_formula =    `INSERT INTO userdata (first_name, last_name, birth_date, email, password, user_role) 
                                        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
        const personalData_input = [first_name, last_name, birthdate, email, hashedPass, user_role]
        const personalData_res = await pool.query(personalData_formula, personalData_input)
        // console.log("createaUser 1a: ", personalData_res)

        const address_formula = `INSERT INTO address (street, street_number, post_code, city, province, state, userdata_id)
                                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`
        const address_input = [street, street_number, post_code, city, province, state, personalData_res.rows[0].id]
        const address_res = await pool.query(address_formula, address_input)
        // console.log("createaUser 1b: ", address_res)

        if (personalData_res && address_res) {
                return {error: null, data: personalData_res.rows[0].id}
        } else {
                return {error: "Create new user failed.", data: null}
        }        
};

const modifyUserDb = async ({ id, email, password, street, street_number, post_code, city, province, state }) => {
        const userdata_text = `UPDATE userdata SET email=$1, password=$2, WHERE id=$3 RETURNING *`;
        const userdata_values = [email, password, id];
        const userdata_res = await pool.query(userdata_text, userdata_values);
        // console.log("userdata_res: ", userdata_res.rows[0]);
        
        const address_text = `UPDATE address SET street=$1, street_number=$2, post_code=$3, city=$4, province=$5, state=$6, updated_on=$7 WHERE userdata_id=$8 RETURNING *`;
        const address_values = [ street, street_number, post_code, city, province, state, datetime, id];
        const address_res = await pool.query(address_text, address_values);
        // console.log("address_res: ", address_res.rows[0]);

        return {userdata_res: userdata_res.rows[0], address_res: address_res.rows[0]};
};       

const addGoogleIdUserDb = async ({id, google_id}) => {
        const formula = `UPDATE userdata SET google_id = $2 WHERE id = $1 RETURNING *`;
        const values = [id, google_id];
        const res = await pool.query(formula, values);
        console.log("addGoogleIdUSerDb: ", res.rows[0])
        return res.rows[0];
}

const removeUserDb = async (id) => {
        try {
                await pool.query(`DROP TABLE userdata WHERE id = $1`, [id])
                return {message: `Id: ${id} has been deleted.`}
        } catch (err) {
                return err.message
        }
}

module.exports = {
        fetchUserByEmailDb,
        fetchUserByGoogleIdDb,
        createUserDb,
        modifyUserDb,
        addGoogleIdUserDb,
        fetchUsersDb,
        fetchUserByIdDb,
        removeUserDb
};