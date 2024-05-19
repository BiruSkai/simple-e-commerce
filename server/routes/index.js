const express = require("express");
const Router = require("express-promise-router");
const router = new Router()
const {validateSignUp} = require("./validation");
const { auth } = require("../controllers");



router
        .post("/auth/sign_up", validateSignUp, auth.signupUser) //Add a new user and create a cart for the user
        // .get("/", (req, res) => {res.send(console.log("test"))})

module.exports = router