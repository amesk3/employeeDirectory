const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Employee = require("../models/employee");

const EmployeeType = new GraphQLObjectType({
  name: "EmployeeType",
  fields: () => ({
    id: { type: GraphQLID },
    fullName: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLInt },
    department: {
      type: require("./department_type"),
      resolve(parentValue) {
        return Employee.findById(parentValue)
          .populate("department")
          .then(employee => {
            console.log(employee);
            return employee.department;
          });
      }
    },

    title: { type: GraphQLString },

    company: {
      type: require("./company_type"),
      resolve(parentValue) {
        return Employee.findById(parentValue)
          .populate("company")
          .then(employee => {
            console.log(employee);
            return employee.company;
          });
      }
    }
  })
});

module.exports = EmployeeType;
