const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  fullName: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: Number
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "company"
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "department"
  },
  title: { type: String }
});

module.exports = mongoose.model("employee", EmployeeSchema);
