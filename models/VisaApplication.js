const mongoose = require("mongoose");

const VisaApplicationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true,
    unique: true
  },
  destination: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("applications", VisaApplicationSchema);
