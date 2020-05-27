var mongoose = require('mongoose')

var Schema = mongoose.Schema

var UserShema = new Schema({
    phone: String,
    personalInfo: {
        name: String,
        surname: String,
        middlename: String,
        email: String,
        image: String
    },
    address: {
        address1: String,
        address2: String,
        appartament: String,
        floor: String,
        deliveryNote: String
    }   
})

var User =  mongoose.model('User', UserShema)

module.exports = User