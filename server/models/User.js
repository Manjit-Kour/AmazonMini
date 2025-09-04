const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    name:String,
    emailId:{
        type:String,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please fill a valid email address"]
    },
    password: String,
    address:String,
    isSeller:Boolean
})

module.exports= mongoose.model('User',userSchema);