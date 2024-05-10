const {usersService, authService} = require("../services");
const {fetchUserByEmail, createUser} = require("userService");
const {getHashedPass} = require("authService");


const signupUser = async (req, res, next) => {
        const {email, password, first_name, last_name, birthdate, street_name, street_number, city, post_code, province, state} = req.body;

        const userDb = await fetchUserByEmail(email);
        if (userDb) {
                res.send(403).send("The email already exists.");
        }

        const hashedPass = await getHashedPass(password);
        const userdata = {
                email, hashedPass,
                first_name, last_name, birthdate,
                street_name, street_number,
                city, post_code,
                province, state
        };

        const newUser = await createUser(userdata);
}


module.exports = {
        signupUser
}