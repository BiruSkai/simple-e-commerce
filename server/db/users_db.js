const {pool} = require("../config");

const fetchUserByEmailDb = async (email) => {
        const res = await pool.query(
                `SELECT userdata.id, email, password, cart.id as cart_id, user_role
                FROM userdata INNER JOIN cart ON userdata.id = cart.userdata_id WHERE email = $1`, [email]
        );
        return res.rows[0];
};

const createUserDb = async (userdata) => {

}

module.exports = {
        fetchUserByEmailDb,
        createUserDb,
};