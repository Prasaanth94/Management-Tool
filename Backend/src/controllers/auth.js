const connectDB = require("../db/db");

const bcrypt = require("bcrypt");

const registerUser = async(req, res) =>{
    const{ name, username, hash, user_role} = req.body;
    console.log("register");

    if(!name || !username || !hash || !user_role){
        return res.status(400).json({status: "error", msg: "Please fill in all Fields"});
    }

    const hashedPassword = await bcrypt.hash(hash, 12);

    try {
        const pool = await connectDB();

        const checkUsernameQuery = `SELECT COUNT(*) FROM users WHERE username =$1`;
        const {rows: usernameRows} = await pool.query(checkUsernameQuery, [username]);
        const existingUsernameCount = parseInt(usernameRows[0].count);

        if(existingUsernameCount){
            return res.status(400).json({status : "error", msg: "Username already in user"});
        }

        const insertUserQuery = `INSERT INTO users (name, username, hash, user_role) VALUES($1, $2, $3, $4)`;

        await pool.query(insertUserQuery, [name, username, hashedPassword, user_role]);

        res.status(200).json({message: "User Registered Succesfully!"});
    } catch(error){
        console.error("Error registering User: ", error);
        res.status(500).json({message: "internal server error"});
    }
};

module.exports = {registerUser};