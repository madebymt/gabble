const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const path = ("path")
const expressvalidator = require("express-validator")
const mustache = require("mustache-express")
const models = ("./models")
const session = require("express-session")
const pg = require('pg')

app.engine("mustache", mustache())
app.set("view engine", "mustache")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))

const router = require("./routes/router")
app.use(router)

app.use(expressvalidator())

let sess = {
  secret: "hello node",
  resave:false,
  saveUninitialized: true,
}

app.use(session(sess))

app.listen(3000, function(req, res) {
 console.log("Iron yard is the best!")
})
