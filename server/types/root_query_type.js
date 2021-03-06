const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = graphql;
const EmployeeType = require("./employee_type");
const CompanyType = require("./company_type");
const DepartmentType = require("./department_type");

const Employee = require("../models/employee");
const Company = require("../models/company");
const Department = require("../models/department");


const resolvers ={
    Title:{
        employee(parent, args, context, info){
            return find(title,  {title: args.title})
        }
    }
}


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    employee: {
      type: EmployeeType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Employee.findById(id);
      },


    employees: {
      type: new GraphQLList(EmployeeType),
      resolve() {
        return Employee.find({});
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Company.findById(id);
      }
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve() {
        return Company.find({});
      }
    }
  })
});

module.exports = RootQuery;
