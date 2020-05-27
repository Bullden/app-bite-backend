var mongoose = require('mongoose')

// data
var Schema = mongoose.Schema


var phoneSchema = new Schema(
    {
       phoneNumber: String
    }
)

var Phone = mongoose.model('Phone',phoneSchema)

module.exports = Phone
