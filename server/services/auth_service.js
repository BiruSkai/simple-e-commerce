const bcrypt = require("bcrypt");

const getHashedPass = async (pass) => {
        const saltRounds = 10;
        const hashedPass = await bcrypt.hash(pass, saltRounds);
        return hashedPass
};

module.exports = {
        getHashedPass
};

