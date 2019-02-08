const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true,
        unique:true,
    },
    ingredients:{type:String, required:true},
    method:{type:String, required:true}
})

module.exports = mongoose.model('Item',itemSchema);