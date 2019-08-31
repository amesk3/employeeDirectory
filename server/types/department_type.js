const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;

const Department = require("../models/department");
const EmployeeType = require("./employee_type");

const DepartmentType = new GraphQLObjectType({
  name: "DepartmentType",
  fields: () => ({
    id: { type: GraphQLID },
    departmentName: { type: GraphQLString },
    employees: {
      //find all the employee with the departmentName
      type: new GraphQLList(EmployeeType),
      resolve(parentValue) {
        return Department.findEmployees(parentValue.id);
      }
    }
  })
});

module.exports = DepartmentType;
