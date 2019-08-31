const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const EmployeeType = require("./employee_type");
const Company = require("../models/company");

const CompanyType = new GraphQLObjectType({
  name: "CompanyType",
  fields: () => ({
    id: { type: GraphQLID },
    company: { type: GraphQLString },
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve(parentValue) {
        return Company.findEmployees(parentValue.id);
      }
    }
  })
});

module.exports = CompanyType;
