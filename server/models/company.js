const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  company: {
    type: String
  },
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "employee"
    }
  ]
});

CompanySchema.statics.addEmployeeToCompany = function(companyId, fullName) {
  const Employee = require("./employee");

  return mongoose
    .model("company", CompanySchema)
    .findById(companyId)
    .then(company => {
      const employee = new Employee({ fullName, company });
      company.employees.push(employee);
      return Promise.all([employee.save(), company.save()]).then(
        ([employee, company]) => company
      );
    });
};

CompanySchema.statics.findEmployees = function(companyId) {
  return mongoose
    .model("company", CompanySchema)
    .findById(companyId)
    .populate("employees")
    .then(company => company.employees);
};

module.exports = mongoose.model("company", CompanySchema);
