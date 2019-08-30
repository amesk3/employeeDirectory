const {
  buildSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} = require("graphql");
const mongoose = require("mongoose");
const Employee = require("./models/employee");
const EmployeeType = require("./types/employee_type");
const Company = require("./models/company");
const CompanyType = require("./types/company_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // addEmployee: {
    //   type: EmployeeType,
    //   args: {
    //     fullName: { type: GraphQLString },
    //     email: { type: GraphQLString },
    //     phone: { type: GraphQLInt },
    //     company: { type: GraphQLString }
    //   },
    //   resolve(parentValue, { fullName, email, phone, company }) {
    //     return new Employee({ fullName, email, phone, company }).save();
    //   }
    // },
    addCompany: {
      type: CompanyType,
      args: {
        company: { type: GraphQLString },
        companyId: { type: GraphQLID }
      },
      resolve(parentValue, { company, companyId }) {
        return new Company({ company, companyId }).save();
      }
    },
    addEmployee: {
      type: CompanyType,
      args: {
        fullName: { type: GraphQLString },
        companyId: { type: GraphQLID }
      }, //add employees
      resolve(parentValue, { fullName, companyId }) {
        return new Company.addEmployeeToCompany(companyId, fullName);
      }
    }
  }
});

module.exports = mutation;
