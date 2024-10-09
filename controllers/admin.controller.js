const Admin = require('../models/admin.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

        const token = await jwt.sign({admin: admin._id}, `${process.env.SECRET_TOKEN}`, {expiresIn: '10h'})


        res.status(200).json({message: "Admin loggedin successfully", token})

    } catch (error) {
        console.log("admin login error", error)
        res.status(500).json({message: "Internal Server Error"});
    }
}


module.exports = {registerController, loginController}