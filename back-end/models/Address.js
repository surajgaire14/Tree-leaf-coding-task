const mongoose = require("mongoose")

const { Schema   } = mongoose

const AddressSchema = Schema({
    City:{
        type:String
    },
    District:{
        type:String,
    },
    Province:{
        type:String,
        // validate:[validatePhoneNumber,"please enter a valid phone number"] 
    },
    Country:{
        type:String,
        default:"Nepal"
    }
})

module.exports = mongoose.model("Address",AddressSchema)