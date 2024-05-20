const {usersService, authService} = require("../services");
const {fetchUserByEmail, createUser} = usersService;
const {getHashedPass} = authService;


const signupUser = async (req, res, next) => {
        const {email, password, first_name, last_name, birthdate, street, street_number, post_code, city, province, state} = req.body;

        const userDb = await fetchUserByEmail(email);
        if (userDb) {
                return res.send(`The email already exists.`);
        } else {
                const hashedPass = await getHashedPass(password);
                const userdata = {
                        email, 
                        hashedPass,                
                        first_name, 
                        last_name, 
                        birthdate,
                        user_role: "customer",
                        street,
                        street_number,
                        post_code,
                        city,
                        province,
                        state
                };

                const newUser = await createUser(userdata);
                res.send({
                        error: newUser.error,
                        user_id: newUser.data,
                })
        }
}


module.exports = {
        signupUser
}