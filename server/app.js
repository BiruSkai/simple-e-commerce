const express = require("express")
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const morgan = require("morgan")
const cors = require("cors")
const passport = require("passport")
const config = require("./config")
const routes = require("./routes")
const app = express()
app.use(cookieParser())
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

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