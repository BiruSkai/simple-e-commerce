const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const {usersService} = require("./services")
const {fetchUserByEmail} = usersService;

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