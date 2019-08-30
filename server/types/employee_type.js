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
    fullName: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLInt },
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
