const express = require('express');
const {registerController, loginController, getAssignmentsController, acceptAssignmentController, rejectAssignmentController} = require('../controllers/admin.controller.js');
const verifyToken = require('../middlewares/verifyToken.js');

const adminRouter = express.Router()


adminRouter.post("/register", registerController)
adminRouter.post("/login", loginController)
adminRouter.get("/assignments", verifyToken, getAssignmentsController)
adminRouter.post("/assignments/:id/accept", acceptAssignmentController)
adminRouter.post("/assignments/:id/reject", rejectAssignmentController)

module.exports = adminRouter