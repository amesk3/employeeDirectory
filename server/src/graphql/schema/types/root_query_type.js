const mongoose = require("mongoose");
const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const CompanyType = require("./company_type");
// const DepartmentType = require("./department_type");
const EmployeeType = require("./employee_type");
const LocationType = require("./location_type");
const TitleType = require("./title_type");

const Company = mongoose.model("company");
// const Department = mongoose.model("department");
const Employee = mongoose.model("employee");
const Location = mongoose.model("location");
const Title = mongoose.model("title");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve() {
        return Employee.find({});
      }
    },
    employee: {
      type: EmployeeType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Employee.findById(id);
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Company.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
