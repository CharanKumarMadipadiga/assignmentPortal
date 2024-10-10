const User = require('../models/user.model.js');
const Admin = require('../models/admin.model.js');
const Assignment = require('../models/assignment.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




const registerController = async (req, res) => {

    try {
        const {firstName, lastName, username, password, role} = req.body

        if(!firstName || !lastName || !username || !password, !role) {
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await User.findOne({username: username});

        if(!user) {

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                firstName,
                lastName,
                username,
                password: hashedPassword,
                role
            })

            await newUser.save()

            return res.status(201).json({message: "User registered successfully", userId: newUser._id})
        }

        else {
            return res.status(400).json({message: "username already exists"});
        }

    } catch (error) {
        console.log("register controller error of user", error)
        res.status(500).json({message: "Internal Server Error"})
    }
}


const loginController = async (req, res) => {
    try {
        const {username, password} = req.body

        if(!username || !password) {
            return res.status(400).json({message: "username or password is required"});
        }

        const user = await User.findOne({username})

        if(!user) {
            return res.status(400).json({message: "User not found"});
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if(isPasswordMatched === false) {
            return res.status(400).json({message: "password is incorrect"})
        }

        const token = await jwt.sign({user: user._id, username: user.username, role: user.role}, `${process.env.JWT_SECRET}`, {expiresIn: '2h'})


        res.status(200).json({message: "User loggedin successfully", token})

    } catch (error) {
        console.log("user login error", error)
        res.status(500).json({message: "Internal Server Error"});
    }
}


const uploadAssignmentController = async (req, res) => {

    const {task, admin} = req.body;

    if(!task || !admin) {
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        const admin_user = await Admin.findOne({username: admin})
        if(!admin_user) {
            return res.status(400).json({message: "admin not found"})
        }

        // console.log("authUser", req.user)
        const newAssignment = new Assignment({
            username: req.userObj.username,
            task,
            admin: admin_user.username
        })

        await newAssignment.save();

        await Admin.findByIdAndUpdate(admin_user._id, {$push : {assignments: newAssignment._id}})

        return res.status(201).json({message: "Assignment uploaded successfully", assignment: newAssignment})

    } catch (error) {
        console.log("assignment creation error", error)
        res.status(500).json({message: "Internal Server Error"});
    }
}



const getAllAdmins = async (req, res) => {
    try {

        const authUser = req.userObj.id 

        if(!authUser) {
            return res.status(404).json({message: "Not authorized"});
        }
        
        const adminsList = await Admin.find().select('-password -assignments -role');
        res.status(200).json({data: adminsList})

    } catch (error) {
        console.log("fetching all admins error", error)
        res.status(500).json({message: "Internal Server Error"});
    }
}




module.exports = {registerController, loginController,  uploadAssignmentController, getAllAdmins}