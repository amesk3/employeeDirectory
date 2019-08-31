const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  departmentName: {
    type: String
  },
  employees: {
    type: Schema.Types.ObjectId,
    ref: "employee"
  }
});

DepartmentSchema.statics.findEmployees = function(id) {
  return mongoose
    .model("department", DepartmentSchema)
    .findById(id)
    .populate("employees")
    .then(department => department.employees);
};

module.exports = mongoose.model("department", DepartmentSchema);
