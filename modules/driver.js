const pool = require('./db');

const updateLiveLocation = async (busId, latitude, longitude) => {
    try {
        const query = {
            text: `
                INSERT INTO BusLocation (longitude, latitude, bus_id)
                VALUES ($1, $2, $3)
                ON CONFLICT (bus_id) DO UPDATE
                SET longitude = $1, latitude = $2
            `,
            values: [longitude, latitude, busId]
        };        

        const { rowCount } = await pool.query(query);

        if (rowCount == 1) {
            return 0;
        } else {
            return 1;
        }

    } catch (error) {
        console.log("Error in updateLiveLocation() call: ", error );
        return 2;
    }
}

module.exports = {
    updateLiveLocation,
}