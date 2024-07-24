const express = require("express");
const { registerUser, seedUsers, login } = require("../controllers/auth");
const { validateRegistrationData } = require("../validators/auth");
const { errorCheck } = require("../validators/errorCheck");



const router = express.Router();

router.post("/register", validateRegistrationData, errorCheck, registerUser);
router.post("/login", login);
router.put("/seed", seedUsers);

module.exports = router;