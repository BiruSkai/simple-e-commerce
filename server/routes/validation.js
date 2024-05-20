const {check, validationResult} = require("express-validator");

const validateSignUp = [
        check("email").not().isEmpty().isEmail().isLength({max:30}),
        check("password").not().isEmpty().isLength({min:6, max:20}),
        check("first_name").not().isEmpty().isLength({max:20}),
        check("last_name").not().isEmpty().isLength({max:20}),
        check("street").not().isEmpty().isLength({max:20}),
        check("street_number").not().isEmpty().isLength({max:4}),
        check("post_code").not().isEmpty().isLength({max:8}),
        check("city").not().isEmpty().isLength({max:20}),
        check("province").not().isEmpty().isLength({max:20}),
        check("state").not().isEmpty().isLength({max:20}),
        (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                       return res.status(422).json({errors: errors.array()})
                }
                else next();
        }
]


module.exports = {
        validateSignUp
}