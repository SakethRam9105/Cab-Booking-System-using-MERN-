const mongoose = require('mongoose');

const adminSchema=new mongoose.Schema({
    AdminID:{type:String, required:true, unique:true},
    password:{type:String}
})

const adminModel=mongoose.model('admin',adminSchema)
module.exports=adminModel;