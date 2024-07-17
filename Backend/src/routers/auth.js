const express = require("express");
const { registerUser } = require("../controllers/auth");
const { validateRegistrationData } = require("../validators/auth");
const { errorCheck } = require("../validators/errorCheck");



const router = express.Router();

router.post("/register", validateRegistrationData, errorCheck, registerUser);

module.exports = router;