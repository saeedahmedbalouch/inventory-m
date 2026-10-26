const busService = require("../services/busServices");

const busRegister = async(req, res, next) =>{
    try {
        const newBusiness = await busService.busRegister(req.body.name, req.body.email, req.body.phone, req.body.password);
        if(!newBusiness){
            const error = new Error("Bus Register Failed");
            error.status = 203;
            return next(error);
        }
        res.status(200).json({
            message: "User registered successfully",
            data: {
                id: newBusiness.id,
                name: newBusiness.name,
                email: newBusiness.email,
                phone: newBusiness.phone,
            }
        })
    } catch (error) {
       next(error);
    }

}

const busLogin = async(req, res, next) =>{
    try {
        const busLogin = await busService.busLogin(req.body.email, req.body.password);
        if(!busLogin){
            const error = new Error("Email or Password is inCorrect");
            error.status = 401;
            return next(error);
        } 
        res.status(200).json({
            message: "LoggedIn successFully",
            data: busLogin
        })
    } catch (error) {
        next(error);
    }
}

const busLogout = async(req, res, next) =>{
    try {
        const busLogout = await busService.busLogout(req.body.access_token);
        if(!busLogout){
            const error = new Error("Invalid access_token");
            error.status = 401;
            return next(error);
        }
        res.status(200).json({
            message: "Logged Out successfull"
        })
    } catch (error) {
        next(error)
    }
}

const busRefresh = async(req, res, next) =>{
    try {
        const refresh_token = await busService.busRefresh(req.body.refresh_token);
        if(!refresh_token){
            const error = new Error("invalid refresh_token");
            error.status = 401;
            return next(error);
        }
        res.status(200).json({
            message: "tokens refreshed",
            data: refresh_token
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {busRegister, busLogin, busLogout, busRefresh}