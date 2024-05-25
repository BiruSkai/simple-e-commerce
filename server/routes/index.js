const express = require("express");
const Router = require("express-promise-router");
const router = new Router()
const {validateSignUp, validateLoginUser} = require("./validation");
const { auth } = require("../controllers");



router
        .post("/auth/sign_up", validateSignUp, auth.signupUser) //Add a new user and create a cart for the user
        .post("/auth/login", validateLoginUser, auth.loginUser) //LoginUser and send JWT in cookie
        .get("/auth/google", passport.authenticate("google", {
                scope: ["profile", "email"],
                session: false
        }))
        .get("/auth/google/redirect", passport.authenticate("google", {session: false}), 
        auth.googleLogin)//Logs user in using Google Oauth and issues a JWT back in cookie
        .post("auth/logout", auth.logoutUser) // Deletes httpOnly cookie to logout

module.exports = router