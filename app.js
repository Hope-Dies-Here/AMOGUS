const express = require("express")
const path = require("path")
const bp = require("body-parser")
const session = require("express-session")
const MongoStore = require('connect-mongodb-session')(session);
const cookieParser = require("cookie-parser")
const router = require("./routes/router.js")
const dbConnection = require("./config/db.js")

require("dotenv").config()
dbConnection()

const app = express()
const PORT = 3040 || process.env.PORT

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(express.json())

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {
    maxAge: 1000 * 60 * 60,
  },
	store: new MongoStore({ uri: process.env.DB_STRING, ttl: 1000 * 60 * 60, autoRemove: 'native' })
}))

app.use("/", router)

app.listen(PORT, console.log('beyene started at', PORT))