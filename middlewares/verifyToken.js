const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js')
const Admin = require('../models/admin.model.js')

const verifyToken = async (req, res, next) => {
    const token = req.headers.token

    console.log("token", token)

    if(!token) {
        return res.status(404).json({message: "Token not found"});
    }

    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);


        console.log("payload", decodedToken)
        const role = decodedToken.role

        const model = decodedToken.role === 'user'? User : Admin

        const user = await model.findById(decodedToken.user);

        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        // console.log("user", user)

        const authUser = {
            id: user._id,
            username: user.username
        }

        req.userObj = authUser

        next()
    }
    catch(err) {
        console.log("token error", err)
        res.status(400).json({message: "invalid token"})
    }
}

module.exports = verifyToken