const mongoose = require("mongoose");

const VisaApplicationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  appId: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  destination: {
    type: String
  },
  destination: {
    type: String
  },
  passportNumber: {
    type: String
  },
  status: {
    type: String
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("applications", VisaApplicationSchema);
