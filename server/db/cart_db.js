const {pool} = require("../config");

const createCartDb = async(userId) => {
        const res = await pool.query(`INSERT INTO cart(user_id) VALUES ($1) RETURNING *`, [userId]);
        console.log("createCartDb: ", res.rows[0])
        return res.rows[0];
};


module.exports = {
        createCartDb
}