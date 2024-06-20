const bcrypt = require("bcrypt");
require("dotenv").config({path: "../.env"})

const getHashedPass = async (pass) => {
        var saltRounds = parseInt(process.env.SALTROUNDS);
        const hashedPass = await bcrypt.hash(pass, saltRounds);
        return hashedPass
};

module.exports = {
        getHashedPass
};

