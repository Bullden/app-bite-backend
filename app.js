// Mongo DB CRUD Demo

// Modules
var cors = require('cors')
var mongoose = require('mongoose')
var express = require('express')
var fs = require('fs')

// express setup
var app = express()
// var port = process.env.PORT || 3001
var port = process.env.PORT || 5000

// Controllers
var restaurantController = require('./controllers/restaurantController')
// var personSetup = require('./controllers/setupController')
var phoneController = require('./controllers/phoneController')
var taskController =  require('./controllers/categoryController')
var userController = require('./controllers/userController')

// load mongo config
var mongoConfig = JSON.parse(fs.readFileSync(__dirname + '/mongo-config.json', 'utf8'));

var mongourl = mongoConfig.mongourl

// configure assets and vies
app.use('/assets', express.static(__dirname + '/public'))
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')
app.use(cors())
mongoose.set('useFindAndModify', false)



// connect to mongodb
mongoose.connect(mongourl, {useNewUrlParser: true , useUnifiedTopology:true})


// inti controllers
restaurantController(app, mongoose)
// personSetup(app, mongoose)
phoneController(app, mongoose)
taskController(app, mongoose)
userController(app, mongoose)

// kick web server off
app.listen(port)

console.log('mongo client listening on port', port)
