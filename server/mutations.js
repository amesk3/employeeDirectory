const { buildSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const mongoose = require("mongoose");
const Employee = require("./models/employee");
const EmployeeType = require("./types/employee_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addEmployee: {
      type: EmployeeType,
      args: {
        fullName: { type: GraphQLString }
      },
      resolve(parentValue, { fullName }) {
        return new Employee({ fullName }).save();
      }
    }
  }
});

module.exports = mutation;
