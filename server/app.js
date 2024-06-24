const express = require("express")
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")
const helmet = require('helmet')
const morgan = require("morgan")
const cors = require("cors")
const passport = require("passport")
require("./config/passport")
const config = require("./config")
const routes = require("./routes")
const app = express()

app.use(helmet())
app.use(cors(origin))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan("dev"))
app.use(passport.initialize())

app.use("/api", routes)

app.use((error, req, res, next) => {
        res.status(error.status || 500).send({
                error: {
                        status: error.status || 500,
                        message: error.message || "Internal server error"
                }
        })
})


app.listen(config.port, () => {
        console.log(`Server is listening to port: ${config.port}.`)
})