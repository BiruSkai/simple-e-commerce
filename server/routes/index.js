const express = require("express");
const app = express();
const Router = require("express-promise-router");
const router = new Router()
const {validateSignUp} = require("./validation");
const { signupUser } = require("../controllers/auth-controller");

router.
        post("/auth/sign_up", validateSignUp, signupUser) //Add a new user and create a cart for the user
