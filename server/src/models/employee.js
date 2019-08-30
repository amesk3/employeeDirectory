const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: {
    type: String,
    default: "Anonymous"
  },
  phone: {
    type: Number
  },
  email: { type: String },
  title: {
    type: Schema.Types.ObjectId,
    ref: "title"
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: "location"
  },
  //   department: {
  //     type: Schema.Types.ObjectId,
  //     ref: "department"
  //   },
  company: {
    type: Schema.Types.ObjectId,
    ref: "company"
  }
});

mongoose.model("employee", EmployeeSchema);
