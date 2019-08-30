// import mongoose from "mongoose";
// const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
// import graphql from "graphql";

// const Employee = mongoose.model("employee");

// const EmployeeType = new GraphQLObjectType({
//   name: "EmployeeType",
//   fields: () => ({
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     phone: { type: GraphQLInt },
//     email: { type: GraphQLString },
//     title: {
//       type: require("./title_type"),
//       resolve(parentValue) {
//         return Employee.findById(parentValue)
//           .populate("title")
//           .then(employee => {
//             console.log(employee);
//             return employee.title;
//           });
//       }
//     },
//     location: {
//       type: require("./location_type"),
//       resolve(parentValue) {
//         return Employee.findById(parentValue)
//           .populate("location")
//           .then(employee => {
//             console.log(employee);
//             return employee.location;
//           });
//       }
//     },
//     department: {
//       type: require("./department_type"),
//       resolve(parentValue) {
//         return Employee.findById(parentValue)
//           .populate("department")
//           .then(employee => {
//             console.log(employee);
//             return employee.department;
//           });
//       }
//     },
//     company: {
//       type: require("./company_type"),
//       resolve(parentValue) {
//         return Employee.findById(parentValue)
//           .populate("company")
//           .then(employee => {
//             console.log(employee);
//             return employee.company;
//           });
//       }
//     }
//   })
// });

// module.exports = EmployeeType;
