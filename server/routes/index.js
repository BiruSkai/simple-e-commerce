const express = require("express");
const passport = require("passport");
const Router = require("express-promise-router");
const router = new Router()
const {validateSignUp, validateLoginUser, validatePutUser} = require("./validation");
const { auth, users } = require("../controllers");
const { loginUser } = require("../controllers/auth-controller");



router
        .post("/auth/sign_up", validateSignUp, auth.signupUser) //Add a new user and create a cart for the user
        .post("/auth/login", validateLoginUser, auth.loginUser) //LoginUser and send JWT in cookie
        .post("auth/logout", auth.logoutUser) // Deletes httpOnly cookie to logout
        .get("/auth/google", passport.authenticate("google", {
                scope: ["profile", "email"],
                session: false
        }))
        .get("/auth/google/redirect", passport.authenticate("google", 
                {session: false}), auth.googleLogin)//Logs user in using Google Oauth and issues a JWT back in cookie
        

        // .get("/users", passport.authenticate("jwt-admin", {session: false}), users.getAllUsers)
        // .get("/users/self", passport.authenticate("jwt-customer", {session:false}), users.getUserSelf) //Customer can access their info
        .put("/users/self", validatePutUser, passport.authenticate("jwt-customer", {session: false}), users.putUserSelf) //Customer can edit their user info
        // .delete("/users/:id", validateDeleteUser, passport.authenticate("jwt-admin", {session: false}), users.deleteUser) //Delete user and associated cart

        // .get("/carts", passport.authenticate("jwt-admin", {session:false}), carts.getAllCarts) //Gets all products in all carts
        // .posts("/carts/self", passport.authenticate("jwt-customer", {session: false}), carts.syncCartSelf) //Gets products in user#s cart and syncs with logged out cart

module.exports = router