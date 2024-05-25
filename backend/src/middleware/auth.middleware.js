
const jwt = require('jsonwebtoken');
const cookieOptions = { httpOnly: true, secure: true, sameSite: "none" };
require('dotenv').config()
const secretKey = "Rentify";

// console.log(secretKey,"----------")



const logOutService = async (res) => {
    res.clearCookie('accessToken');

    return true;
}


const verifyToken = (accessToken) => {
    try {
        const decoded = jwt.verify(accessToken, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
};

const authenticateToken =  (req, res, next) => {
    try {
        // const token = req.cookies.accessToken;
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        // console.log("tokem-------->", token,)
        // console.log("toeknAuth----->", token,)

        // console.log("check")
        if (!token) return res.status(401).json({ success: false, message: 'Access Denied. No token provided.' })
        
        jwt.verify(token, secretKey, (err, authData) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(400).send({ success: false, message: 'Token is expired.' });
                } else {
                    return res.status(400).send({ success: false, message: err?.message ? err.message : 'Invalid Token.' });
                }
            } else {
                // console.log("authData", authData)
                res.locals.tokenData = authData;
                req.user = authData.id;
                console.log(req.user, "req.user.id")
                next();
            }
        });
    } catch (error) {
        let _error = error?.message ? error?.message : error;
        return res.status(500).send({ success: false, message: _error });
    }
};


module.exports = {  logOutService,  verifyToken, authenticateToken }