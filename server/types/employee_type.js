const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;

const EmployeeType = new GraphQLObjectType({
  name: "EmployeeType",
  fields: () => ({
    id: { type: GraphQLID },
    company: { type: GraphQLString }
  })
});

module.exports = EmployeeType;
