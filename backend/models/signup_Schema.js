const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true } 
}, { timestamps: true }); 

const signup_Schema = mongoose.model("User", signupSchema);
module.exports = signup_Schema;
