const express = require('express');
const {registerController, loginController, getAllAdmins, uploadAssignmentController} = require('../controllers/user.controller.js')
const verifyToken = require('../middlewares/verifyToken.js')

const userRouter = express.Router()


userRouter.post("/register", registerController)
userRouter.post("/login", loginController)
userRouter.post("/upload", verifyToken, uploadAssignmentController)
userRouter.get("/admins", verifyToken, getAllAdmins)


module.exports = userRouter