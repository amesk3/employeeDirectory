const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const EmployeeType = require("./employee_type");

const Employee = require("../models/employee");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    employee: {
      type: EmployeeType,
      args: { EmployeeId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { employeeId }) {
        return Employee.findById(employeeId);
      }
    }
  })
});

module.exports = RootQuery;
