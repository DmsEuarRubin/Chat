const jwt = require('jsonwebtoken');
require("dotenv").config;

module.exports = async function (req, res, next) {
    try {
        const token = req.cookies.accessToken;
        if(!token) return res.status(403).json({ message: 'Access token is missing or invalid' });
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodad) => {
            if(err)return res.status(403).json({message: `Authorization Fail!`});
            else next();
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Authorization Fail!"});
    }
}