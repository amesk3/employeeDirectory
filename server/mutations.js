const {
  buildSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} = require("graphql");
const mongoose = require("mongoose");
const Employee = require("./models/employee");
const EmployeeType = require("./types/employee_type");
const Company = require("./models/company");
const CompanyType = require("./types/company_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCompany: {
      type: CompanyType,
      args: {
        companyName: { type: GraphQLString },
        location: { type: GraphQLString },
        id: { type: GraphQLID }
      },
      resolve(parentValue, { companyName, id, location }) {
        return new Company({ companyName, id, location }).save();
      }
    },
    addEmployee: {
      type: CompanyType,
      args: {
        fullName: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLInt },
        departmentId: { type: GraphQLID },
        department: { type: GraphQLString },
        title: { type: GraphQLString },
        companyId: { type: GraphQLID },
        company: { type: GraphQLString }
      },
      resolve(
        parentValue,
        {
          fullName,
          companyId,
          email,
          phone,
          department,
          departmentId,
          title,
          company
        }
      ) {
        return new Company.addEmployeeToCompany(
          companyId,
          fullName,
          email,
          phone,
          department,
          departmentId,
          title,
          company
        );
      }
    },
    deleteCompany: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Company.remove({ _id: id });
      }
    },
    deleteEmployee: {
      type: EmployeeType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Employee.remove({ _id: id });
      }
    },
    updateEmployee: {
      type: EmployeeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        fullName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLInt) },
        company: { type: new GraphQLNonNull(GraphQLString) },
        department: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(
        parentValue,
        { id, fullName, email, phone, company, department, title }
      ) {
        let employee = Employee.findById(id);
        if (!employee) {
          throw new Error("no message exists with id +" + id);
        }
        return Employee.findByIdAndUpdate(id, {
          set: { fullName, email, phone, company, department, title }
        }).exec();
      }
    }
  }
});

module.exports = mutation;
