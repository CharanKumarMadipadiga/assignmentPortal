const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDatabase = require('./db/index.js');
const userRouter = require('./routes/user.route.js');
const logger = require('./middlewares/logger.middleware.js');
const adminRouter = require('./routes/admin.route.js');
dotenv.config();

const app = express()


//middlewares
app.use(express.json())
app.use(logger)
app.use(morgan('combined'))


//routes

app.use("/user", userRouter)
app.use("/admin", adminRouter)

connectDatabase()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server Running at localhost:${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("Mongo Error", err);
})


