const mongoose = require("mongoose");

const DoctorsSchema = new mongoose.Schema({
    name : {type : String, required : true, unique: true},
    specialization : {type :  String, required : true, unique: false},
    days: {type: String, required: true, unique: false},
    availability: {type: String, required: true, unique: false}
})

module.exports = mongoose.model("Users", DoctorsSchema);