const {pool} = require("../config");

const createCartDb = async(userId) => {
        const res = await pool.query(`ÌNSERT INTO cart(user_id) VALUES $1 RETURNING id`, [userId]);
        return res.rows[0];
};

module.exports = {
        createCartDb
}