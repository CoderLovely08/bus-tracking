const pool = require('./db');

const getAdminDataById = async (id) => {
    try {
        const query = {
            text: `SELECT * FROM AdminInfo WHERE admin_id = $1`,
            values: [id]
        }

        const { rows } = await pool.query(query);
        if (rows.length > 0) {
            return rows[0];
        } else return 0;

    } catch (error) {
        console.log("Error in getAdminDataById() call: ", error);
        return 0
    }
}


const addNewAdmin = async (username, pass, fullname, phone, dob) => {
    try {

        const checkQuery = {
            text: `SELECT * FROM AdminInfo WHERE admin_user_name = $1`,
            values: [username]
        }

        const checkResult = await pool.query(checkQuery);

        if (checkResult.rows.length > 0) {
            return 1;
        }
        const query = {
            text: `INSERT INTO AdminInfo(admin_user_name,admin_password,admin_full_name,admin_contact_number,admin_dob) values($1,$2,$3,$4,$5)`,
            values: [username, pass, fullname, phone, dob]
        }

        const { rowCount } = await pool.query(query);

        if (rowCount == 1) {
            return 0;
        } else {
            return 2;
        }
    } catch (error) {
        console.log("Error in addNewAdmin() call: ", error);
        return 2;
    }
}


const getAllUserData = async () => {
    try {
        const query = {
            text: `SELECT * FROM UserInfo`
        }

        const { rows } = await pool.query(query);
        if (rows.length > 0) {
            return rows;
        } else return 0;
    } catch (error) {
        console.log("Error in getAllUserData() call: ", error);
        return 0;
    }
}

const getAllAdminData = async () => {
    try {
        const query = {
            text: `SELECT * FROM AdminInfo`
        }

        const { rows } = await pool.query(query);
        if (rows.length > 0) {
            return rows;
        } else return 0;
    } catch (error) {
        console.log("Error in getAllAdminData() call: ", error);
        return 0;
    }
}

const getAllDriverData = async () => {
    try {
        const query = {
            text: `SELECT * FROM DriverInfo JOIN BusInfo ON DriverInfo.bus_id = BusInfo.bus_id`
        }

        const { rows } = await pool.query(query);
        if (rows.length > 0) {
            return rows;
        } else return 0;
    } catch (error) {
        console.log("Error in getAllDriverData() call: ", error);
        return 0;
    }
}

// Get all bus info
const getAllBusData = async () => {
    try {
        const query = {
            text: `SELECT * FROM BusInfo`
        }

        const { rows } = await pool.query(query);
        if (rows.length > 0) {
            return rows;
        } else return 0;
    } catch (error) {
        console.log("Error in getAllBusData() call: ", error);
        return 0;
    }
}

// Add new Bus

const addNewBus = async (busName, busNumber, busModel, busOrigin, busDestination) => {
    try {
        const checkQuery = {
            text: `SELECT * FROM BusInfo WHERE bus_number = $1 `,
            values: [busNumber]
        }

        const checkResult = await pool.query(checkQuery);
        if (checkResult.rows.length == 1) {
            return 1;
        }

        const query = {
            text: `INSERT INTO BusInfo(bus_name, bus_number, bus_model, bus_origin, bus_destination) values($1,$2,$3,$4,$5)`,
            values: [busName, busNumber, busModel, busOrigin, busDestination]
        }
        console.log(query);

        const { rowCount } = await pool.query(query);

        if (rowCount == 1) {
            return 0;
        } else {
            return 2;
        }
    } catch (error) {
        console.log("Error in addNewBus() call: ", error);
        return 3;
    }
}


const addNewDriver = async (driverUserName, driverPassword, driverFullName, driverGender, driverPhone, busId) => {
    try {

        const checkQuery = {
            text: `SELECT * FROM DriverInfo WHERE driver_user_name = $1 `,
            values: [driverUserName]
        }

        const checkResult = await pool.query(checkQuery);
        if (checkResult.rows.length == 1) {
            return 1;
        }

        const query = {
            text: `INSERT INTO DriverInfo(driver_user_name, driver_password, driver_full_name, driver_gender, driver_contact_number, bus_id) values($1,$2,$3,$4,$5,$6)`,
            values: [driverUserName, driverPassword, driverFullName, driverGender, driverPhone, busId]
        }
        const { rowCount } = await pool.query(query);

        if (rowCount == 1) {
            return 0;
        } else {
            return 2;
        }
    } catch (error) {
        console.log("Error in addNewDriver() call: ", error);
        return 3;
    }
}



const getLiveData = async () => {
    try {
        const query = {
            text: `SELECT * FROM BusLocation`
        }

        const { rows } = await pool.query(query);

        if (rows.length > 0) {
            return rows;
        } else return 0;

    } catch (error) {
        console.log("Error in getLiveData() call: ", error);
        return 0;
    }
}


const getLiveBusDetails = async () => {
    try {
        const query = {
            text: `SELECT * FROM BusInfo JOIN BusLocation ON BusInfo.bus_id = BusLocation.bus_id`
        }

        const { rows } = await pool.query(query);

        if (rows.length > 0) {
            return rows;
        } else return 0;

    } catch (error) {
        console.log("Error in getLiveBusDetails() call: ", error);
        return 0;
    }
}


// Delete bus by id
const deleteBusById = async (id) => {
    try {
        const query = {
            text: `DELETE FROM BusInfo WHERE bus_id = $1`,
            values: [id]
        }

        const { rowCount } = await pool.query(query);

        if (rowCount == 1) {
            return 0;
        } else {
            return 1;
        }

    } catch (error) {
        console.log("Error in deleteBusById() call: ", error);
        return 2;
    }
}


const getAllRouteData = async () => {
    try {
        const query = {
            text: `SELECT * FROM RouteInfo`,
        }

        const { rows } = await pool.query(query);
        if (rows.length > 0) {
            return rows;
        } else return 0;
    } catch (error) {
        console.log("Error in getAllRouteData() call: ", error);
        return 0
    }
}


const addNewRoute = async (routeName) => {

    try {
        const checkQuery = {
            text: `SELECT * FROM RouteInfo WHERE route_name = $1`,
            values: [routeName]
        }

        const checkResult = await pool.query(checkQuery);
        if (checkResult.rows.length > 0) {
            return 1;
        }

        const query = {
            text: `INSERT INTO RouteInfo(route_name) VALUES($1)`,
            values: [routeName]
        }

        const { rowCount } = await pool.query(query);
        if (rowCount == 1) {
            return 0;
        } else {
            return 2;
        }

    } catch (error) {
        console.log("Error in deleteBusById() call: ", error);
        return 3;
    }
}

const deleteRouteById = async (id) => {
    try {
        const query = {
            text: `DELETE FROM RouteInfo where route_id = $1`,
            values: [id]
        }

        const { rowCount } = await pool.query(query);

        if (rowCount == 1) {
            return 0;
        } else {
            return 1;
        }

    } catch (error) {
        console.log("Error in deleteRouteById() call: ", error);
        return 2;
    }
}


const updateBusStops = async (routesArray, busId) => {
    try {
        const deletePreviousStops = {
            text: `DELETE FROM RouteMapping WHERE bus_id = $1`,
            values: [busId]
        }

        await pool.query(deletePreviousStops);

        routesArray.forEach(async (element) => {

            const insertNewStops = {
                text: `INSERT INTO RouteMapping (route_id, bus_id) VALUES ($1, $2)`,
                values: [element, busId]
            }
            const { rowCount } = await pool.query(insertNewStops);
            if (rowCount != 1) {
                return 1;
            }
        });

        console.log("Bus stops updated successfully.");

        return 0;
    } catch (error) {
        console.log("Error in updateBusStops() call: ", error);
        return 1;
    }
}

const deleteAdminById = async (id) => {
    try {
        const query = {
            text: `DELETE FROM AdminInfo WHERE admin_id = $1`,
            values: [id]
        }

        const { rowCount } = await pool.query(query);

        if (rowCount == 1) {
            return 0;
        } else {
            return 1;
        }

    } catch (error) {
        console.log("Error in deleteAdminById() call: ", error);
        return 2;
    }
}
module.exports = {
    // Add methods
    addNewAdmin,
    addNewBus,
    addNewDriver,
    addNewRoute,

    // Get methods
    getLiveData,
    getAllRouteData,
    getAllUserData,
    getAllAdminData,
    getAllDriverData,
    getAdminDataById,
    getAllBusData,
    getLiveBusDetails,

    // Delete methods
    deleteBusById,
    deleteRouteById,
    deleteAdminById,

    // Update methods
    updateBusStops,
}