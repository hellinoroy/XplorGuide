// TODO:
// benerin prefis rute
// taro token di cookie

const express = require("express")
const app = express()
const port = 4000
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")
const dotenv = require("dotenv")

const { updateRatingOtomatis, updateBookmarksOtomatis } = require("./utils/automatedQuery.js")
dotenv.config()

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// routes
const authRouter = require("./routes/auth")
const roleRoute = require("./routes/role")
const destinationRoute = require("./routes/destination")
const userRoute = require("./routes/user")

updateRatingOtomatis()
updateBookmarksOtomatis()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())

app.use('/api/auth', authRouter)
app.use("/api", roleRoute)
app.use("/api", destinationRoute)
app.use("/api", userRoute)



app.listen(port, () => {
    console.log(`app listen http://localhost:${ port }`)
})