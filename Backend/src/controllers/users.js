const connectDB = require("../db/db");

// const clockINorOut = async(req,res) => {
//     const {userId, clockingIn} = req.body;
//     console.log("clock");

//     if(!userId){
//         return res.status(400).json({status: "error", msg: "Error connecting"});
    
//     }

//     try {
//         const pool = await connectDB();

//         const clockStatus = clockingIn ? true: false;

//         const clockQuery = `UPDATE users SET clockin_status = $1 WHERE id=$2`;
//         const result = await pool.query(clockQuery,[clockStatus, userId]);

//         if(result.rowCount === 0){
//             return res.status(404).json({status: "error", msg: "User not found"});
//         }

//         res.status(200).json({status: "ok", msg: clockingIn ? "Clocked in!" : "Clocked Out!"});
//     } catch(error) {
//         console.error("Error Clocking in/out", error);
//         res.status(500).json({status: "error", msg: "internal server error!"});
//     }

// }


const clockInOrOut = async (req, res) => {
    const { userId } = req.body;

    console.log("clock");

    if (!userId) {
        return res.status(400).json({ status: "error", msg: "error connecting" });
    }

    try {
        const pool = await connectDB();

        // Check the current clock-in status
        const clockStatusQuery = `SELECT clockin_status FROM users WHERE id = $1`;
        const result = await pool.query(clockStatusQuery, [userId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ status: "error", msg: "Can't find user" });
        }

        const clockinStatus = result.rows[0].clockin_status;

        if (clockinStatus === false) {
            // Clock In setting the status on Users
            const clockInQuery = `UPDATE users SET clockin_status = true WHERE id = $1`;
            const updateUserResult = await pool.query(clockInQuery, [userId]);

            if (updateUserResult.rowCount === 0) {
                return res.status(404).json({ status: "error", msg: "Can't find user" });
            }
            //logging the time inot clockin_entries
            const insertClockInQuery = `INSERT INTO clock_entries (user_id, clock_in_time) VALUES ($1, NOW())`;
            await pool.query(insertClockInQuery, [userId]);

            return res.status(200).json({ status: "OK", msg: "Clock In!" });

        } else if (clockinStatus === true) {
            // Clock Out changing the status
            const clockOutQuery = `UPDATE users SET clockin_status = false WHERE id = $1`;
            const updateUserResult = await pool.query(clockOutQuery, [userId]);

            if (updateUserResult.rowCount === 0) {
                return res.status(404).json({ status: "error", msg: "Can't find user" });
            }
            //update the correct row in DB to record clock out time
            const clockOutUpdateQuery = `
                UPDATE clock_entries 
                SET clock_out_time = NOW() 
                WHERE id = (
                    SELECT id 
                    FROM clock_entries 
                    WHERE user_id = $1 AND clock_out_time IS NULL
                    ORDER BY clock_in_time DESC
                    LIMIT 1
                )`;

        
            await pool.query(clockOutUpdateQuery, [userId]);

            return res.status(200).json({ status: "OK", msg: "Clock Out!" });
        }

    } catch (error) {
        console.error("Error occurred", error);
        return res.status(500).json({ status: "error", msg: "Internal Server Error" });
    }
};



module.exports = {clockInOrOut};