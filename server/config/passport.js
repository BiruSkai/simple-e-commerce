const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const {usersService, cartService} = require("./services")
const {fetchUserByEmail, fetchUserByGoogleId, addGoogleIdUser, createUser} = usersService;
const {createCart} = cartService; 

passport.use(
        "local",
        new LocalStrategy ({emailField:"email", passwordField:"password"}, async (email, password, cb) => {
                const user = await fetchUserByEmail(email);
                if (!user) {
                        return cb (null, false , {message: "Incorrect email or password."})
                }        

                if (!user.password) {
                        return cb (null, false, {message: "User exist, try login with Google Oauth."})
                }

                const match = await bcrypt.compare(password, user.password);

                if (!match) {
                        return cb (null, false, {message: "Incorrect email or password"})
                }

                return cb (null, user, {message: "Login successfully."})
        })
)

passport.use(
        "google",
        new GoogleStrategy(
                {
                        clientID: process.env.GOOGL_CLIENT_ID,
                        clientSecret: process.env.GOOGL_CLIENT_SECRET,
                        callbackURL: isProduction ? process.env.GOOGL_CALLBACK_URL : "api/auth/google/redirect"
                },
                async (accessToken, refreshToken, profile, cb) => {
                        const googleUser = await fetchUserByGoogleId(profile.id); 
                        if (googleUser) {
                                return cb (null, googleUser, {message: "User found."})
                        } else {
                                const userDb = await fetchUserByEmail(profile.email[0].value)
                                if (userDb) {
                                        const googleUser = {
                                                id: userDb.id,
                                                googleId: profile.id
                                        };
                                        const newGoogleUser = await addGoogleIdUser(googleUser)
                                        return cb (null, newGoogleUser, {message: "Google login added to user."})
                                }
                        }
                        const user = {
                                email: profile.email[0].value,
                                google_id: profile.id,
                                first_name: profile.name.first_name,
                                last_name: profile.name.last_name,
                                user_role: "customer"
                        }
                        const newUser = await createUser(user);
                        const newCart = await createCart(newUser.id);
                        newUser.cart_id = newCart.id; // Attach cart_id to newUser object so it can appear in JWT cookie on firt login.
                        return cb(null, newUser, {message: "New user createad."})
                }
        )
);

// Check A_JWT Token
app.use(
        "jwt-customer",
        new JWTStrategy(
                {
                        secretOrKey: process.env.JWT_TOKEN,
                        jwtFromRequest: ExtractJWT.fromExtractors([
                                (req) => {
                                        let token = null;
                                        if (req && req.cookies) {
                                                token = req.cookies["A_JWT"]
                                        }
                                        return token;
                                }
                        ])
                },
                async (token, cb) => {
                        try {
                                return cb(null, token.user);
                        } catch (error) {
                                cb(error);
                        }
                }
        )
);

// Check A_JWT cookie and if a uesr has user_role = admin
app.use(
        "jwt-admin",
        new JWTStrategy(
                {
                        secretOrKey: process.env.JWT_KEY,
                        jwtFromRequest: ExtractJWT.fromExtractors([
                                (req) => {
                                        let token = null;
                                        if (req && req.cookies) {
                                        token = req.cookies["A_JWT"]
                                        }
                                        return token;
                                }
                        ])
                },
                async (token, cb) => {
                        if (token.user.role !== "admin") { // reject if not admin
                                return cb(null, false);
                        }
                        try {
                                return cb(null, token.user);
                        } catch (error) {
                                return cb(error);
                        }
                }
        )
);