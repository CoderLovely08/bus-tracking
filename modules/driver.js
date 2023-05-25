const pool = require('./db');

const updateLiveLocation = async (busId, latitude, longitude, isActive) => {
    try {
        const query = {
            text: `
                INSERT INTO BusLocation (longitude, latitude, bus_id, isActive)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (bus_id) DO UPDATE
                SET longitude = $1, latitude = $2, isActive = $4
            `,
            values: [longitude, latitude, busId, isActive]
        };

        const { rowCount } = await pool.query(query);

        if (rowCount == 1) {
            return 0;
        } else {
            return 1;
        }

    } catch (error) {
        console.log("Error in updateLiveLocation() call: ", error);
        return 2;
    }
}

const updateLiveStatus = async (busId) => {
    try {
        const query = {
            text: `UPDATE BusLocation SET isactive = false WHERE bus_id = $1`,
            values: [busId]
        }

        const { rowCount } = await pool.query(query);

        if (rowCount == 1) {
            return 0;
        } else {
            return 1;
        }

    } catch (error) {
        console.log("Error in updateLiveStatus() call: ", error);
        return 2;
    }
}


const updateBusStatus = async (busId, status) => {
    try {
        const query = {
            text: `UPDATE BusLocation SET status = $2 WHERE bus_id = $1`,
            values: [busId, status]
        }
        
        const { rowCount } = await pool.query(query);

        if (rowCount == 1) {
            return 0;
        } else {
            return 1;
        }
    } catch (error) {
        console.log("Error in updateBusStatus() call: ", error);
        return 2;
    }
}
const getDriverBusDetails = async (driverId) => {
    try {
        const query = {
            text: `SELECT * FROM DriverInfo JOIN BusInfo ON DriverInfo.bus_id = BusInfo.bus_id JOIN BusLocation ON BusLocation.bus_id = DriverInfo.bus_id WHERE DriverInfo.driver_id = $1`,
            values: [driverId]
        }

        const { rows } = await pool.query(query);
        if (rows.length > 0) {
            return rows[0];
        } else return 0;

    } catch (error) {
        console.log("Error in getDriverBusDetails() call: ", error);
        return 0;
    }
}

module.exports = {
    updateLiveLocation,
    updateLiveStatus,
    updateBusStatus,
    getDriverBusDetails,
}