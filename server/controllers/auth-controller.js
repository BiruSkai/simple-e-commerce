const passport = require("passport");
const jwt = require("jsonwebtoken");
const {usersService, authService, cartService} = require("../services");
const {fetchUserByEmail, createUser} = usersService;
const {getHashedPass} = authService;
const {createCart} = cartService;
require("dotenv").config({path:"../../.env"});
const isProduction = process.env.NODE_ENV == "production";


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
                console.log("newuserId: ", newUser.data)// it result in the id
                const newCart = await createCart(newUser.data);
                
                res.json({
                        error: newUser.error,
                        user_id: newUser.data,
                        cart_id: newCart.id
                })
                next();
        }
}

const loginUser = async (req, res, next) => {
        passport.authenticate(
                "local",
                async (error, user, info) => {
                        if (error || !user) {
                                const error = new Error(info.message)
                                return next(error)
                        }
                        req.login(
                                user,
                                {session: false},
                                async (error)  => {
                                        if (error) {return next(error)}
                                        
                                        const body = {id:user.id, cart_id:user.cart_id, email:user.email, user_role:user.user_role};
                                        const token = jwt.sign({user:body}, process.env.JWT_KEY);

                                        res.cookie("A_JWT", token, {
                                                maxAge: 1000 * 60 * 60 * 24,
                                                httpOnly: true,
                                                secure: isProduction ? true : false,
                                                sameSite: isProduction ? "none" : "lax"
                                        })
                                        
                                        return res.statusCode(200).send("Login successful."); 
                                }       
                        )
                } 
        )
};

const googleLogin = async (req, res, next) => {
        const user = req.user;
        const body = {id:user.id, cart_id:user.cart_id, email:user.email, role:user.user_role};
        const token = jwt.sign({user:body}, process.env.JWT_KEY);

        res.cookie("A_JWT", token, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
                secure: isProduction ? true : false,
                sameSite: isProduction ? "none" : "lax"
        })

        res.statusCode(200).redirect(isProduction ?
                process.env.GOOGL_CALLBACK_URL : "http://localhost:3000/google-login"
        )
}

const logoutUser = async (res, next) => {
        res.clearCookie("A_JWT")
        res.statusCode(200).send()
        next()
};


module.exports = {
        signupUser, loginUser, googleLogin, logoutUser
}