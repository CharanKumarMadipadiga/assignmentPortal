const Admin = require('../models/admin.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Assignment = require('../models/assignment.model.js');
const registerController = async (req, res) => {

    try {
        const {firstName, lastName, username, password, role} = req.body

        if(!firstName || !lastName || !username || !password, !role) {
            return res.status(400).json({message: "All fields are required"});
        }

        const admin = await Admin.findOne({username: username});

        if(!admin) {

            const hashedPassword = await bcrypt.hash(password, 10);

            const newAdmin = new Admin({
                firstName,
                lastName,
                username,
                password: hashedPassword,
                role
            })

            await newAdmin.save()

            return res.status(201).json({message: "Admin registered successfully", adminId: newAdmin._id})
        }

        else {
            return res.status(400).json({message: "username already exists"});
        }

    } catch (error) {
        console.log("register controller error of admin", error)
        res.status(500).json({message: "Internal Server Error"})
    }
}


const loginController = async (req, res) => {
    try {
        const {username, password} = req.body

        if(!username || !password) {
            return res.status(400).json({message: "username or password is required"});
        }

        const admin = await Admin.findOne({username})

        if(!admin) {
            return res.status(400).json({message: "Admin not found"});
        }

        const isPasswordMatched = await bcrypt.compare(password, admin.password)

        if(isPasswordMatched === false) {
            return res.status(400).json({message: "password is incorrect"})
        }

        const token = await jwt.sign({user: admin._id, username: admin.username, role: admin.role}, `${process.env.JWT_SECRET}`, {expiresIn: '10h'})


        res.status(200).json({message: "Admin loggedin successfully", token})

    } catch (error) {
        console.log("admin login error", error)
        res.status(500).json({message: "Internal Server Error"});
    }
}

const getAssignmentsController = async (req, res) => {
    try {
        const assignmentsList = await Admin.findById(req.userObj.id).select('assignments').populate('assignments');
        return res.status(200).json({data: assignmentsList});
    } catch (error) {
        console.log("error in fetching assignments");
        return res.status(500).json({message: "Internal Server Error"});
    }
}


const acceptAssignmentController = async (req, res) => {
    const {id} = req.params
    console.log("params", id)
    try {
        const assignment = await Assignment.findByIdAndUpdate(id, {status: 'accepted'}, {new: true})
        return res.status(201).json({message: "Assignment accepted successfully", data: assignment});

    } catch (error) {
        console.log("error in accepting assignment");
        return res.status(500).json({message: "Internal Server Error"});
    }
}


const rejectAssignmentController = async (req, res) => {
    const {id} = req.params

    try {
        const assignment = await Assignment.findByIdAndUpdate(id, {status: 'rejected'}, {new: true})
        return res.status(201).json({message: "Assignment rejected successfully", data: assignment});

    } catch (error) {
        console.log("error in rejecting assignment");
        return res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = {registerController, loginController, getAssignmentsController, acceptAssignmentController, rejectAssignmentController}