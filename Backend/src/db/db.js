const {Pool} = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    const pool = new Pool({
        user: "useradmin",
        password: process.env.DB_PASSWORD,
        database: "management_tool",
        port: 5432,
    });


try {
    await pool.connect();
    console.log("Connected to PostgreSQL database");
    return pool;
}catch(error){
    console.error("Error Connecting to database", error);
    throw error;
}

}
module.exports = connectDB;