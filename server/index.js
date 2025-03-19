const express = require("express")
const app = express()
const port = 4000
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")
const dotenv = require("dotenv")

// routes
const authRouter = require("./routes/auth")
const roleRoute = require("./routes/role")

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())

app.use('/api', authRouter)
app.use("/api", roleRoute)

dotenv.config()
app.listen(port, () => {
    console.log(`app listen http://localhost:${ port }`)
})