const mongoose = require("mongoose");
const { validateEmail } = require("../utils/isValidEmail");

const { Schema } = mongoose;

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, "please enter a valid email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    set: (v) => v.toLowerCase(),
    required: true,
  },
  phone_no: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  profilePicture: {
    type: String,
  },
});

module.exports = mongoose.model("user", UserSchema);

