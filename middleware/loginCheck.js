// Define the middleware function
const checkDriverLoginMiddleware = (req, res, next) => {
    // Check if the user is logged in
    if (req.session.isDriverAuthenticated) {
        // User is logged in, continue to the next middleware or route handler
        next();
    } else {
        // User is not logged in, redirect to the login page
        res.redirect('/driver/login');
    }
};

// Define the middleware function
const checkAdminLoginMiddleware = (req, res, next) => {
    // Check if the user is logged in
    if (req.session.isAdminAuthenticated) {
        // User is logged in, continue to the next middleware or route handler
        next();
    } else {
        // User is not logged in, redirect to the login page
        res.redirect('/admin/login');
    }
};


// Define the middleware function
const checkUserLoginMiddleware = (req, res, next) => {
    // Check if the user is logged in
    if (req.session.isUserAuthenticated) {
        // User is logged in, continue to the next middleware or route handler
        next();
    } else {
        // User is not logged in, redirect to the login page
        res.redirect('/user/login');
    }
};

module.exports = {
    checkDriverLoginMiddleware,
    checkAdminLoginMiddleware,
    checkUserLoginMiddleware,
}