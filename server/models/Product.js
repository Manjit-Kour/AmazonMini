const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({
    ImageUrl: String,
    Title:String,
    Description:String,
    Price: Number
    
})

module.exports= mongoose.model('Product',productSchema);