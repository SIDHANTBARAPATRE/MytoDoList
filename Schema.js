//SCHEMA
const mongoose = require("mongoose") ///requiring mongoose

const userSchema = new mongoose.Schema({
    name : String,
}) //making schema

module.exports = mongoose.model("Item" , userSchema)//expoting 'userschema,' to from user.js to 'User' toin app.js 
