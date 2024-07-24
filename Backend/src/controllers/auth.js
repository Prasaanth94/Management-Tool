const connectDB = require("../db/db");
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require("uuid");

const bcrypt = require("bcrypt");

const seedUsers = async(req, res) => {
    try {
        const pool = await connectDB();

        const users = [
            {
            "name" : "Paul",
            "username" : "Paul21",
            "hash" :  "password123",
            "user_role" : 1.
            },
            {
                "name" : "sean",
                "username" : "Seanconnery",
                "hash" :  "password123",
                "user_role" : 2.
            },
            {
                "name" : "Dax",
                "username" : "Daxter",
                "hash" :  "password123",
                "user_role" : 3.
            },    
        ];

        for (const user of users) {
            const {name, username, hash, user_role} = user;
            const hashedPassword = await bcrypt.hash(hash,12);
            await pool.query("INSERT INTO users(name, username, hash, user_role) VALUES ($1, $2, $3, $4)",
            [name, username, hashedPassword, user_role] );
        };

        res.status(200).json({status: "Success", msg: "Seeding Completed"});

    } catch(error) {
        console.error("catch error", error);
    }
}


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


const login = async(req, res) => {
    const{username, hash} = req.body;

    if(!username || !hash) {
        return res.status(400).json({status: "error", msg : "Please fill in all fields now"});
    }

    try {
        const pool =  await connectDB();

        const getUserQuery = `SELECT * FROM users WHERE username = $1`;
        const {rows} = await pool.query(getUserQuery,[username]);

        if(rows.length === 0) {
            return res.status(400).json({status : "erroe", msg : "Invalid Username"});
        }

        const hashedPasswordFromDB = rows[0].hash;
        //comapres passwords by extracting salt and cost factors from hasedpasswordFromDB
        const passwordMatch = await bcrypt.compare(hash, hashedPasswordFromDB);

        if(!passwordMatch){
            return res.status(400).json({status: "error", msg: "Invalid Credentials"});
        }

        const claims = {
            username: username,
            role: rows[0].user_role,
            loggedInId: rows[0].id,
        }

        const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
            expiresIn: "20m",
            jwtid: uuidv4(),
        });

        const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
            expiresIn: "30D",
            jwtid: uuidv4(),
        });
        res.json({access, refresh});
    } catch(error){
        console.error(error);
        res.status(500).json({status: "error", msg: "Internal Server Error"});
    }
}
module.exports = {registerUser, seedUsers, login};