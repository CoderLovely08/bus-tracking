const pool = require('./db');
const bcrypt = require('bcrypt');

/**
 * Status Codes
 * 0 - User Registered
 * 1 - Duplicate Email
 * 2 - Duplicate Phone number
 * 3 - Unable to register
 * 4 - DB Error
 */

const addNewUser = async (name, gender, dob, phone, email, pass) => {
    try {
        const checkEmailQuery = {
            text: `SELECT * FROM UserInfo WHERE user_email = $1`,
            values: [email]
        }

        const checkEmailResult = await pool.query(checkEmailQuery);

        if (checkEmailResult.rows.length > 0) {
            return 1;
        }

        // Check Distinct phone
        const checkPhoneQuery = {
            text: `SELECT * FROM UserInfo WHERE user_contact_number = $1`,
            values: [phone]
        }

        const checkPhoneResult = await pool.query(checkPhoneQuery);

        if (checkPhoneResult.rows.length > 0) {
            return 2;
        }

        // Hasing the password
        pass = await bcrypt.hash(pass, 10);
        const query = {
            text: `INSERT INTO UserInfo(user_full_name, user_gender, user_dob, user_contact_number, user_email, user_password) VALUES ($1, $2, $3, $4, $5, $6 )`,
            values: [name, gender, dob, phone, email, pass]
        }

        const { rowCount } = await pool.query(query);

        if (rowCount == 1) {
            return 0
        } else return 3;
    } catch (error) {
        console.log("Error in addNewUser() call: ", error);
        return 4;
    }
}


const checkValidUserLogin = async (email, pass) => {
    try {
        const query = {
            text: `SELECT * FROM UserInfo WHERE user_email = $1`,
            values: [email]
        }

        const { rows, rowCount } = await pool.query(query);

        if (rows.length != 1) {
            return 1;
        } else if (rowCount == 1) {
            let checkPassword = await bcrypt.compare(pass, rows[0].user_password);

            if (!checkPassword) {
                return 2;
            } else return [rows[0]];
        }
    } catch (error) {
        console.log("Error in checkValidUserLogin() call: ", error);
        return 3;
    }
}


const getUserDataByUserId = async (id) => {
    try {
        const query = {
            text: `SELECT * FROM UserInfo WHERE user_id = $1`,
            values: [id]
        }

        const { rows } = await pool.query(query);

        if (rows.length > 0) {
            return rows[0];
        } else return 0;

    } catch (error) {
        console.log("Error in getUserDataByUserId() call: ", error);
        return 0;
    }
}
module.exports = {
    addNewUser,
    checkValidUserLogin,
    getUserDataByUserId
}