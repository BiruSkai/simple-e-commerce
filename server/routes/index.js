const express = require("express");
const Router = require("express-promise-router");
const router = new Router()
const {validateSignUp, validateLoginUser} = require("./validation");
const { auth } = require("../controllers");



router
        .post("/auth/sign_up", validateSignUp, auth.signupUser) //Add a new user and create a cart for the user
        .post("/auth/login", validateLoginUser, auth.loginUser) //LoginUser and send JWT in cookie

module.exports = router