const db = require("../config/db");

const authMiddleware =async (req, res, next) => {
    const token = req.body.access_token;
    if(!token){
        const error = new Error("access token is required");
        error.status = 401;
        return next(error);
    }

    const User = await db.query("select id, email from businesses where access_token = $1", [req.body.access_token])
    const userData = User.rows[0];
    
    if(!userData){
        const error = new Error("You are not loggedIn");
        error.status = 401;
        return next(error);
    }
    req.business = userData;
    next();
}

module.exports = authMiddleware;