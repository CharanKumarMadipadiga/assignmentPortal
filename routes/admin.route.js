const express = require('express');
const {registerController, loginController} = require('../controllers/admin.controller.js')

const adminRouter = express.Router()


adminRouter.post("/register", registerController)
adminRouter.post("/login", loginController)


module.exports = adminRouter