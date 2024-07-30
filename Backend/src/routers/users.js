const express = require("express");
const { clockInOrOut } = require("../controllers/users");

const router = express.Router();

router.post("/clockinorout", clockInOrOut);

module.exports = router;