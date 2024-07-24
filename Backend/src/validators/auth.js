const {body} = require("express-validator");

const validateRegistrationData = [
    body("username", "username is required").not().isEmpty(),
    body("hash", "password is required").not().isEmpty(),
    body("hash", "password min of 8 characters and max 50").isLength({
        min: 8,
        max: 50,
    }),
    body("hash", "password must be alphanumeric").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}$/),
    body("name", "name is required").not().isEmpty(),
    body("user_role", "user_role is required").not().isEmpty()
];

module.exports = {validateRegistrationData};