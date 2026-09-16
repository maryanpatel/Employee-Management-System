const userModel = require ("../model/User-modal")
const jwt = require ("jsonwebtoken")
 async function authenticate (req, res, next){

    const token = req.cookies.token
    if(!token) {
        return res.status(401).json({
            message: "No Token"
        })
    }

    try{

        const decoded =  jwt.verify(token, process.env.JWT_SECERT)
        req.user = decoded
        next()

    }catch(err)
    {
        return res.status(401).json({
            message: "Invalid or expire token"
        })
    }
}
module.exports = authenticate