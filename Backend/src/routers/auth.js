const express = require("express");
const { registerUser } = require("../controllers/auth");


const router = express.Router();

router.post("/regiser", registerUser);


module.exports = router;