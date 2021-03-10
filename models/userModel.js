const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  number: {
    type: Number,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("UserMinistryTrack", userSchema);

module.exports = User;
