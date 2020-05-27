var mongoose = require('mongoose')
var relationship = require("mongoose-relationship");
// data
var Schema = mongoose.Schema


var categorySchema = new Schema({
    nameCategory: String,
    category: [{
        type: mongoose.Schema.ObjectId,
    }]
})



var Category = mongoose.model('Category',categorySchema , 'categories')

module.exports = Category
