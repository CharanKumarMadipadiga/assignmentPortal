const mongoose = require('mongoose');
const dbName = require('../config/index.js')

const connectDatabase = async () => {
    try {
        const connectionObject = await mongoose.connect(`${process.env.MONGO_URI}/${dbName}`)
        console.log("MONGODB Connected", connectionObject.connection.host)

    } catch (error) {
        console.log("MONGO ERROR", error)
        process.exit(1);
    }
}

module.exports = connectDatabase